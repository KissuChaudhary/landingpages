import { Tour } from "@/components/sections/Tour";
import { Scale } from "@/components/sections/Scale";
import { Spec } from "@/components/sections/Spec";
import { Voices } from "@/components/sections/Voices";
import { Pricing } from "@/components/sections/Pricing";
import { Letter } from "@/components/sections/Letter";
import { Shipped } from "@/components/sections/Shipped";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";

// Reorder, remove or duplicate sections here. Their copy lives in site.config.ts.
export default function Home() {
  return (
    <>
      <Tour />
      <Scale />
      <Spec />
      <Voices />
      <Pricing />
      <Letter />
      <Shipped />
      <Faq />
      <Closing />
    </>
  );
}
