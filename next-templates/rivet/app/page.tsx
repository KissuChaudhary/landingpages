import { Hero } from "@/components/sections/Hero";
import { Trust, Philosophy, Studio } from "@/components/sections/Studio";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Journal } from "@/components/sections/Journal";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
import { Contact } from "@/components/sections/Contact";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Trust />
      <Philosophy />
      <Work />
      <Services />
      <Studio />
      <Process />
      <Pricing />
      <Faq />
      <Journal />
      <Closing />
      <Contact />
    </main>
  );
}
