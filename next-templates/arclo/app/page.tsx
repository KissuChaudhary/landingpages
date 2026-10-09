import { Hero } from "@/components/sections/Hero";
import { Benefits, Logos } from "@/components/sections/Benefits";
import { Features, Difference } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stories } from "@/components/sections/Stories";
import { About } from "@/components/sections/About";
import { Journal } from "@/components/sections/Journal";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logos />
      <Benefits />
      <Features />
      <Difference />
      <Pricing />
      <HowItWorks />
      <Stories />
      <About />
      <Journal />
      <Faq />
      <Closing />
    </main>
  );
}
