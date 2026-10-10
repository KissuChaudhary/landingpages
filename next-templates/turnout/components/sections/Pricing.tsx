"use client";

import { useState } from "react";
import { site, type Plan } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action, ArrowDot, SmartLink } from "@/components/ui/Action";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
import { Check } from "@/components/ui/Icons";

// Two retainers and a custom option. The billing switch throws its thumb across, every
// price rolls to its new figure and the billing note slides in from the side you chose.

type Billing = "quarterly" | "yearly";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: site.pricing.currency, maximumFractionDigits: 0 }).format(value);

/** Where a plan's button goes: its own link, or the contact page with the plan filled in. */
const planLink = (plan: Plan, billing: Billing) => plan.href || `/contact?plan=${plan.id}&billing=${billing}`;

export function Pricing() {
  const { pricing } = site;
  const [billing, setBilling] = useState<Billing>("quarterly");
  const [moved, setMoved] = useState<"left" | "right">("left");
  const choose = (next: Billing) => {
    if (next === billing) return;
    setMoved(next === "yearly" ? "right" : "left");
    setBilling(next);
  };

  return (
    <section id="pricing" className="section pricing" aria-labelledby="pricing-title">
      <div className="container pricing-grid">
        <div className="pricing-intro">
          <span className="tag" data-reveal>
            {pricing.label}
          </span>
          <h2 id="pricing-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {pricing.title}
          </h2>
          <div className="billing" role="radiogroup" aria-label="Billing" data-reveal style={{ "--d": "160ms" } as React.CSSProperties} data-billing={billing}>
            <span className="billing-thumb" aria-hidden="true" />
            <button type="button" role="radio" aria-checked={billing === "quarterly"} onClick={() => choose("quarterly")}>
              Quarterly
            </button>
            <button type="button" role="radio" aria-checked={billing === "yearly"} onClick={() => choose("yearly")}>
              Yearly <span className="billing-save">Save {pricing.saving}%</span>
            </button>
          </div>
          <SmartLink to="/contact?plan=custom" className="custom" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
            <span className="custom-photo">
              <img src={asset(pricing.custom.image)} alt="" width={96} height={96} loading="lazy" />
              <span className="custom-online" aria-hidden="true" />
            </span>
            <span className="custom-copy">
              <strong>{pricing.custom.title}</strong>
              <span>{pricing.custom.action}</span>
            </span>
            <ArrowDot tone="ink" size={34} />
          </SmartLink>
        </div>

        {pricing.plans.map((plan, i) => {
          const monthly = plan[billing];
          const total = billing === "yearly" ? monthly * 12 : monthly * 3;
          return (
            <article key={plan.id} className={`plan ${plan.featured ? "is-featured" : ""}`} data-reveal style={{ "--d": `${120 + i * 120}ms` } as React.CSSProperties} aria-labelledby={`plan-${plan.id}`}>
              <div className="plan-head">
                <div className="plan-name-row">
                  <h3 id={`plan-${plan.id}`} className="plan-name">
                    {plan.name}
                  </h3>
                  {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
                </div>
                <p className="plan-audience">{plan.audience}</p>
                <p className="plan-price">
                  <NumberRoll value={monthly} format={{ style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }} />
                  <span className="plan-per">/mo</span>
                </p>
                <p className={`plan-note from-${moved}`} key={billing}>
                  {billing === "yearly" ? `Billed yearly · ${money(total)} a year` : `Billed quarterly · ${money(total)} a quarter`}
                </p>
              </div>
              <ul className="plan-features is-in js-draw">
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className="plan-tick">
                      <Check size={11} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Action to={planLink(plan, billing)} label={`Book ${plan.name}`} tone={plan.featured ? "light" : "ink"} className="plan-action" />
            </article>
          );
        })}
      </div>
      <p className="container pricing-fine small" data-reveal>
        Retainers cover our team. Production budgets are quoted per event and approved before anything is spent.{" "}
        <TextMorph>{billing === "yearly" ? "Yearly retainers are paid up front." : "Quarterly retainers renew every three months."}</TextMorph>
      </p>
    </section>
  );
}
