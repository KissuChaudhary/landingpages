import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Capabilities } from "@/components/sections/Capabilities";
import { Systems } from "@/components/sections/Systems";
import { Approach } from "@/components/sections/Approach";
import { Foundation } from "@/components/sections/Foundation";
import { Engagements } from "@/components/sections/Engagements";
import { FAQ } from "@/components/sections/FAQ";
import { Journal } from "@/components/sections/Journal";
export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Capabilities />
      <Systems />
      <Approach />
      <Foundation />
      <Engagements />
      <FAQ />
      <Journal />
    </>
  );
}
