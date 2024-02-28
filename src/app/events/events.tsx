import { GetEvent } from '@/lib/mongodb/db'

import Event from './event'
import EventForms from './eventForms'
export type EventsProps = {
  events: GetEvent[]
  clerkId: string
}

export default function Events(props: EventsProps) {
  return (
    <div className="w-full py-10 lg:py-14">
      <div className="container grid items-center gap-4 px-4 py-4 text-center md:px-6 md:py-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            Próximos Eventos
          </h1>
          <p className="mx-auto max-w-[700px] py-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubra e participe de eventos que acontecem no seu campus.
          </p>
          <EventForms variant="create" />
        </div>
      </div>
      <div className="container grid max-w-6xl justify-center gap-4 px-4 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 items-stretch justify-center gap-4 md:grid-cols-2">
          {props.events.map((event) => (
            <Event
              eventProps={{
                _id: event._id,
                name: event.name,
                description: event.description,
                eventDate: event.eventDate,
                type: event.type,
                instagramURL: event.instagramURL,
              }}
              key={event._id.toString()}
              edit={event.clerkId === props.clerkId} // Attribute true when event.clerkId is equal to user.clerkId, false otherwise
            />
          ))}
        </div>
      </div>
    </div>
  )
}
