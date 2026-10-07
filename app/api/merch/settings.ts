import {db} from '../security.ts';
import {validateMerchConnection} from '../../../lib/merch.ts';
export async function merchConnection(){const row=await db().prepare("SELECT value FROM settings WHERE key='merch_store'").first<{value:string}>();if(!row)return {row:null,config:{url:'',enabled:false,id:null as string|null}};const x=JSON.parse(row.value);if(typeof x.id!=='string')throw new Error('Invalid store settings');return {row,config:{...validateMerchConnection(x),id:x.id}};}
