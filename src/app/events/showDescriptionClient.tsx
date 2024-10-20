"use client";
import { useState } from "react";

export default function ShowDescription(props: { description: string }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div>
      <p className="max-w-72 whitespace-pre-wrap break-words text-sm/relaxed text-gray-500 dark:text-gray-400 md:max-w-max">
        {showFullDescription
          ? props.description
          : props.description.slice(0, 100) + "..."}{" "}
        {/* Display only a portion of the description */}
        {props.description.length > 100 && ( // Check if description is longer than 100 characters
          <button
            className="text-primary hover:underline"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </p>
    </div>
  );
}
