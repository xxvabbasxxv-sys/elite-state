import { NextResponse } from 'next/server'
import { issueSession, sessionCookie } from '../../../lib/auth'
export async function POST(request: Request) { const { password } = await request.json(); if (!process.env.DASHBOARD_PASSWORD || password !== process.env.DASHBOARD_PASSWORD) return NextResponse.json({error:'Invalid'}, {status:401}); const response=NextResponse.json({ok:true}); response.cookies.set(sessionCookie,issueSession(),{httpOnly:true,secure:true,sameSite:'strict',path:'/',maxAge:43200}); return response }
