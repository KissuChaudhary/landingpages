import { Navbar } from "@/components/Navbar";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ledger } from "@/components/sections/Ledger";
import { Pricing } from "@/components/sections/Pricing";
import { Quotes } from "@/components/sections/Quotes";
import { Year } from "@/components/sections/Year";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[10px] focus:bg-pine focus:px-5 focus:py-2.5 focus:text-on-pine"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Year />
        <Ledger />
        <Quotes />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
