"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
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
      <div className="pricing-intro">
        <div>
          <p className="eyebrow">
            <span className="section-number">{content.number}</span>
            {content.eyebrow}
          </p>
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
          {saving > 0 && <span>{saving}% less, billed yearly</span>}
        </div>
      </div>
      <div className="plan-columns">
        {content.plans.map((plan, index) => (
          <article
            className={`plan-column ${index === 1 ? "plan-featured" : ""}`}
            key={plan.id}
          >
            <div className="plan-topline">
              <span>
                0{index + 1} / {plan.name.toUpperCase()}
              </span>
              <span>{index === 1 ? "✳" : "+"}</span>
            </div>
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
              className={`button ${index === 1 ? "button-dark" : "button-outline"}`}
              onClick={() => choosePlan(plan, yearly)}
            >
              {plan.action}
              <ArrowUpRight size={16} />
            </button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={13} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="plan-comparison">
        <table>
          <caption className="sr-only">Compare Personal and Builder</caption>
          <thead>
            <tr>
              <th scope="col">A FEW GOOD DETAILS</th>
              <th scope="col">Personal</th>
              <th scope="col">Builder</th>
            </tr>
          </thead>
          <tbody>
            {content.comparison.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {[row.personal, row.builder].map((available, index) => (
                  <td key={index}>
                    {available ? (
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
