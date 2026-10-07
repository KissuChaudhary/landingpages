import { Section, SectionHeader } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

import { PricingPlans } from "./PricingPlans";

export function Pricing() {
  const { eyebrow, title, description } = siteConfig.pricing;
  return (
    <Section id="pricing">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <PricingPlans />
    </Section>
  );
}
