import type { Metadata } from "next";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Label } from "@/components/ui/Action";
import { Closing } from "@/components/sections/Closing";
import { Process } from "@/components/sections/Process";
export const metadata: Metadata = { title: "The studio" };
const principles = [
  {
    title: "Stay curious.",
    text: "A good question moves the work forward. We look closely, challenge the obvious answer, and leave space for a better one.",
  },
  {
    title: "Care about the whole thing.",
    text: "A product is the sum of its details. We bring the same attention to a loading state as we do to the opening screen.",
  },
  {
    title: "Make it together.",
    text: "The people doing the work should be in the conversation. We build with you, keep the decisions visible, and share what we learn.",
  },
];
export default function AboutPage() {
  return (
    <main id="main">
      <section className="page-header section-wrap">
        <Label>Independent in spirit. Connected by craft.</Label>
        <h1>
          A small studio.
          <br />
          <span>A wide-open mind.</span>
        </h1>
        <p>{site.studio.text}</p>
      </section>
      <div className="about-photo section-wrap" data-drift>
        <img
          src={asset("/images/studio.webp")}
          alt="Designers working together in a light-filled studio"
        />
        <span className="label-type">
          {site.brand} / Design & engineering at the same table
        </span>
      </div>
      <section className="about-principles section-wrap">
        <Label>The things we come back to</Label>
        <div>
          {principles.map((p, i) => (
            <article key={p.title} data-reveal>
              <span className="label-type">0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Process />
      <Closing />
    </main>
  );
}
