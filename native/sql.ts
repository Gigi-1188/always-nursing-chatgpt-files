import type {Database,SqlJsStatic} from 'sql.js';
export class NursingSQL {
 constructor(public sqlite:Database){}
 prepare(sql:string){return new NursingStatement(this,sql);}
 async batch(statements:NursingStatement[]){this.sqlite.run('SAVEPOINT nursing_batch');try{const results=[];for(const statement of statements)results.push(await statement.run());this.sqlite.run('RELEASE nursing_batch');return results;}catch(error){this.sqlite.run('ROLLBACK TO nursing_batch');this.sqlite.run('RELEASE nursing_batch');throw error;}}
 export(){return this.sqlite.export();}
}
export class NursingStatement {
 values:any[]=[];
 constructor(private db:NursingSQL,private sql:string){}
 bind(...values:any[]){this.values=values.map(v=>v===undefined?null:v);return this;}
 async all<T=Record<string,any>>():Promise<{results:T[]}>{const statement=this.db.sqlite.prepare(this.sql);try{statement.bind(this.values);const results:T[]=[];while(statement.step())results.push(statement.getAsObject() as T);return {results};}finally{statement.free();}}
 async first<T=Record<string,any>>():Promise<T|null>{return (await this.all<T>()).results[0]||null;}
 async run(){this.db.sqlite.run(this.sql,this.values);return {success:true,meta:{changes:this.db.sqlite.getRowsModified()}};}
}
export function restore(SQL:SqlJsStatic,bytes:Uint8Array){return new NursingSQL(new SQL.Database(bytes));}
