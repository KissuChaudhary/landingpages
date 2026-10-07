import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/Navbar";
import { Comparison } from "@/components/sections/Comparison";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Divider, PageRails } from "@/components/ui/Section";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ember-200 px-4 py-2 text-sm font-medium text-on-ember focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />

        {/* Everything below the hero shares two page-long rails and hairline dividers at the same width. */}
        <div className="relative">
          <PageRails />
          <div className="relative z-10">
            <LogoStrip />
            <Divider />
            <Features />
            <Divider />
            <Comparison />
            <Divider />
            <HowItWorks />
            <Divider />
            <Testimonials />
            <Divider />
            <Pricing />
            <Divider />
            <Faq />
            <FinalCta />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
