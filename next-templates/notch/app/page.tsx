import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Bento } from "@/components/sections/Bento";
import { Workflow } from "@/components/sections/Workflow";
import { Toolkit } from "@/components/sections/Toolkit";
import { Customers } from "@/components/sections/Customers";
import { Pricing } from "@/components/sections/Pricing";
import { Journal } from "@/components/sections/Journal";
import { Closing } from "@/components/sections/Closing";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Bento />
      <Workflow />
      <Toolkit />
      <Customers />
      <Pricing />
      <Journal />
      <Closing />
    </>
  );
}
