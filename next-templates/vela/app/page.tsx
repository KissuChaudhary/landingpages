import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Signals } from "@/components/sections/Signals";
import { ProductStory } from "@/components/sections/ProductStory";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { Integrations } from "@/components/sections/Integrations";
import { Stories } from "@/components/sections/Stories";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logos />
      <Signals />
      <ProductStory />
      <Principles />
      <Process />
      <Integrations />
      <Stories />
      <Pricing />
      <FAQ />
      <Closing />
    </main>
  );
}
