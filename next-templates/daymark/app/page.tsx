import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { Studio } from "@/components/sections/Studio";
import { Rhythm } from "@/components/sections/Rhythm";
import { Engagements } from "@/components/sections/Engagements";
import { Journal } from "@/components/sections/Journal";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Approach />
      <Studio />
      <Rhythm />
      <Engagements />
      <Journal />
      <Faq />
      <Closing />
    </>
  );
}
