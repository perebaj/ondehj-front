'use client'

import { setLike } from '@/lib/mongodb/events'
export default function Page() {
  // create a button to submit the setLike
  const user = {
    clerkId: '66',
    email: 'jjJ@gmail.com',
    firstName: 'Jonahtan',
    lastName: '2s',
    photo: 'https://www.google.com',
    role: 'user',
  }

  const handler = async () => {
    // const eventID = new ObjectId('65dcc81010b996e1068b324b')
    await setLike('65dcc81010b996e1068b324b', user)
  }
  return (
    <div>
      <h1>Page</h1>
      <button onClick={handler}>Like</button>
    </div>
  )
}
