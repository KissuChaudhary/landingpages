import { BriefProvider } from "@/components/BriefProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Studio } from "@/components/sections/Studio";
import { ShotSelector } from "@/components/sections/ShotSelector";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Investment } from "@/components/sections/Investment";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <BriefProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Studio />
        <ShotSelector />
        <Services />
        <Process />
        <Investment />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </BriefProvider>
  );
}
