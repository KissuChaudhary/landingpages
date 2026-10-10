import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
export const metadata: Metadata = { title: "Start a conversation" };
export default function ContactPage() {
  return (
    <main id="main">
      <Contact standalone />
    </main>
  );
}
