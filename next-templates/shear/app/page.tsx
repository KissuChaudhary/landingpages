import { MotionProvider } from "@/components/motion/MotionProvider";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Comparison } from "@/components/sections/Comparison";
import { Features } from "@/components/sections/Features";
import { Steps } from "@/components/sections/Steps";
import { Teams } from "@/components/sections/Teams";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <Proof />
        <Comparison />
        <Features />
        <Steps />
        <Teams />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </MotionProvider>
  );
}
