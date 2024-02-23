'use client'
import { SignedIn, useUser } from '@clerk/nextjs'

import Events from '@/components/events'
import EventsHeader from '@/components/eventsHeader'
import { Button } from '@/components/ui/button'

export default function EventsPage() {
  // const { isSignedIn } = useAuth()
  const { isSignedIn } = useUser()

  if (isSignedIn === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
      </div>
    )
  }
  console.log(isSignedIn)
  if (isSignedIn === false) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-extrabold">
          Você não está logado ainda...
        </h1>
        <Button>
          <a href="/sign-in">Entrar</a>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <SignedIn>
        <EventsHeader />
        <Events />
      </SignedIn>
    </div>
  )
}
