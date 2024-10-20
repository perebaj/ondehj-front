import { Suspense } from "react";
import EventsHeader from "./header";
import { GetEvent } from "@/lib/mongodb/db";
import Events from "./events";
import { ObjectId } from "mongodb";
import { getAllEvents, getEvents } from "@/lib/mongodb/events";

export default async function EventsPage() {
  console.log("jojo test");
  const events = await getAllEvents();
  return (
    <div>
      <EventsHeader />
      <Suspense fallback={<div>Carregando eventos...</div>}>
        <Events events={events} role="Participante" />
      </Suspense>
    </div>
  );
}
