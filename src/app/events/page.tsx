import { Suspense } from "react";
import EventsHeader from "./header";
import { GetEvent } from "@/lib/mongodb/db";
import Events from "./events";
import { ObjectId } from "mongodb";

async function fetchEvents(): Promise<GetEvent[]> {
  // Implementar a lógica real de busca de eventos aqui
  return [
    {
      _id: new ObjectId(),
      name: "Evento Teste",
      createdAt: new Date(),
      description: "Descrição do evento teste...",
      eventDate: new Date(),
      type: "academico",
      instagramURL: "https://instagram.com",
      clerkId: "123",
      email: "",
      university: "Universidade Federal de Goiás",
    },
  ];
}

export default async function EventsPage() {
  const events = await fetchEvents();
  return (
    <div>
      <EventsHeader />
      <Suspense fallback={<div>Carregando eventos...</div>}>
        <Events events={events} role="Participante" />
      </Suspense>
    </div>
  );
}
