"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { contact, sales } from "@/lib/links";
import { Button, Check, Label } from "../ui";
export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="pricing section-shell section-space">
      <div className="pricing-heading">
        <Label>{site.pricing.eyebrow}</Label>
        <h2 className="section-title" data-title>
          {site.pricing.title}
        </h2>
        <p className="section-description">{site.pricing.description}</p>
        <div className="billing">
          <div
            className="billing-toggle"
            role="group"
            aria-label="Billing period"
          >
            <span
              className={
                annual ? "billing-indicator yearly" : "billing-indicator"
              }
              aria-hidden="true"
            />
            <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
              {site.pricing.monthly}
            </button>
            <button aria-pressed={annual} onClick={() => setAnnual(true)}>
              {site.pricing.annual}
            </button>
          </div>
          <span className="billing-note">{site.pricing.annualNote} ↗</span>
        </div>
      </div>
      <div className="plan-grid">
        {site.pricing.plans.map((plan, index) => (
          <article
            key={plan.name}
            className={`plan ${plan.featured ? "plan-featured" : ""}`}
            data-reveal
          >
            {plan.featured && (
              <span className="plan-badge">For the shared picture</span>
            )}
            <div className="plan-heading">
              <h3>{plan.name}</h3>
              <p>{plan.tagline}</p>
            </div>
            <div className="plan-price">
              <span className="price-value" key={annual ? "annual" : "monthly"}>
                {plan.monthly === null
                  ? "Let’s talk"
                  : `$${annual ? plan.annual : plan.monthly}`}
              </span>
              <span className="price-unit">{plan.unit}</span>
            </div>
            <span className="plan-billing-note">
              {index === 1
                ? annual
                  ? `$${((plan.annual || 0) * 12).toLocaleString("en-US")} per person, billed yearly`
                  : "Billed monthly, per person"
                : index === 0
                  ? "A place to begin"
                  : "A plan for your wider team"}
            </span>
            <Button
              href={
                plan.href ||
                (index === 2 ? sales() : contact(`${plan.name} plan enquiry`))
              }
              variant={plan.featured ? "primary" : "secondary"}
            >
              {plan.cta}
            </Button>
            <div className="plan-divider" />
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-note">{site.pricing.note}</p>
    </section>
  );
}
