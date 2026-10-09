import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Features } from "@/components/sections/Features";
import { Benefits } from "@/components/sections/Benefits";
import { UseCases } from "@/components/sections/UseCases";
import { Trust } from "@/components/sections/Trust";
import { Pricing } from "@/components/sections/Pricing";
import { Story, Perspectives } from "@/components/sections/Stories";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logos />
      <Features />
      <Benefits />
      <UseCases />
      <Trust />
      <Pricing />
      <Story />
      <Perspectives />
      <FAQ />
      <Closing />
    </main>
  );
}
