"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { site, planHref, yearlySaving, type Billing } from "@/site.config";
import { ButtonLink, NumberRoll, SectionTitle } from "../ui/Primitives";

type Plan = (typeof site.pricing.plans)[number];

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  const buttons = useRef<Record<Billing, HTMLButtonElement | null>>({ monthly: null, yearly: null });
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);

  // The thumb is measured from the selected button so it fits any label length.
  useLayoutEffect(() => {
    const measure = () => {
      const el = buttons.current[billing];
      if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    Object.values(buttons.current).forEach((b) => b && observer.observe(b));
    return () => observer.disconnect();
  }, [billing]);

  return (
    <div className="billing" role="radiogroup" aria-label="Billing period" data-reveal="" style={{ "--rd": "120ms" } as CSSProperties}>
      {thumb && <span className="billing-thumb" style={{ transform: `translateX(${thumb.x}px)`, width: thumb.w }} aria-hidden="true" />}
      {(["monthly", "yearly"] as const).map((b) => (
        <button
          key={b}
          ref={(el) => {
            buttons.current[b] = el;
          }}
          type="button"
          role="radio"
          aria-checked={billing === b}
          className={billing === b ? "is-active" : undefined}
          onClick={() => onChange(b)}
          onKeyDown={(e) => {
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
              e.preventDefault();
              const next = billing === "monthly" ? "yearly" : "monthly";
              onChange(next);
              buttons.current[next]?.focus();
            }
          }}
          tabIndex={billing === b ? 0 : -1}
        >
          {b === "monthly" ? "Monthly" : "Yearly"}
          {b === "yearly" && <span className="billing-chip">{site.pricing.yearlyNote}</span>}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, billing, index }: { plan: Plan; billing: Billing; index: number }) {
  const price = plan.price;
  return (
    <article className={`plan${plan.featured ? " is-featured" : ""}`} data-reveal="" style={{ "--ry": "40px", "--rd": `${index * 90}ms` } as CSSProperties}>
      <header className="plan-head">
        <div>
          <h3>{plan.name}</h3>
          {plan.badge && <span className="plan-badge">{plan.badge}</span>}
        </div>
        <p className="plan-price">
          {price ? (
            <>
              <span className="plan-amount">
                $<NumberRoll value={String(price[billing])} />
              </span>
              <span className="plan-unit">/person/mo</span>
            </>
          ) : (
            <span className="plan-amount">Custom</span>
          )}
        </p>
      </header>
      <p className="plan-text">{plan.text}</p>
      <p className="plan-note">
        {price ? (
          <span className="morph">
            <span className={billing === "monthly" ? "is-active" : undefined} aria-hidden={billing !== "monthly"}>Billed monthly. Switch to yearly anytime.</span>
            <span className={billing === "yearly" ? "is-active" : undefined} aria-hidden={billing !== "yearly"}>
              Billed ${price.yearly * 12} a year. You save ${yearlySaving(price)}.
            </span>
          </span>
        ) : (
          "Volume pricing for 50 people or more."
        )}
      </p>
      <p className="plan-includes">Includes</p>
      <ul className="plan-list">
        {plan.features.map((f) => (
          <li key={f}>
            <Check size={12} strokeWidth={3} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <ul className="plan-list plan-extras">
        {plan.extras.map((f) => (
          <li key={f}>
            <Check size={12} strokeWidth={3} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <ButtonLink to={planHref(plan, billing)} label={plan.cta} variant={plan.featured ? "blue" : "ink"} arrow className="plan-cta" />
    </article>
  );
}

export function Pricing() {
  const { pricing } = site;
  const [billing, setBilling] = useState<Billing>("monthly");
  const featured = pricing.plans.filter((p) => p.featured);
  const others = pricing.plans.filter((p) => !p.featured);
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionTitle lines={pricing.heading} />
        <BillingToggle billing={billing} onChange={setBilling} />
        {/* The featured plan stands on its own dark card; the others share one panel. */}
        <div className="plans">
          {featured.map((plan, i) => (
            <PlanCard plan={plan} billing={billing} index={i} key={plan.id} />
          ))}
          <div className="plans-panel">
            {others.map((plan, i) => (
              <PlanCard plan={plan} billing={billing} index={featured.length + i} key={plan.id} />
            ))}
          </div>
        </div>
        <p className="plans-footnote">{pricing.footnote}</p>
      </div>
    </section>
  );
}
