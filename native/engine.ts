import type {SqlJsStatic} from 'sql.js';
import {NursingSQL} from './sql.ts';
import {SnapshotStore,type Storage} from './snapshots.ts';
import {migrations} from './migrations.ts';
import {schema} from './schema.ts';
import {NativeObjects} from './objects.ts';
import {setRuntimeContext,type NursingUser} from './context.ts';
import {dispatch,type ApiRequest,type ApiReply} from './dispatch.ts';
// Shared queue also prevents request-context leakage if a runtime shares modules.
let globalQueue:Promise<unknown>=Promise.resolve();
export class NativeEngine {
 private database!:NursingSQL;
 private snapshots:SnapshotStore;
 private ready:Promise<void>|null=null;
 constructor(private SQL:SqlJsStatic,private storage:Storage,private client:any,private secrets:Record<string,string|undefined>|(()=>Record<string,string|undefined>),private verifyUser:(token:string)=>Promise<any>){this.snapshots=new SnapshotStore(storage);}
 initialize(){if(!this.ready)this.ready=(async()=>{const saved=await this.snapshots.read();this.database=new NursingSQL(new this.SQL.Database(saved||undefined));if(!saved)this.database.sqlite.run(schema);const versionRow=await this.database.prepare('PRAGMA user_version').first();const current=Number(versionRow?.user_version||0);const latest=migrations.at(-1)?.version||0;if(current>latest)throw new Error('Records Schema Is Newer Than This App Version');if(!saved||current<latest){this.database.sqlite.run('BEGIN');try{for(const migration of migrations)if(migration.version>current){this.database.sqlite.run(migration.sql);this.database.sqlite.run('PRAGMA user_version='+migration.version);}this.database.sqlite.run('COMMIT');}catch(error){this.database.sqlite.run('ROLLBACK');throw error;}await this.snapshots.commit(this.database.export());}})();return this.ready;}
 run(authId:string,input:ApiRequest){const task=globalQueue.then(()=>this.process(authId,input));globalQueue=task.catch(()=>{});return task;}
 private async process(authId:string,input:ApiRequest):Promise<ApiReply>{await this.initialize();if(typeof authId!=='string'||!authId)throw new Error('Verified Account Required');
 // Ignore every identity or role supplied in a browser request; resolve through the platform.
 if(typeof input.authToken!=='string'||input.authToken.length>10000)throw new Error('Verified Session Required');const providerUser=await this.verifyUser(input.authToken);if(!providerUser||providerUser.id!==authId||typeof providerUser.email!=='string')throw new Error('Account Access Could Not Be Verified');
 const mapped=await this.database.prepare('SELECT record_user_id FROM auth_identity_links WHERE auth_id=?').bind(authId).first();const user:NursingUser={authId,userId:mapped?.record_user_id||authId,email:providerUser.email.toLowerCase(),displayName:providerUser.full_name||providerUser.email};
 const before=this.database.export();const key=authId+':'+input.id;
 try{
  if(input.method==='POST'){const cached=await this.database.prepare('SELECT response FROM native_requests WHERE request_key=?').bind(key).first();if(cached)return JSON.parse(cached.response);}
  setRuntimeContext({user,database:this.database,objects:new NativeObjects(this.database,this.client),secrets:typeof this.secrets==="function"?this.secrets():this.secrets});
  const reply=await dispatch(input);
  if(reply.status>=400){this.database.sqlite.close();this.database=new NursingSQL(new this.SQL.Database(before));return reply;}
  if(input.method==='POST'){await this.database.prepare('DELETE FROM native_requests WHERE created_at<?').bind(Date.now()-86400000).run();await this.database.prepare('INSERT INTO native_requests(request_key,response,created_at) VALUES(?,?,?)').bind(key,JSON.stringify(reply),Date.now()).run();}
  const after=this.database.export();if(before.length!==after.length||after.some((b,i)=>b!==before[i]))await this.snapshots.commit(after);
  return reply;
 }catch(error){this.database.sqlite.close();this.database=new NursingSQL(new this.SQL.Database(before));throw error;}finally{setRuntimeContext(null);}
 }
}
