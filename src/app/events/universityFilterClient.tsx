// "use client"; // Este arquivo é um Client Component

// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState, useEffect } from "react";

// const universities = ["University A", "University B"];

// export default function UniversityFilterClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const selectedUniversity = searchParams.get("university") || "";

//   const handleUniversityChange = (university: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (university) {
//       params.set("university", university);
//     } else {
//       params.delete("university");
//     }
//     router.push(`/events2?${params.toString()}`);
//   };

//   return (
//     <select
//       value={selectedUniversity}
//       onChange={(e) => handleUniversityChange(e.target.value)}
//     >
//       <option value="">Todos</option>
//       {universities.map((university) => (
//         <option key={university} value={university}>
//           {university}
//         </option>
//       ))}
//     </select>
//   );
// }
