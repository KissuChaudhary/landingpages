import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Closing } from "@/components/sections/Closing";
export const metadata = { title: "Plans & pricing" };
export default function PricingPage() {
  return (
    <main id="main">
      <Pricing standalone />
      <FAQ />
      <Closing />
    </main>
  );
}
