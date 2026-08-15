import { NextResponse } from 'next/server'
import { sessionCookie } from '../../../lib/auth'
export async function GET() { const r=NextResponse.redirect(new URL('/login', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')); r.cookies.set(sessionCookie,'',{maxAge:0,path:'/'}); return r }
