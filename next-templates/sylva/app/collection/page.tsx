import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/PageIntro";
import { PlantCollection } from "@/components/pages/PlantCollection";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = { title: "The collection" };
export default function CollectionPage() {
  return (
    <main id="main" className="secondary-page">
      <PageIntro
        eyebrow="Meet your green companions"
        title="Find your"
        accent="natural fit."
        description="Start with the light in your room, then choose a shape you love. Explore each plant for its character and a few practical care notes."
      />
      <PlantCollection />
      <Closing />
    </main>
  );
}
