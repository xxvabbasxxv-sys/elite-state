'use client'
import { useState } from 'react'
export default function Login() {
  const [password, setPassword] = useState(''); const [error, setError] = useState('')
  async function submit(e: React.FormEvent) { e.preventDefault(); const r = await fetch('/api/login', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({password}) }); if (r.ok) location.href='/dashboard'; else setError('كلمة المرور غير صحيحة') }
  return <main className="login"><form onSubmit={submit}><h1>QBCore Control</h1><p>لوحة إدارة السيرفر الخاصة</p><input type="password" autoFocus placeholder="كلمة المرور" value={password} onChange={e=>setPassword(e.target.value)} /><button>دخول</button>{error && <small>{error}</small>}</form></main>
}
