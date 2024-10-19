// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { Toaster } from "sonner";

// import { getEvents } from "@/lib/mongodb/events";
// import { getUserById } from "@/lib/mongodb/user";

// import Events from "./events";
// import EventsHeader from "./header";

// export default async function EventsPage() {
//   let user, events;

//   try {
//     const { userId } = auth();

//     if (!userId) redirect("/sign-in");

//     user = await getUserById(userId);

//     if (!user) redirect("/sign-in");

//     // Fetch events based on the provided university
//     events = await getEvents(university);
//   } catch {
//     redirect("/sign-in");
//   }

//   return (
//     <div>
//       <Toaster richColors closeButton />
//       <EventsHeader />
//       <Events events={events} clerkId={user?.clerkId} role={user?.role} />
//     </div>
//   );
// }
