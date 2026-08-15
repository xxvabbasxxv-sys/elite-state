import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'
import { requireAgent } from '../../../../lib/guard'

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: Request) {
  const denied = requireAgent(request)
  if (denied) return denied

  const result = await sql`
    UPDATE commands
    SET status = 'dispatched'
    WHERE id = (
      SELECT id
      FROM commands
      WHERE status = 'queued'
      ORDER BY created_at
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    RETURNING id, action, payload
  `

  return NextResponse.json({ command: result[0] || null })
}
