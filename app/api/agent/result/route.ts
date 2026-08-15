import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)import { NextResponse } from 'next/server'
import { requireAgent } from '../../../../lib/guard'
export async function POST(request: Request) { const denied=requireAgent(request);if(denied)return denied; const body=await request.json(); if(typeof body.id!=='string'||typeof body.ok!=='boolean')return NextResponse.json({error:'Invalid result'},{status:400}); await sql`UPDATE commands SET status=${body.ok?'succeeded':'failed'}, result=${JSON.stringify(body.result||{})}, completed_at=now() WHERE id=${body.id}`;return NextResponse.json({ok:true}) }
