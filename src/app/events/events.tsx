// "use client";
// import { GetEvent } from "@/lib/mongodb/db";

// import Event from "./event";
// import EventForms from "./eventFormsClient";
// export type EventsProps = {
//   events: GetEvent[];
//   clerkId: string;
//   role: string | unknown;
// };
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Events(props: EventsProps) {
//   const [university, setUniversity] = useState("");
//   const router = useRouter();
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (university) {
//       router.push(`/events?university=${university}`);
//     }
//   };

//   return (
//     <div className="w-full py-10 lg:py-14">
//       <div className="container grid items-center gap-4 px-4 py-4 text-center md:px-6 md:py-6">
//         <div className="space-y-3">
//           <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
//             Próximos Eventos
//           </h1>
//           <p className="mx-auto max-w-[700px] py-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//             Descubra e participe de eventos que acontecem no seu campus.
//           </p>
//           {props.role === "fullAdmin" ? <EventForms variant="create" /> : null}
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="university">Nome da Universidade:</label>
//         <input
//           type="text"
//           id="university"
//           value={university}
//           onChange={(e) => setUniversity(e.target.value)}
//           required
//         />
//         <button type="submit">Buscar</button>
//       </form>
//       <div className="container grid justify-center gap-4 px-4 py-4  md:px-6 md:py-6">
//         <div className="grid max-w-full grid-cols-1 items-stretch justify-center gap-4 md:max-w-6xl md:grid-cols-2">
//           {props.events.map((event) => (
//             <Event
//               eventProps={{
//                 _id: event._id,
//                 name: event.name,
//                 description: event.description,
//                 eventDate: event.eventDate,
//                 type: event.type,
//                 instagramURL: event.instagramURL,
//               }}
//               key={event._id.toString()}
//               edit={event.clerkId === props.clerkId} // Attribute true when event.clerkId is equal to user.clerkId, false otherwise
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
