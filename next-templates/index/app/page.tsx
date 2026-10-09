import { MotionProvider } from "@/components/motion/MotionProvider";
import { ResearchProvider } from "@/components/product/ResearchProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { ProductStory } from "@/components/sections/ProductStory";
import { Evidence } from "@/components/sections/Evidence";
import { Examples } from "@/components/sections/Examples";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
export default function Home() {
  return (
    <MotionProvider>
      <ResearchProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div id="top" />
        <Navigation />
        <main id="main">
          <Hero />
          <Introduction />
          <ProductStory />
          <Evidence />
          <Examples />
          <Pricing />
          <FAQ />
          <Closing />
        </main>
        <Footer />
      </ResearchProvider>
    </MotionProvider>
  );
}
