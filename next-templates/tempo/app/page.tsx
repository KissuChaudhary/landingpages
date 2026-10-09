import { TempoProvider } from "@/components/TempoProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Chapters } from "@/components/sections/Chapters";
import { Moments } from "@/components/sections/Moments";
import { Details } from "@/components/sections/Details";
import { Stories } from "@/components/sections/Stories";
import { Membership } from "@/components/sections/Membership";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <TempoProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Navigation />
      <main id="main">
        <Hero />
        <Chapters />
        <Moments />
        <Details />
        <Stories />
        <Membership />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </TempoProvider>
  );
}
