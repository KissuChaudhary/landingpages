import { PatchProvider } from "@/components/PatchProvider";
import { GridFrame } from "@/components/ui/Grid";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { WorkspaceSection } from "@/components/sections/WorkspaceSection";
import { Features } from "@/components/sections/Features";
import { Workflow } from "@/components/sections/Workflow";
import { UseCases } from "@/components/sections/UseCases";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
export default function Home() {
  return (
    <PatchProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <GridFrame>
        <div id="top" />
        <Navigation />
        <main id="main">
          <Hero />
          <Capabilities />
          <WorkspaceSection />
          <Features />
          <Workflow />
          <UseCases />
          <Pricing />
          <FAQ />
          <Closing />
        </main>
        <Footer />
      </GridFrame>
    </PatchProvider>
  );
}
