import { Event } from "./event";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p>Nenhum evento encontrado.</p>;
  }

  return (
    <ul>
      {events.map((event) => (
        <li key={event._id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <small>Universidade: {event.university}</small>
        </li>
      ))}
    </ul>
  );
}
