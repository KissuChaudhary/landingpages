import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { asset } from "@/lib/urls";
import { site } from "@/site.config";
import { Process } from "@/components/sections/Process";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = { title: "Our approach" };
export default function AboutPage() {
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow="Plant people. Space thinkers."
        title="A living"
        accent="point of view."
        description="We believe the most beautiful greenery is the kind that belongs. To a room, to its light, and to the person who lives there."
      />
      <div className="about-banner wrap">
        <img
          src={asset(site.approach.image)}
          alt="A Sylva plant stylist tending greenery in the nursery"
        />
      </div>
      <section className="about-manifesto wrap section-pad">
        <p className="eyebrow">The Sylva way</p>
        <h2>
          Not every room needs a jungle.
          <br />
          Every room can use <em>a little life.</em>
        </h2>
        <div>
          <p>
            Our approach begins with attention. How the morning light moves
            through your room. Which corners you return to. Whether you love
            tending plants or are just getting started.
          </p>
          <p>
            We bring plant knowledge and a considered eye to those details.
            Scale, silhouette, texture and care all matter. The result is
            greenery that feels settled, rather than simply placed.
          </p>
        </div>
      </section>
      <Process />
      <Closing />
    </main>
  );
}
