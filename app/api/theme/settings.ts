import {db} from '../security.ts';
import {defaultTheme,validateTheme} from '../../../lib/theme.ts';
export async function themeSettings(){const row=await db().prepare("SELECT value FROM settings WHERE key='brand_colors'").first<{value:string}>();if(!row)return {row:null,config:{colors:{...defaultTheme},id:null as string|null}};const x=JSON.parse(row.value);if(typeof x.id!=='string')throw new Error('Invalid color settings');return {row,config:{colors:validateTheme(x.colors),id:x.id}}}
