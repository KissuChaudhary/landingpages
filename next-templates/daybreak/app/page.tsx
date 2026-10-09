import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Product } from "@/components/sections/Product";
import { Workspace } from "@/components/sections/Workspace";
import { Integrations } from "@/components/sections/Integrations";
import { Solutions } from "@/components/sections/Solutions";
import { Stories } from "@/components/sections/Stories";
import { Pricing } from "@/components/sections/Pricing";
import { Closing } from "@/components/sections/Closing";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Logos />
      <Product />
      <Workspace />
      <Integrations />
      <Solutions />
      <Stories />
      <Pricing />
      <Closing />
    </main>
  );
}
