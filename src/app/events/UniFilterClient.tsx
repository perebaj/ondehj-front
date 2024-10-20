"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useState } from "react";

const universities = ["UFScar", "USP São Carlos", "Unicamp", "USP São Paulo"];

export default function UniFilterClient() {
  const [university, setUniversity] = useState("");
  const router = useRouter();

  const handleUniversityChange = (value: string) => {
    setUniversity(value);
    if (value) {
      router.push(`/events?university=${encodeURIComponent(value)}`);
    }
  };
  return (
    <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
      <Select onValueChange={handleUniversityChange}>
        <SelectTrigger className="mx-auto w-full max-w-xs">
          <SelectValue placeholder="Selecione uma universidade" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          <SelectScrollUpButton />
          {universities.map((uni) => (
            <SelectItem key={uni} value={uni}>
              {uni}
            </SelectItem>
          ))}
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </div>
  );
}
