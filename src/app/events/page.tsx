'use client'
import { Toaster } from 'sonner'

import Events from './events'
import EventsHeader from './header'
export default function EventsPage() {
  return (
    <div>
      <Toaster richColors closeButton />
      <EventsHeader />
      <Events />
    </div>
  )
}
