import {routes} from './routes.ts';
import {runtimeContext} from './context.ts';
import {isOffice,fail} from '../app/api/security.ts';
import {encodeBytes,decodeBytes} from './encoding.ts';
export type ApiRequest={id:string;path:string;method:string;authToken?:string;contentType?:string;body?:string;range?:string};
export type ApiReply={id:string;status:number;headers:Record<string,string>;body:string};
export async function dispatch(input:ApiRequest):Promise<ApiReply>{
 if(typeof input.id!=='string'||!/^[a-f0-9-]{36}$/.test(input.id)||typeof input.path!=='string'||input.path.length>3000||!input.path.startsWith('/api/')||!['GET','POST'].includes(input.method))throw new Error('Invalid Request');
 const url=new URL(input.path,'https://always-nursing.internal');if(url.origin!=='https://always-nursing.internal')throw new Error('Invalid Request Origin');
 let response:Response;const c=runtimeContext();
 if(url.pathname==='/api/session'){if(input.method!=='GET')response=fail(405,'Method Not Allowed');else{const row=await c.database.prepare('SELECT status FROM employee_status WHERE user_id=?').bind(c.user.userId).first();response=Response.json({user:c.user,office:isOffice(c.user),status:row?.status||'active'});}}
 else if(url.pathname==='/api/native-backup'){if(!isOffice(c.user))response=fail(403,'Agency Access Required');else if(input.method!=='GET')response=fail(405,'Read Only Export');else response=new Response(c.database.export() as BodyInit,{headers:{'Content-Type':'application/vnd.sqlite3','Content-Disposition':'attachment; filename="Always-Nursing-Records.sqlite3"','Cache-Control':'no-store'}});}
 else{
  let match:any=null,params:Record<string,string>={};for(const route of routes){const a=route.path.split('/'),b=url.pathname.split('/');if(a.length!==b.length)continue;const candidate:Record<string,string>={};if(a.every((v,i)=>v.startsWith('[')?(candidate[v.slice(1,-1)]=decodeURIComponent(b[i]),true):v===b[i])){match=route;params=candidate;break;}}
  const handler=match?.handlers?.[input.method];if(!handler)response=fail(404,'Endpoint Not Found');else{const headers=new Headers({'origin':'https://always-nursing.internal'});if(input.contentType)headers.set('Content-Type',input.contentType);if(input.range)headers.set('Range',input.range);const body=input.method==='POST'?decodeBytes(input.body||''):undefined;response=await handler(new Request(url,{method:input.method,headers,body:body as BodyInit|undefined}),{params:Promise.resolve(params)});}
 }
 return {id:input.id,status:response.status,headers:Object.fromEntries(response.headers.entries()),body:encodeBytes(new Uint8Array(await response.arrayBuffer()))};
}
