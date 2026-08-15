import { NextResponse } from 'next/server'
import { isAdmin } from './auth'

export async function requireAdmin() {
  if (await isAdmin()) return null
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function requireAgent(request: Request) {
  const key = request.headers.get('x-agent-key')
  if (!key || !process.env.AGENT_KEY || key !== process.env.AGENT_KEY) {
    return NextResponse.json({ error: 'Unauthorized agent' }, { status: 401 })
  }
  return null
}
