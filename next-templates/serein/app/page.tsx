import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Partnership } from "@/components/sections/Partnership";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Studio />
      <Work />
      <Services />
      <Process />
      <Partnership />
      <Pricing />
      <Faq />
      <Closing />
    </main>
  );
}
