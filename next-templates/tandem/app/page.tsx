import { MotionProvider } from "@/components/motion/MotionProvider";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Workspace } from "@/components/sections/Workspace";
import { Agents } from "@/components/sections/Agents";
import { Workflow } from "@/components/sections/Workflow";
import { UseCases } from "@/components/sections/UseCases";
import { Integrations } from "@/components/sections/Integrations";
import { Control } from "@/components/sections/Control";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Manifesto />
        <Workspace />
        <Agents />
        <Workflow />
        <UseCases />
        <Integrations />
        <Control />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </MotionProvider>
  );
}
