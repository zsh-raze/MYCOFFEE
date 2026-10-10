import type { Metadata } from "next";
import { en } from "@/content/en";
import { RoastersView } from "@/views/RoastersView";

export const metadata: Metadata = { title: en.nav.roasters, description: en.roasters.lead };

export default function Page() {
  return <RoastersView />;
}
