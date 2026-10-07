import { Navbar } from "@/components/Navbar";
import { Frame } from "@/components/ui/Grid";
import { Difference } from "@/components/sections/Difference";
import { Engine } from "@/components/sections/Engine";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { Proof } from "@/components/sections/Proof";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Frame>
          <Hero />
          <Difference />
          <Method />
          <Engine />
          <Proof />
          <Faq />
          <FinalCta />
          <Footer />
        </Frame>
      </main>
    </>
  );
}
