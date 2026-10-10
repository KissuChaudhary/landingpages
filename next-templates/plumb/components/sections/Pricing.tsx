"use client";

import { site, tierFor } from "@/site.config";
import { mailto, signupHref } from "@/lib/links";
import { PricingCalculator } from "@/components/hairline/pricing-calculator";
import { Tag } from "@/components/ui/Primitives";

/*
 * PRICING: one plan, sized by traffic (the Hairline UI pricing calculator).
 *   drag     the price rolls as you slide through the tiers and the plan's name morphs
 *   yearly   a switch rolls every figure to its yearly price
 *   buttons  go to links.signup with the plan, billing and pageviews filled in; past the
 *            last tier, to an email (links.email)
 * Tiers, marks and the discount are in site.config.ts → pricing.
 */

const COMPACT: Intl.NumberFormatOptions = { notation: "compact", maximumFractionDigits: 1 };

export function Pricing() {
  const { pricing } = site;

  const choose = (views: number, plan: string, billing: "monthly" | "yearly") => {
    if (views >= pricing.contactFrom) {
      window.location.href = mailto(`${site.brand.name} for more than ${views.toLocaleString(site.locale)} pageviews`);
      return;
    }
    const target = signupHref({ plan: plan.toLowerCase(), billing, pageviews: String(views) });
    window.location.href = target.startsWith("/#") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${target.slice(1)}` : target;
  };

  return (
    <section id="pricing" className="section pricing" aria-labelledby="pricing-title">
      <div className="wrap pricing-grid">
        <div className="pricing-head">
          <Tag>{pricing.tag}</Tag>
          <h2 id="pricing-title" className="h2" data-reveal>
            {pricing.title}
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {pricing.body}
          </p>
          <ul className="pricing-includes" data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            {pricing.includes.map((item, i) => (
              <li key={item} style={{ "--i": i } as React.CSSProperties}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="draw" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-card" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <PricingCalculator
            label="Monthly pageviews"
            min={pricing.min}
            max={pricing.max}
            defaultValue={pricing.start}
            scale="log"
            unit={pricing.unit}
            valueFormat={COMPACT}
            price={(v) => tierFor(v).price}
            plan={(v) => tierFor(v).plan}
            marks={pricing.marks}
            contactFrom={pricing.contactFrom}
            yearlyDiscount={pricing.yearlyDiscount}
            locales={site.locale}
            cta={{ label: (plan) => `Try ${plan} free`, contactLabel: "Talk to us", onClick: choose }}
          />
          <div className="pricing-foot">
            <p>{pricing.trial}</p>
            <p>
              {pricing.note.label}{" "}
              <a className="text-link" href={mailto(pricing.note.subject)}>
                {pricing.note.action}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
