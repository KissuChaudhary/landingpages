"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { site, type Plan } from "@/site.config";
import { planPrice, type Billing } from "@/lib/content";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Action } from "@/components/ui/Action";
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("yearly");
  // A plan goes to its checkout link. Until one is set, the free plan opens
  // the working example and paid plans start an email to your team.
  const planHref = (plan: Plan) =>
    plan.checkout[billing] ||
    (plan.monthly === 0
      ? site.links.app || "#research"
      : `mailto:${site.links.email}?subject=${encodeURIComponent(
          `${plan.name} plan, billed ${billing}`,
        )}`);
  return (
    <section
      id="pricing"
      className="pricing section"
      aria-labelledby="pricing-heading"
    >
      <div className="container">
        <div className="pricing-heading">
          <div className="section-heading">
            <SectionBadge>{site.pricing.badge}</SectionBadge>
            <h2 id="pricing-heading">{site.pricing.heading}</h2>
            <p>{site.pricing.description}</p>
          </div>
          <div className="billing" role="group" aria-label="Billing period">
            <button
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              aria-pressed={billing === "yearly"}
              onClick={() => setBilling("yearly")}
            >
              Yearly <span>Save up to 21%</span>
            </button>
          </div>
        </div>
        <div className="plan-grid">
          {site.plans.map((item) => {
            const price = planPrice(item, billing);
            return (
              <article
                key={item.id}
                className={`plan ${item.featured ? "plan--featured" : ""}`}
              >
                <div className="plan__name">
                  <h3>{item.name}</h3>
                  {item.featured && (
                    <span className="plan__recommended">For the curious</span>
                  )}
                </div>
                <p className="plan__description">{item.description}</p>
                <div className="plan__price">
                  <span>${price.monthly}</span>
                  <span>{price.perSeat ? "/ person / month" : "/ month"}</span>
                </div>
                <p className="plan__billing">
                  {price.total === 0
                    ? "Free, for your first discoveries."
                    : billing === "yearly"
                      ? `$${price.total} billed yearly${price.perSeat ? " per person" : ""}`
                      : `$${price.total} billed monthly${price.perSeat ? " per person" : ""}`}
                </p>
                <Action
                  href={planHref(item)}
                  variant={item.featured ? "primary" : "secondary"}
                >
                  {item.action}
                </Action>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="pricing-note">
          Illustrative plans for a fictional product. Replace the prices and
          checkout links in the configuration.
        </p>
      </div>
    </section>
  );
}
