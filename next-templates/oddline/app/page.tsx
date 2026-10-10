import { Navigation } from "@/components/Navigation";
import { Motion } from "@/components/Motion";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing, Footer } from "@/components/sections/Closing";
export default function Page() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Motion />
      <Navigation />
      <main id="main">
        <Hero />
        <Work />
        <Studio />
        <Services />
        <Process />
        <Pricing />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
