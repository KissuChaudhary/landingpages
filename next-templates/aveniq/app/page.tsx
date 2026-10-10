import { Navigation } from "@/components/Navigation";
import { Motion } from "@/components/Motion";
import { Hero } from "@/components/sections/Hero";
import { Platform } from "@/components/sections/Platform";
import { Workflow } from "@/components/sections/Workflow";
import { Stories } from "@/components/sections/Stories";
import { Context } from "@/components/sections/Context";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing, Footer } from "@/components/sections/Closing";
export default function Page() {
  return (
    <>
      <Motion />
      <Navigation />
      <main id="main">
        <Hero />
        <Platform />
        <Workflow />
        <Stories />
        <Context />
        <Pricing />
        <FAQ />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
