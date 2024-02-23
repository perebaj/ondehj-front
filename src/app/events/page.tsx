import { auth } from '@clerk/nextjs'
// import Link from 'next/link'
import { redirect } from 'next/navigation'

// import { SignedIn } from '@clerk/nextjs'
import Events from '@/components/events'
import EventsHeader from '@/components/eventsHeader'

// import { OrgDetails, SessionDetails, UserDetails } from './details'

export default async function EventsdPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/')
  }

  // const user = await clerkClient.users.getUser(userId)

  return (
    <div>
      <EventsHeader />
      <Events />
    </div>
  )
}
