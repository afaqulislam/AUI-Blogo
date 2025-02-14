"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { useParams } from "next/navigation";

export default function StudioPage() {
  const params = useParams();
  const slug = params?.index || []; // Handles all paths dynamically

  if (slug.includes("tool")) {
    return <div>Tool Page</div>; // Handle "tool" page separately
  }

  return <NextStudio config={config} />;
}
