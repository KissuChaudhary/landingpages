import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";
export const metadata: Metadata = { title: "Start a conversation" };
export default function ContactPage() {
  return <ContactContent />;
}
