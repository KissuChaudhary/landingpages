import { Hero } from "@/components/sections/Hero";
import { TrackStrip } from "@/components/sections/TrackStrip";
import { Statement } from "@/components/sections/Statement";
import { Outcomes } from "@/components/sections/Outcomes";
import { Weeks } from "@/components/sections/Weeks";
import { Teacher } from "@/components/sections/Teacher";
import { Platform } from "@/components/sections/Platform";
import { Stories } from "@/components/sections/Stories";
import { Included } from "@/components/sections/Included";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Hero />
      <TrackStrip />
      <Statement />
      <Outcomes />
      <Weeks />
      <Teacher />
      <Platform />
      <Stories />
      <Included />
      <Pricing />
      <Faq />
      <Closing />
    </>
  );
}
