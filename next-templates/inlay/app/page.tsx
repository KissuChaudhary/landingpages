import { Hero } from "@/components/sections/Hero";
import { Pay } from "@/components/sections/Pay";
import { Story } from "@/components/sections/Story";
import { Extras } from "@/components/sections/Extras";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { Sell } from "@/components/sections/Sell";
import { Connect } from "@/components/sections/Connect";
import { Build } from "@/components/sections/Build";
import { Showcase } from "@/components/sections/Showcase";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <Pay />
      <Story />
      <Extras />
      <EarlyAccess />
      <Sell />
      <Connect />
      <Build />
      <Showcase />
      <Pricing />
      <Faq />
    </>
  );
}
