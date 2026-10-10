import type { Metadata } from "next";
import { Sun, Droplets, Sprout } from "lucide-react";
import { PageIntro } from "@/components/pages/PageIntro";
import { plants } from "@/data/plants";
import { asset, href } from "@/lib/urls";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = { title: "A little plant wisdom" };
const rituals = [
  {
    title: "Watch the light",
    body: "Notice how the light changes across the day. Most of these companions prefer bright, indirect or filtered light to strong direct sun.",
    icon: Sun,
  },
  {
    title: "Read the soil",
    body: "Check the compost before watering. A room, a season and a planter all change how quickly it dries. Let excess water drain away.",
    icon: Droplets,
  },
  {
    title: "Notice the growth",
    body: "New leaves, roots and changing silhouettes tell a story. Look closely, keep leaves free of dust, and give your plant space as it grows.",
    icon: Sprout,
  },
];
export default function CarePage() {
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow="Small rituals. New leaves."
        title="A little"
        accent="plant wisdom."
        description="You do not need a perfect routine. A little observation, a suitable spot and a few simple habits go a long way."
      />
      <div className="care-rituals wrap">
        {rituals.map(({ title, body, icon: Icon }) => (
          <article key={title}>
            <Icon size={28} strokeWidth={1} />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <section className="care-library wrap section-pad">
        <p className="eyebrow">Know your companion</p>
        <h2>
          Care, <em>by character.</em>
        </h2>
        <div className="care-library-grid">
          {plants.map((plant) => (
            <a href={href(`/plants/${plant.slug}`)} key={plant.slug}>
              <div>
                <img
                  src={asset(plant.image)}
                  alt={plant.botanical}
                  loading="lazy"
                />
              </div>
              <p className="eyebrow">{plant.botanical}</p>
              <h3>{plant.name}</h3>
              <span>Read its care notes ↗</span>
            </a>
          ))}
        </div>
        <p className="care-source">
          For more detail, explore the{" "}
          <a
            href="https://www.rhs.org.uk/plants/swiss-cheese-plants/how-to-grow-swiss-cheese-plants"
            target="_blank"
            rel="noreferrer"
          >
            RHS Monstera guide
          </a>
          ,{" "}
          <a
            href="https://www.rhs.org.uk/shows-events/rhs-urban-show/houseplant-profiles/houseplants-for-humidity"
            target="_blank"
            rel="noreferrer"
          >
            Kentia guidance
          </a>{" "}
          and{" "}
          <a
            href="https://www.rhs.org.uk/plants/95720/ficus-elastica/details"
            target="_blank"
            rel="noreferrer"
          >
            rubber plant profile
          </a>
          .
        </p>
      </section>
      <Closing />
    </main>
  );
}
