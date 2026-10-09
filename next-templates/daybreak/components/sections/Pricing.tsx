"use client";
import { href } from "@/lib/urls";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { money } from "@/data/campaigns";
import { Frame, SectionHead } from "../ui/Primitives";
export function Pricing({ standalone = false }: { standalone?: boolean }) {
  const [annual, setAnnual] = useState(false);
  return (
    <Frame
      id="pricing"
      className={`pricing-section ${standalone ? "pricing-standalone" : ""}`}
    >
      <div className="section-inner">
        <SectionHead
          label={site.pricing.label}
          title={site.pricing.heading}
          text={site.pricing.text}
          level={standalone ? 1 : 2}
        />
        <div
          className="billing-switch"
          role="group"
          aria-label="Billing period"
        >
          <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button aria-pressed={annual} onClick={() => setAnnual(true)}>
            Yearly
          </button>
        </div>
        <div className="pricing-grid">
          {site.plans.map((plan, i) => (
            <article
              className={`price-plan ${plan.popular ? "price-popular" : ""}`}
              key={plan.id}
            >
              <header>
                <h3>{plan.name}</h3>
                {plan.popular && <span>Popular choice</span>}
              </header>
              <div className="plan-amount" aria-live="polite">
                {plan.monthly === 0 ? (
                  <strong>Free</strong>
                ) : (
                  <strong>
                    <span>$</span>
                    {annual ? plan.annual : plan.monthly}
                  </strong>
                )}
                <p>
                  {plan.monthly === 0
                    ? "A place to begin"
                    : annual
                      ? `${money(plan.annual * 12)} billed once a year`
                      : "Per month, billed monthly"}
                </p>
              </div>
              <a
                className={`button ${plan.popular ? "button-dark" : "button-light"}`}
                href={plan.checkout[annual ? "annual" : "monthly"] || href("/contact")}
              >
                {plan.cta}
                <ArrowRight size={15} />
              </a>
              <p className="plan-description">{plan.description}</p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <span>
                      <Check size={11} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Example product plans. Review the amount and cadence before
          continuing.
        </p>
      </div>
    </Frame>
  );
}
