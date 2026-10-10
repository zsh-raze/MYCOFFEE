import type { Metadata } from "next";
import { en } from "@/content/en";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = { title: en.nav.contact, description: en.contact.lead };

export default function Page() {
  return <ContactView />;
}
