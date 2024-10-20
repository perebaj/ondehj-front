import { GetEvent } from "@/lib/mongodb/db";
import Event from "./event";
import EventForms from "./eventFormsClient";
import UniFilterClient from "./UniFilterClient";

export type EventsProps = {
  events: GetEvent[];
  role: string | unknown;
};

export default function Events({ events, role }: EventsProps) {
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
          {role === "fullAdmin" && <EventForms variant="create" />}
        </div>
      </div>
      <UniFilterClient />
      <div className="container grid justify-center gap-4 px-4 py-4 md:px-6 md:py-6">
        <div className="grid max-w-full grid-cols-1 items-stretch justify-center gap-4 md:max-w-6xl md:grid-cols-2">
          {events.map((event) => (
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
              edit={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
