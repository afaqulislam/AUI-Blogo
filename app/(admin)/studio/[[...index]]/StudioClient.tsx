"use client";

import "@fontsource/fira-code/latin-400.css";
import "@fontsource/fira-code/latin-600.css";
import "@fontsource/fira-code/latin-700.css";
import "@fontsource/lilita-one/latin-400.css";
import "./studio-theme.css";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { StudioErrorBoundary } from "./StudioErrorBoundary";
import config from "../../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioClient() {
  const params = useParams();
  const slug = params?.index || [];

  if (slug.includes("tool")) {
    return <div>Tool Page</div>;
  }

  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}