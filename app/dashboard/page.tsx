import { redirect } from 'next/navigation'
import { isAdmin } from '../../lib/auth'
import Panel from './panel'
export default async function Dashboard() { if (!(await isAdmin())) redirect('/login'); return <Panel /> }
