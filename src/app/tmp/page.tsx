import { getUsers } from '@/lib/postgres/user'

export default async function Home() {
  const resp = await getUsers()
  console.log(resp)
  return <div>JOjo is awesome</div>
}
