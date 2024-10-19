"use client"; // Este é um Client Component

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchEvents } from "./fetchEvents"; // Função de fetch
import EventList from "./eventList";
import UniversityFilter from "./universityFilterClient";
import { Event } from "./event";
export default function EventFetcherClient() {
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedUniversity = searchParams.get("university") || null;

  // Função para atualizar a URL e o filtro de eventos
  const handleUniversityChange = (university: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (university) {
      params.set("university", university);
    } else {
      params.delete("university");
    }
    router.push(`/events2?${params.toString()}`);
  };

  // Buscar eventos sempre que o filtro mudar

  return (
    <div>
      <UniversityFilter
        onUniversityChange={handleUniversityChange}
        selectedUniversity={selectedUniversity}
      />
      {loading ? <p>Carregando eventos...</p> : <EventList events={events || []} />}
    </div>
  );
}

