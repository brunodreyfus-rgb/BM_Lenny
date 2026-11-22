import {familyId} from '@/lib/server';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export const runtime='nodejs';
export async function GET(_req:Request,{params}:{params:Promise<{name:string}>}){
  if(!await familyId()) return new Response('Identification requise',{status:401});
  const {name}=await params;
  if(!/^(0[1-9]|1[0-9]|20|monique)\.jpg$/.test(name))return new Response('Introuvable',{status:404});
  try{const data=await readFile(join(process.cwd(),'private-gallery',name));return new Response(data,{headers:{'Content-Type':'image/jpeg','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}})}
  catch{return new Response('Introuvable',{status:404})}
}