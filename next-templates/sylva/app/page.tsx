import { HeroJourney } from "@/components/sections/Hero";
import { Collection } from "@/components/sections/Collection";
import { Process } from "@/components/sections/Process";
import { Care } from "@/components/sections/Care";
import { Spaces } from "@/components/sections/Spaces";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <HeroJourney />
      <Collection />
      <Process />
      <Care />
      <Spaces />
      <FAQ />
      <Closing />
    </main>
  );
}
