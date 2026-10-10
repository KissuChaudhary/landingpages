"use client";
import { useState } from "react";
import { site } from "@/site.config";
import { Button, Eyebrow, Title } from "@/components/ui";
import { NumberRoll } from "@/components/motion/NumberRoll";
export function Engagements() {
  const [partner, setPartner] = useState(false);
  const data = site.engagements;
  return (
    <section className="engagements section light" id="engagements">
      <div className="section-heading">
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <Title lines={data.title} />
        </div>
        <p data-reveal>{data.description}</p>
      </div>
      <div
        className="engagement-choice"
        role="group"
        aria-label="Engagement type"
        data-reveal
      >
        <span
          className={`choice-track ${partner ? "partner-selected" : ""}`}
          aria-hidden="true"
        />
        {data.modes.map((mode, i) => (
          <button
            key={mode}
            aria-pressed={partner === Boolean(i)}
            onClick={() => setPartner(Boolean(i))}
          >
            {mode}
          </button>
        ))}
      </div>
      <div className="plan-grid">
        {data.plans.map((plan) => (
          <article
            className={`plan tone-${plan.color}`}
            key={plan.name}
            data-reveal
          >
            <div className="plan-top">
              <span className="mono">{plan.label}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price" aria-live="polite" aria-atomic="true">
              <NumberRoll value={partner ? plan.partnerPrice : plan.price} />
              <span className="price-unit panel-morph" key={String(partner)}>
                {partner ? plan.partnerUnit : plan.unit}
              </span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">↳</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              to={`${site.links.booking}${site.links.booking.includes("?") ? "&" : "?"}engagement=${encodeURIComponent(`${plan.name} — ${partner ? "ongoing" : "project"}`)}`}
            >
              {plan.action}
            </Button>
          </article>
        ))}
      </div>
      <p className="pricing-note">{data.note}</p>
      <div className="custom-engagement" data-reveal>
        <span>{data.custom}</span>
        <Button to={site.links.booking} variant="secondary">
          {data.customAction}
        </Button>
      </div>
    </section>
  );
}
