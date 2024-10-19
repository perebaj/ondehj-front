export async function fetchEvents(
  university: string | null = null,
): Promise<Event[]> {
  const events: Event[] = [
    {
      _id: "1",
      eventDate: new Date(),
      createdAt: new Date(),
      description: "Evento 1",
      name: "Workshop Next.js",
      university: "University A",
    },
    {
      _id: "2",
      eventDate: new Date(),
      createdAt: new Date(),
      description: "Evento 2",
      name: "Conferência React",
      university: "University B",
    },
  ];

  if (university) {
    return events.filter((event) => event.university === university);
  }
  return events;
}
