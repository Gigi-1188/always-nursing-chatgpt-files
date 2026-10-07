import type {NursingSQL} from "./sql.ts";
import type {NativeObjects} from "./objects.ts";
export type NursingUser={userId:string;authId:string;email:string;displayName:string};
export type RuntimeContext={user:NursingUser;database:NursingSQL;objects:NativeObjects;secrets:Record<string,string|undefined>};
let current:RuntimeContext|null=null;
export function runtimeContext():RuntimeContext{if(!current)throw new Error('No Trusted Backend Context');return current;}
export function setRuntimeContext(value:RuntimeContext|null){current=value;}
