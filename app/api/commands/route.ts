import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdmin } from '../../../lib/guard'
const schema=z.object({action:z.enum(['give_item','remove_item','give_money','remove_money','kick','ban','console']),payload:z.record(z.string(),z.unknown())})
export async function POST(request: Request) { const denied=await requireAdmin(); if(denied)return denied; const parsed=schema.safeParse(await request.json()); if(!parsed.success)return NextResponse.json({error:'Invalid request'},{status:400}); const {action,payload}=parsed.data; const result=await sql`INSERT INTO commands (action,payload,requested_by) VALUES (${action},${JSON.stringify(payload)},'owner') RETURNING id`; await sql`INSERT INTO audit_log (actor,action,payload) VALUES ('owner',${action},${JSON.stringify(payload)})`; return NextResponse.json({id:result.rows[0].id},{status:201}) }
