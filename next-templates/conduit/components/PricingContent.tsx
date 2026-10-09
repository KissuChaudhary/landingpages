"use client";
import { route } from "@/lib/urls";
import { useState } from "react";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import { planQuote } from "@/lib/billing";
import { Button, Frame, SectionHead } from "./ui/Primitives";
export function PricingContent() {
  const [annual, setAnnual] = useState(true);
  return (
    <Frame className="section pricing-page">
      <SectionHead
        level={1}
        label={site.pricing.label}
        title={site.pricing.title}
        centered
      >
        <p className="page-description">{site.pricing.description}</p>
      </SectionHead>
      <div className="billing-toggle" role="group" aria-label="Billing period">
        <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
          Monthly
        </button>
        <button aria-pressed={annual} onClick={() => setAnnual(true)}>
          Annually<span>Save with yearly</span>
        </button>
      </div>
      <div className="pricing-grid">
        {site.pricing.plans.map((plan, i) => {
          const quote = planQuote(plan, annual);
          const price = quote.monthlyRate;
          const url = annual ? plan.annualUrl : plan.monthlyUrl;
          return (
            <article key={plan.id} className={i === 1 ? "featured-plan" : ""}>
              <div className="plan-top">
                <span className="micro">
                  {i === 1
                    ? "For the everyday builder"
                    : i === 0
                      ? "A place to begin"
                      : "For the wider team"}
                </span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="plan-price">
                <strong>${price}</strong>
                <span>/ month</span>
              </div>
              <p className="plan-billing">
                {price === 0
                  ? "Free to explore."
                  : annual
                    ? `$${quote.due} billed once a year`
                    : `$${price} billed monthly`}
              </p>
              <Button
                variant={i === 1 ? "solid" : "outline"}
                href={url || route("/contact")}
              >
                {plan.cta}
              </Button>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="pricing-note">
        Example product plans. Review the selection before connecting your own
        checkout.
      </p>
    </Frame>
  );
}
