"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Arrow, Button, Label, Star, Title } from "../ui";
export function Pricing() {
  const [active, setActive] = useState(0);
  const plan = site.pricing.plans[active];
  return (
    <section
      id="pricing"
      className="pricing wrap section-pad"
      aria-labelledby="pricing-title"
    >
      <div className="section-heading">
        <div>
          <Label>{site.pricing.eyebrow}</Label>
          <div id="pricing-title">
            <Title lines={site.pricing.title} />
          </div>
        </div>
        <p>{site.pricing.description}</p>
      </div>
      <div className="pricing-layout" data-reveal>
        <div className="pricing-choice">
          <div
            className="plan-selector"
            role="tablist"
            aria-label="Ways to work together"
          >
            {site.pricing.plans.map((item, index) => (
              <button
                role="tab"
                id={`plan-tab-${index}`}
                aria-controls="plan-panel"
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                key={item.name}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 1
                          : 1 - active;
                    setActive(next);
                    document.getElementById(`plan-tab-${next}`)?.focus();
                  }
                }}
              >
                <span>0{index + 1}</span>
                <strong>{item.name}</strong>
                <Arrow diagonal size={18} />
              </button>
            ))}
          </div>
          <div className="pricing-aside">
            <Star />
            <p>
              Good work starts
              <br />
              with a good fit.
            </p>
            <span>Let’s find yours.</span>
          </div>
        </div>
        <div
          className="plan-panel"
          role="tabpanel"
          id="plan-panel"
          aria-labelledby={`plan-tab-${active}`}
          tabIndex={0}
        >
          <div key={active} className="plan-content">
            <span className="plan-category">{plan.category}</span>
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.suffix}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href={contact(`Oddline — ${plan.name} enquiry`)}>
              {plan.cta}
            </Button>
            <span className="plan-timing">{plan.timing}</span>
          </div>
        </div>
      </div>
      <p className="pricing-note">{site.pricing.note}</p>
    </section>
  );
}
