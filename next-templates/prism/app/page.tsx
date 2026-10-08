import { PrismProvider } from "@/components/PrismProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { Product } from "@/components/sections/Product";
import { Capabilities } from "@/components/sections/Capabilities";
import { Workflow } from "@/components/sections/Workflow";
import { Stories } from "@/components/sections/Stories";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <PrismProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Navigation />
      <main id="main">
        <Hero />
        <Gallery />
        <Product />
        <Capabilities />
        <Workflow />
        <Stories />
        <Pricing />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </PrismProvider>
  );
}
