import {identity,inactiveGuard,fail} from '../security.ts';
import {validDemoToken} from './settings.ts';
export async function validateDemoAccess(token:string){const user=await identity();if(!user)return fail(401,'Sign in required');const denied=await inactiveGuard(user);if(denied)return denied;try{if(!await validDemoToken(token))return fail(403,'This demo link has expired or was revoked');return null}catch{return fail(503,'Demo access could not be verified')}}
