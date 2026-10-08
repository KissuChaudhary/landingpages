"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { site, type Plan } from "@/site.config";
import { usePrism } from "@/components/PrismProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const { setDialog } = usePrism();
  function choose(plan: Plan) {
    if (plan.href) window.location.assign(plan.href);
    else setDialog({ kind: "plan", plan, annual });
  }
  return (
    <section
      className="section pricing-section container"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <SectionHeading {...site.pricing} centered id="pricing-title" />
      <div className="billing-row">
        <div
          className="billing-toggle"
          role="group"
          aria-label="Billing period"
        >
          <button
            type="button"
            aria-pressed={!annual}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={annual}
            onClick={() => setAnnual(true)}
          >
            Yearly
          </button>
        </div>
        <span className="billing-saving">{site.pricing.annualLabel}</span>
      </div>
      <div className="pricing-grid">
        {site.pricing.plans.map((plan: Plan) => (
          <article
            key={plan.id}
            className={`plan${plan.featured ? " plan-featured" : ""}`}
          >
            <div className="plan-heading">
              <h3>{plan.name}</h3>
              {plan.featured && (
                <span className="plan-badge">
                  <Sparkles size={12} />
                  More room to play
                </span>
              )}
            </div>
            <p className="plan-description">{plan.description}</p>
            <p className="plan-price">
              <span>
                {site.pricing.currency}
                {annual ? plan.annualMonthly : plan.monthly}
              </span>
              <span>/ month</span>
            </p>
            <p className="plan-billing">
              {plan.monthly === 0
                ? "Free to explore"
                : annual
                  ? `${site.pricing.currency}${plan.annualMonthly * 12} billed yearly`
                  : "Billed monthly"}
            </p>
            <button
              className={`button ${plan.featured ? "button-primary" : "button-outline"}`}
              onClick={() => choose(plan)}
            >
              Choose {plan.name}
              <ArrowUpRight size={16} />
            </button>
            <div className="plan-credits">
              <span className="credit-symbol" aria-hidden="true">
                ✳
              </span>
              {plan.credits}
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="section-footnote">{site.pricing.note}</p>
    </section>
  );
}
