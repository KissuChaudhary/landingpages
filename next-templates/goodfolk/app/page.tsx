import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { Work } from "@/components/home/Work";
import { Process } from "@/components/home/Process";
import { Engagements } from "@/components/home/Engagements";
import { Studio } from "@/components/home/Studio";
import { Journal } from "@/components/home/Journal";
import { FAQ } from "@/components/home/FAQ";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Approach />
      <Work />
      <Process />
      <Engagements />
      <Studio />
      <Journal />
      <FAQ />
    </main>
  );
}
