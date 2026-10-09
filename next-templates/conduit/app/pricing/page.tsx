import type { Metadata } from "next";
import { PricingContent } from "@/components/PricingContent";
import { FAQ } from "@/components/sections/FAQ";
export const metadata: Metadata = { title: "Plans & pricing" };
export default function PricingPage() {
  return (
    <>
      <PricingContent />
      <FAQ />
    </>
  );
}
