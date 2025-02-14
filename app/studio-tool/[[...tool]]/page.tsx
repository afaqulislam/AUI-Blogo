import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // Adjust path if needed

export default function ToolPage() {
  return <NextStudio config={config} />;
}
