import type { Metadata } from "next";
import { en } from "@/content/en";
import { AboutView } from "@/views/AboutView";

export const metadata: Metadata = { title: en.nav.about, description: en.about.lead };

export default function Page() {
  return <AboutView />;
}
