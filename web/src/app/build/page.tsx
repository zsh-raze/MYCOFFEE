import type { Metadata } from "next";
import { en } from "@/content/en";
import { BuildView } from "@/views/BuildView";

export const metadata: Metadata = { title: en.nav.build, description: en.build.lead };

export default function Page() {
  return <BuildView />;
}
