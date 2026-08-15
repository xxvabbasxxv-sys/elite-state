import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { requireAgent } from '../../../../lib/guard'
export async function GET(request: Request) { const denied=requireAgent(request); if(denied)return denied; const result=await sql`UPDATE commands SET status='dispatched' WHERE id=(SELECT id FROM commands WHERE status='queued' ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1) RETURNING id,action,payload`; return NextResponse.json({command:result.rows[0]||null}) }
