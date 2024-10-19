"use client"; // Client Component para controle do filtro

import React from "react";

type UniversityFilterProps = {
  onUniversityChange: (university: string) => void;
  selectedUniversity: string | null;
};

const universities = ["University A", "University B"];

export default function UniversityFilter(
  onUniversityChange: any,
  selectedUniversity: string,
) {
  return (
    <select
      value={selectedUniversity || ""}
      onChange={(e) => onUniversityChange(e.target.value)}
    >
      <option value="">Todos</option>
      {universities.map((university) => (
        <option key={university} value={university}>
          {university}
        </option>
      ))}
    </select>
  );
}
