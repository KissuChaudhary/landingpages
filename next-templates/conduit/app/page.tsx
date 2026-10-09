import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Impact } from "@/components/sections/Impact";
import { Capabilities } from "@/components/sections/Capabilities";
import { Industries } from "@/components/sections/Industries";
import { Stories } from "@/components/sections/Stories";
import { Security } from "@/components/sections/Security";
import { FAQ } from "@/components/sections/FAQ";
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Impact />
      <Capabilities />
      <Industries />
      <Stories />
      <Security />
      <FAQ />
    </>
  );
}
