import {identity,inactiveGuard,fail} from '../../security.ts';
import {merchConnection} from '../settings.ts';
export const runtime='edge';
export async function GET(){const user=await identity();if(!user)return fail(401,'Sign in required');const denied=await inactiveGuard(user);if(denied)return denied;try{const {config}=await merchConnection();if(!config.enabled||!config.url)return fail(403,'Always Nursing Merch is not open yet.');return new Response(null,{status:302,headers:{Location:config.url,'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});}catch{return fail(503,'The merchandise store is temporarily unavailable. Please retry.')}}
