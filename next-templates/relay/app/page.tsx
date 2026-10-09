import { RelayProvider } from "@/components/RelayProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Workspace } from "@/components/sections/Workspace";
import { Details } from "@/components/sections/Details";
import { Possibilities } from "@/components/sections/Possibilities";
import { Control } from "@/components/sections/Control";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
export default function Page() {
  return (
    <RelayProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-frame" id="top">
        <Navigation />
        <main id="main">
          <Hero />
          <Details />
          <Workspace />
          <Possibilities />
          <Control />
          <Pricing />
          <FAQ />
          <Closing />
        </main>
        <Footer />
      </div>
    </RelayProvider>
  );
}
