import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlant, plants } from "@/data/plants";
import { asset, href } from "@/lib/urls";
import { Button } from "@/components/ui/Primitives";
export const generateStaticParams = () => plants.map(({ slug }) => ({ slug }));
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const plant = getPlant((await params).slug);
  return {
    title: plant?.botanical || "Plant",
    description: plant?.description,
  };
}
export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const plant = getPlant((await params).slug);
  if (!plant) notFound();
  return (
    <main id="main" className="secondary-page">
      <div className="plant-detail wrap">
        <div className="plant-detail-visual">
          <img
            src={asset(plant.image)}
            alt={`${plant.botanical} in a considered ceramic planter`}
          />
          <span>{plant.botanical}</span>
        </div>
        <div className="plant-detail-copy">
          <a className="back-link" href={href("/collection")}>
            ← Back to the collection
          </a>
          <p className="eyebrow">{plant.botanical}</p>
          <h1>{plant.name}</h1>
          <p className="plant-character">{plant.character}</p>
          <p>{plant.description}</p>
          <div className="plant-traits">
            <span>
              <small>Its kind of light</small>
              {plant.light}
            </span>
            <span>
              <small>A place in your room</small>
              {plant.size}
            </span>
          </div>
          <Button to={`/contact?plant=${plant.slug}`}>
            Enquire about this plant
          </Button>
          <p className="availability-note">
            Plant size, planter options and availability are confirmed with your
            studio.
          </p>
        </div>
      </div>
      <section className="plant-care-notes wrap section-pad">
        <p className="eyebrow">A few simple rituals</p>
        <h2>
          A little care.
          <br />
          <em>A lot of growth.</em>
        </h2>
        <div className="care-note-grid">
          {plant.care.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <a
          className="care-source"
          href="https://www.rhs.org.uk/plants/types/houseplants"
          target="_blank"
          rel="noreferrer"
        >
          Explore more houseplant guidance from the RHS ↗
        </a>
      </section>
    </main>
  );
}
