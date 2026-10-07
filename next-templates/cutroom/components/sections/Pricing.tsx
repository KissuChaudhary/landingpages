import { Section, SceneHead } from "@/components/ui/Section";
import { siteConfig } from "@/site.config";

import { PricingCalculator } from "./PricingCalculator";

export function Pricing() {
  const { scene, label, title, description } = siteConfig.pricing;
  return (
    <Section id="pricing">
      <SceneHead scene={scene} label={label} title={title} description={description} />
      <PricingCalculator />
    </Section>
  );
}
