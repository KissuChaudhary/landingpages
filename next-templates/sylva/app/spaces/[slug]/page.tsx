import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { spaces } from "@/data/spaces";
import { asset } from "@/lib/urls";
import { PageIntro } from "@/components/pages/PageIntro";
import { Button } from "@/components/ui/Primitives";
export const generateStaticParams = () => spaces.map(({ slug }) => ({ slug }));
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const space = spaces.find((item) => item.slug === slug);
  return { title: space?.name || "Spaces", description: space?.description };
}
export default async function SpacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const space = spaces.find((item) => item.slug === slug);
  if (!space) notFound();
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow={`A greener chapter / ${space.name}`}
        title={
          space.name === "At home"
            ? "Your own little"
            : space.name === "At work"
              ? "A fresh"
              : "Stay a little"
        }
        accent={
          space.name === "At home"
            ? "sanctuary."
            : space.name === "At work"
              ? "perspective."
              : "longer."
        }
        description={space.description}
      />
      <div className="space-detail-photo wrap">
        <img
          src={asset(space.image)}
          alt={`Thoughtful botanical styling ${space.name.toLowerCase()}`}
        />
      </div>
      <section className="space-detail-scope wrap section-pad">
        <div>
          <p className="eyebrow">A thoughtful starting point</p>
          <h2>
            Built around
            <br />
            <em>your space.</em>
          </h2>
        </div>
        <div>
          <ul>
            {space.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <Button to={`/contact?space=${space.slug}`}>
            Tell us about your space
          </Button>
        </div>
      </section>
    </main>
  );
}
