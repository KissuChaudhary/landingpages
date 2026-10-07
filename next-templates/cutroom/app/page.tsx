import { Navbar } from "@/components/Navbar";
import { Creators } from "@/components/sections/Creators";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journal } from "@/components/sections/Journal";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

/** The page: which sections, in what order. Delete a line to drop a section, move a line to reorder. */
export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm font-semibold text-on-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Creators />
        <Services />
        <Results />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <Journal />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
