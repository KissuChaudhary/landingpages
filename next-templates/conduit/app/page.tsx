import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Stories } from "@/components/sections/Stories";
import { Capabilities } from "@/components/sections/Capabilities";
import { Security } from "@/components/sections/Security";
import { Industries } from "@/components/sections/Industries";
import { FAQ } from "@/components/sections/FAQ";
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Stories />
      <Capabilities />
      <Security />
      <Industries />
      <FAQ />
    </>
  );
}
