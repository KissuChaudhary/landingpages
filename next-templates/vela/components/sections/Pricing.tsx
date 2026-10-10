"use client";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { site, type Billing } from "@/site.config";
import { planHref } from "@/lib/urls";
import { Button, Reveal, SectionHead } from "@/components/ui/Primitives";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: site.pricing.currency,
      maximumFractionDigits: 0,
    }).format(value);
  return (
    <section className="pricing section frame" id="pricing">
      <SectionHead {...site.pricing} />
      <div
        className={`billing-toggle ${billing === "annual" ? "annual" : ""}`}
        role="group"
        aria-label="Billing period"
      >
        <span className="billing-indicator" aria-hidden="true" />
        <button
          type="button"
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={billing === "annual"}
          onClick={() => setBilling("annual")}
        >
          Yearly<span>Save annually</span>
        </button>
      </div>
      <div className="plan-grid">
        {site.pricing.plans.map((plan, index) => (
          <Reveal
            className={`plan ${plan.featured ? "featured" : ""}`}
            key={plan.id}
            delay={index * 70}
          >
            <div className="plan-name">
              <h3>{plan.name}</h3>
              {plan.featured && (
                <span>
                  <Sparkles size={11} />A team favorite
                </span>
              )}
            </div>
            <p>{plan.text}</p>
            <div className="plan-price">
              <NumberRoll value={plan[billing]} prefix="$" />
              <span>/ month</span>
            </div>
            <div className="billing-note">
              <TextMorph>
                {billing === "annual"
                  ? `${money(plan.annual * 12)} billed yearly · save ${money((plan.monthly - plan.annual) * 12)}`
                  : "Billed monthly. Room to grow."}
              </TextMorph>
            </div>
            <Button
              href={planHref(plan, billing)}
              tone={plan.featured ? "dark" : "outline"}
            >
              {plan.cta}
            </Button>
            <div className="plan-includes">
              A little structure. A lot of possibility.
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <p className="section-note">{site.pricing.note}</p>
    </section>
  );
}
