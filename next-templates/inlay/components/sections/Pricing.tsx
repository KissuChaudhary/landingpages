"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { planHref, signupHref } from "@/lib/links";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
import { TileWords } from "@/components/ui/TileWords";
import { Button } from "@/components/ui/Action";
import { Mark } from "@/components/ui/Brand";
import { Check } from "@/components/ui/Icons";

// Free beside Plus in one card. The billing switch throws its thumb across, Plus's price
// rolls like an odometer and the billing note slides in from the side you picked.

type Billing = "monthly" | "yearly";

export function Pricing() {
  const { pricing } = site;
  const handle = useHandle();
  const [billing, setBilling] = useState<Billing>("monthly");
  const yearly = billing === "yearly";
  const fmt = (n: number) => new Intl.NumberFormat("en-IE", { style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }).format(n);

  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title" data-dock-hide>
      <div className="container">
        <div className="head">
          <TileWords id="pricing-title" text={pricing.title} className="h2" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {pricing.description}
          </p>
          <div className="bill" data-billing={billing} role="group" aria-label="Billing period" data-reveal style={{ "--d": "200ms" } as CSSProperties}>
            <span className="bill-thumb" aria-hidden="true" />
            <button type="button" aria-pressed={!yearly} onClick={() => setBilling("monthly")}>
              Monthly
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setBilling("yearly")}>
              Yearly <span className="bill-save">−{pricing.saving}%</span>
            </button>
          </div>
        </div>

        <div className="plans" data-reveal="scale" style={{ "--d": "120ms" } as CSSProperties}>
          {pricing.plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const free = plan.monthly === 0;
            const note = free ? plan.note : yearly ? `${fmt(plan.yearly * 12)} billed yearly` : "Billed monthly, cancel anytime";
            return (
              <article key={plan.name} className={`plan ${plan.featured ? "is-featured" : ""}`}>
                <header className="plan-head">
                  {plan.featured && (
                    <span className="plan-mark" aria-hidden="true">
                      <Mark size={22} className="is-set" />
                    </span>
                  )}
                  <h3 className="h4">{plan.name}</h3>
                  {!free && <span className="plan-note">{plan.note}</span>}
                </header>
                <p className="plan-price">
                  {free ? (
                    <span className="plan-amount">{fmt(0)}</span>
                  ) : (
                    <NumberRoll className="plan-amount" value={price} format={{ style: "currency", currency: pricing.currency, maximumFractionDigits: 0 }} locales="en-IE" />
                  )}
                  <span className="plan-per">{free ? "forever" : "/ month"}</span>
                </p>
                <p className={`plan-bill ${yearly ? "from-right" : "from-left"}`} key={free ? "free" : billing}>
                  {free ? note : <TextMorph>{note}</TextMorph>}
                </p>
                <ul className="plan-list">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button to={free ? signupHref(handle, "free") : planHref(plan, billing, handle)} label={plan.cta} tone={plan.featured ? "ultra" : "line"} className="plan-cta" />
              </article>
            );
          })}
        </div>
        <p className="small pricing-foot" data-reveal="fade">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}
