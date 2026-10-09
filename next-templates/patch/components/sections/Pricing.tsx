"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { GridIntersections } from "@/components/ui/Grid";
export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const { choosePlan } = usePatch();
  const content = site.pricing;
  const paid = content.plans.find((plan) => plan.monthly > 0);
  const saving = paid
    ? Math.round((1 - paid.yearly / (paid.monthly * 12)) * 100)
    : 0;
  return (
    <section
      id="pricing"
      className="grid-section pricing-section"
      aria-label="Patch plans"
    >
      <GridIntersections />
      <div className="pricing-intro">
        <div>
          <SectionBadge label={content.badge} />
          <h2>
            {content.title}
            <br />
            <span className="subtle-heading">{content.emphasis}</span>
          </h2>
          <p className="pricing-description">{content.description}</p>
        </div>
        <div className="pricing-period">
          <div role="group" aria-label="Billing period">
            <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
              {content.monthly}
            </button>
            <button aria-pressed={yearly} onClick={() => setYearly(true)}>
              {content.yearly}
            </button>
          </div>
          <span>
            {yearly && saving > 0
              ? `${saving}% less, billed yearly`
              : "Billed each month"}
          </span>
        </div>
      </div>
      <div className="plan-columns">
        {content.plans.map((plan) => (
          <article
            className={`plan-column ${"featured" in plan && plan.featured ? "plan-featured" : ""}`}
            key={plan.id}
          >
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              ${yearly ? plan.yearly / 12 : plan.monthly}
              <span>/ month</span>
            </div>
            <p className="plan-total">
              {plan.monthly === 0
                ? "Free, for your first thought."
                : yearly
                  ? `$${plan.yearly} billed once a year`
                  : `$${plan.monthly} billed each month`}
            </p>
            <button
              className={`button ${"featured" in plan && plan.featured ? "button-dark" : "button-outline"}`}
              onClick={() => choosePlan(plan, yearly)}
            >
              {plan.action}
              <ArrowUpRight size={18} />
            </button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="plan-comparison">
        <table>
          <caption className="sr-only">
            Compare {content.plans.map((plan) => plan.name).join(", ")}
          </caption>
          <thead>
            <tr>
              <th scope="col">Compare plans</th>
              {content.plans.map((plan) => (
                <th scope="col" key={plan.id}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.comparison.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {content.plans.map((plan) => (
                  <td key={plan.id}>
                    {row.included.includes(plan.id) ? (
                      <Check size={15} aria-label="Included" />
                    ) : (
                      <Minus size={15} aria-label="Not included" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="pricing-note">{content.note}</p>
    </section>
  );
}
