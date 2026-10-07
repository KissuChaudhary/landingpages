import { Navbar } from "@/components/Navbar";
import { Examples } from "@/components/sections/Examples";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Founder } from "@/components/sections/Founder";
import { Hero } from "@/components/sections/Hero";
import { How } from "@/components/sections/How";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Frame } from "@/components/ui/Kit";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-ink focus:px-5 focus:py-2.5 focus:text-white"
      >
        Skip to content
      </a>
      <Frame>
        <Navbar />
        <main id="main">
          <Hero />
          <Problem />
          <Solution />
          <How />
          <Features />
          <Examples />
          <Pricing />
          <Faq />
          <Founder />
          <FinalCta />
        </main>
        <Footer />
      </Frame>
    </>
  );
}
