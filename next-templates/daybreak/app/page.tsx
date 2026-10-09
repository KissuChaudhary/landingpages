import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Product } from "@/components/sections/Product";
import { Workspace } from "@/components/sections/Workspace";
import { Integrations } from "@/components/sections/Integrations";
import { Solutions } from "@/components/sections/Solutions";
import { Stories } from "@/components/sections/Stories";
import { Pricing } from "@/components/sections/Pricing";
import { Closing } from "@/components/sections/Closing";
import { Week } from "@/components/sections/Week";
import { Trust } from "@/components/sections/Trust";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logos />
      <Product />
      <Workspace />
      <Week />
      <Integrations />
      <Solutions />
      <Stories />
      <Trust />
      <Pricing />
      <Closing />
    </main>
  );
}
