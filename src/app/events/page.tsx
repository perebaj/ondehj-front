import { Toaster } from 'sonner'

import Events from './events'
import EventsHeader from './header'
export default async function EventsPage() {
  return (
    <div>
      <Toaster richColors closeButton />
      <EventsHeader />
      <Events />
    </div>
  )
}
