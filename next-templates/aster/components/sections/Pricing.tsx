"use client";
import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { site, appHref, type Billing } from "@/site.config";
import { href } from "@/lib/urls";
import { useExperience } from "../Experience";
import { SectionHead, Art } from "../ui/Primitives";
export function Pricing({ primary = false }: { primary?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { open } = useExperience();
  const studio = site.plans[1];
  const annualSavings = studio.monthly! * 12 - studio.annual! * 12;
  return (
    <section
      className={`pricing section container ${primary ? "page-pricing" : ""}`}
      id="pricing"
    >
      <SectionHead
        label={site.pricing.label}
        lines={site.pricing.heading}
        text={site.pricing.text}
        center
        primary={primary}
      />
      <div className="billing-control">
        <span className={billing === "monthly" ? "active" : ""}>Monthly</span>
        <button
          role="switch"
          aria-label="Annual billing"
          aria-checked={billing === "annual"}
          onClick={() =>
            setBilling(billing === "monthly" ? "annual" : "monthly")
          }
        >
          <i />
        </button>
        <span className={billing === "annual" ? "active" : ""}>
          Yearly<small>Save ${annualSavings}</small>
        </span>
      </div>
      <div className="pricing-grid">
        {site.plans.map((plan, i) => {
          const price = billing === "annual" ? plan.annual : plan.monthly;
          return (
            <article
              className={`pricing-plan ${i === 1 ? "featured" : ""}`}
              key={plan.id}
            >
              {i === 1 && <Art name="petal" />}
              <div className="plan-title">
                <h3>{plan.name}</h3>
                {i === 1 && <span>For your studio</span>}
              </div>
              <p className="plan-price">
                {price === null
                  ? "Let's talk"
                  : price === 0
                    ? "Free"
                    : `$${price}`}
                <span>{price !== null && price > 0 ? " / month" : ""}</span>
              </p>
              <p className="plan-description">{plan.text}</p>
              <p className="plan-billing">
                {price === null
                  ? "A plan around your needs."
                  : price === 0
                    ? "A place to explore."
                    : billing === "annual"
                      ? `$${price * 12} billed once a year`
                      : `$${price} billed each month`}
              </p>
              <h4>Room for</h4>
              <ul className="check-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.monthly === 0 ? (
                <a className="button button-light" href={href(appHref())}>
                  {plan.cta}
                  <ArrowUpRight size={15} />
                </a>
              ) : (
                <button
                  className={`button ${i !== 1 ? "button-light" : ""}`}
                  onClick={() => open({ type: "plan", id: plan.id, billing })}
                >
                  {plan.cta}
                  <ArrowUpRight size={15} />
                </button>
              )}
            </article>
          );
        })}
      </div>
      <p className="small-note pricing-note">
        Example product plans. Review the complete amount before continuing.
      </p>
    </section>
  );
}
