import {createClient} from '@supabase/supabase-js';
import {createHmac,timingSafeEqual} from 'node:crypto';

export const db=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}});
export const norm=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
const sign=(s:string)=>createHmac('sha256',process.env.SESSION_SECRET!).update(s).digest('hex');
export function token(id:string){const exp=Date.now()+1000*60*60*2;const payload=Buffer.from(JSON.stringify({id,exp,v:19})).toString('base64url');return `${payload}.${sign(payload)}`;}
export async function familyId(req:Request){const raw=req.headers.get('authorization')?.match(/^Bearer ([^ ]+)$/)?.[1];if(!raw)return null;const [payload,mac]=raw.split('.');if(!payload||!mac)return null;const a=Buffer.from(mac,'hex'),b=Buffer.from(sign(payload),'hex');if(a.length!==b.length||!timingSafeEqual(a,b))return null;try{const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.v===19&&data.exp>Date.now()&&typeof data.id==='string'?data.id:null;}catch{return null;}}
export async function admin(req:Request){const bearer=req.headers.get('authorization')?.replace(/^Bearer /,'');if(!bearer)return false;const url=process.env.NEXT_PUBLIC_SUPABASE_URL!,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;const c=createClient(url,key,{auth:{persistSession:false}});const {data,error}=await c.auth.getUser(bearer);const allowed=(process.env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);return !error&&!!data.user?.email&&allowed.includes(data.user.email.toLowerCase());}
export const response=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
