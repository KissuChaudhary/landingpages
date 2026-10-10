import type { Metadata } from "next";
import { site } from "@/site.config";
import { NoteCards } from "@/components/sections/Journal";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = { title: "Journal" };
export default function JournalPage() {
  return (
    <>
      <div className="page-intro wrap">
        <p className="eyebrow">
          <span />
          {site.journal.eyebrow}
        </p>
        <h1>{site.journal.title}</h1>
        <p>
          Thoughts on the customer journey, useful creative and a more connected
          approach to growth.
        </p>
      </div>
      <section className="directory wrap" aria-label="Studio notes">
        <NoteCards />
      </section>
      <Closing />
    </>
  );
}
