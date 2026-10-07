import {validateDemoAccess} from '../demo-links/validate.ts';
export async function GET(request:Request){const denied=await validateDemoAccess(new URL(request.url).searchParams.get('token')||'');return denied||Response.json({allowed:true},{headers:{'Cache-Control':'no-store'}})}
