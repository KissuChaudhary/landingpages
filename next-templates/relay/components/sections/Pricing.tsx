"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
import { formatAmount } from "@/lib/pricing";
import { GridSection } from "@/components/ui/GridSection";
export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const { choosePlan } = useRelay();
  const paid = site.pricing.plans.find((plan) => plan.monthly > 0);
  const saving = paid
    ? Math.round((1 - paid.annual / (paid.monthly * 12)) * 100)
    : 0;
  return (
    <GridSection
      className="pricing-section"
      hatch
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className="pricing-introduction">
        <div>
          <h2 id="pricing-title">{site.pricing.title}</h2>
          <p>{site.pricing.description}</p>
        </div>
        <div className="billing">
          <div role="group" aria-label="Billing period">
            <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
          <span>
            {yearly && saving > 0
              ? `${saving}% less, billed yearly`
              : "A simple monthly plan"}
          </span>
        </div>
      </div>
      <div className="plan-ledger">
        {site.pricing.plans.map((plan) => (
          <article className="plan-column" key={plan.name}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="plan-price">
              <strong>
                ${formatAmount(yearly ? plan.annual / 12 : plan.monthly)}
              </strong>
              <span>/ month</span>
            </div>
            <p className="plan-billing">
              {plan.monthly === 0
                ? "Free, for a first thought."
                : yearly
                  ? `$${formatAmount(plan.annual)} billed once a year`
                  : `$${formatAmount(plan.monthly)} billed each month`}
            </p>
            <button
              className={`button ${plan.monthly ? "button-blue" : "button-ink"}`}
              onClick={() => choosePlan(plan, yearly)}
            >
              {plan.action}
              <ArrowUpRight size={18} />
            </button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-note">{site.pricing.note}</p>
    </GridSection>
  );
}
