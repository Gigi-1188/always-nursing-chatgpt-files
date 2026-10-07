export function encodeBytes(bytes:Uint8Array){let result='';for(let i=0;i<bytes.length;i+=32768)result+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(result);}
export function decodeBytes(value:string){const binary=atob(value);return Uint8Array.from(binary,c=>c.charCodeAt(0));}
export async function hashBytes(bytes:Uint8Array){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes as BufferSource)),b=>b.toString(16).padStart(2,'0')).join('');}
