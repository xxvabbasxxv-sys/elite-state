import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'qb_admin_session'
const secret = () => process.env.SESSION_SECRET || ''
const sign = (value: string) => crypto.createHmac('sha256', secret()).update(value).digest('hex')

export function issueSession() {
  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 12
  return `${expires}.${sign(String(expires))}`
}

export async function isAdmin() {
  if (!secret()) return false
  const value = (await cookies()).get(COOKIE)?.value
  if (!value) return false
  const [expires, signature] = value.split('.')
  return Number(expires) > Date.now() / 1000 && signature === sign(expires)
}

export const sessionCookie = COOKIE
