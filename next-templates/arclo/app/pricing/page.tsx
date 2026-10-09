import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
export const metadata = { title: "Pricing" };
export default function PricingPage() {
  return (
    <main id="main">
      <Pricing comparison />
      <Faq />
      <Closing />
    </main>
  );
}
