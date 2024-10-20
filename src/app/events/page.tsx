import { Suspense } from 'react'

import { getAllEvents } from '@/lib/mongodb/events'

import Events from './events'
import EventsHeader from './header'

export default async function EventsPage() {
  console.log('jojo test')
  const events = await getAllEvents()
  return (
    <div>
      <EventsHeader />
      <Suspense fallback={<div>Carregando eventos...</div>}>
        <Events events={events} role="Participante" />
      </Suspense>
    </div>
  )
}
