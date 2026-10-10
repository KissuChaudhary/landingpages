import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Work } from "@/components/sections/Work";
import { Problem } from "@/components/sections/Problem";
import { Season } from "@/components/sections/Season";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Compare } from "@/components/sections/Compare";
import { Spotlight } from "@/components/sections/Spotlight";
import { Voices } from "@/components/sections/Voices";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Journal } from "@/components/sections/Journal";
import { Closing } from "@/components/sections/Closing";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Work />
      <Problem />
      <Season />
      <Services />
      <Process />
      <Compare />
      <Spotlight />
      <Voices />
      <Team />
      <Pricing />
      <Faq />
      <Journal />
      <Closing />
    </>
  );
}
