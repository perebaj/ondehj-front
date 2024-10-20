import { Suspense } from "react";
import EventsHeader from "../header";
import { GetEvent } from "@/lib/mongodb/db";
import Events from "../events";
import { ObjectId } from "mongodb";
import { getEvents } from "@/lib/mongodb/events";

export default async function EventsPage({
  params,
}: {
  params: { university: string };
}) {
  console.log("teste", params.university);
  console.log(params.university);
  console.log("jojo test");
  // console.log("uni", university);
  const events = await getEvents(params.university);
  console.log(events);
  console.log("teste");

  return (
    <div>
      <EventsHeader />
      <Suspense fallback={<div>Carregando eventos...</div>}>
        <Events events={events} role="Participante" />
      </Suspense>
    </div>
  );
}
