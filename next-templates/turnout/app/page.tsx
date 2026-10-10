import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Problem } from "@/components/sections/Problem";
import { Story } from "@/components/sections/Story";
import { Work } from "@/components/sections/Work";
import { Orbit } from "@/components/sections/Orbit";
import { Services } from "@/components/sections/Services";
import { Compare } from "@/components/sections/Compare";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { Journal } from "@/components/sections/Journal";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Problem />
      <Story />
      <Work />
      <Orbit />
      <Services />
      <Compare />
      <Process />
      <Voices />
      <Team />
      <Pricing />
      <Journal />
      <Faq />
      <Closing />
    </>
  );
}
