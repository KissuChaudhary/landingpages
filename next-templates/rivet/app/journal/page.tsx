import type { Metadata } from "next";
import { Label } from "@/components/ui/Action";
import { Journal } from "@/components/sections/Journal";
export const metadata: Metadata = { title: "Field notes" };
export default function JournalPage() {
  return (
    <main id="main">
      <section className="page-header section-wrap">
        <Label>Field notes / From the studio</Label>
        <h1>
          Always in
          <br />
          <span>the making.</span>
        </h1>
        <p>
          Observations on products, practice, and making things with care. A few
          things we’re thinking about along the way.
        </p>
      </section>
      <Journal full />
    </main>
  );
}
