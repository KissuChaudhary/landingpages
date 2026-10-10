"use client";

import { useState, type CSSProperties } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { site, tierHref, seatsLeft, cohortDate, type Tier } from "@/site.config";
import { ButtonLink, NumberRoll, Title } from "../ui/Primitives";

// Pick a tier on the left; the card on the right reshapes around it: colour, price,
// payment option, seats and what's included all change in place.
export function Pricing() {
  const { pricing, cohort } = site;
  const [id, setId] = useState<string>(pricing.defaultTier);
  const [split, setSplit] = useState(false);
  const tier = pricing.tiers.find((t) => t.id === id) ?? pricing.tiers[0];
  const plan = tier.installments;
  const showSplit = !!plan && split;
  const left = seatsLeft();

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = pricing.tiers.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setId(pricing.tiers[next].id);
    document.getElementById(`tier-${pricing.tiers[next].id}`)?.focus();
  };

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head">
          <Title lines={pricing.heading} />
          <p className="section-intro" data-reveal="">
            {cohort.name} starts {cohortDate()}. Self-paced starts the day you join.
          </p>
        </div>
        <div className="price-layout">
          <div className="tiers" role="radiogroup" aria-label="Choose a plan">
            {pricing.tiers.map((t: Tier, i) => (
              <button
                key={t.id}
                id={`tier-${t.id}`}
                type="button"
                role="radio"
                aria-checked={t.id === tier.id}
                tabIndex={t.id === tier.id ? 0 : -1}
                className={`tier c-${t.color}${t.id === tier.id ? " is-active" : ""}`}
                onClick={() => setId(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                data-reveal=""
                style={{ "--rd": `${i * 70}ms` } as CSSProperties}
              >
                <span className="tier-radio" aria-hidden="true" />
                <span className="tier-main">
                  <b>{t.name}</b>
                  <span>{t.tagline}</span>
                </span>
                <span className="tier-price">${t.price}</span>
              </button>
            ))}
            <p className="guarantee">
              <ShieldCheck size={16} strokeWidth={2} aria-hidden="true" />
              {pricing.guarantee}
            </p>
          </div>

          <div className={`summary c-${tier.color}`} data-reveal="" style={{ "--rd": "120ms" } as CSSProperties}>
            <div className="summary-top">
              <span className="summary-name">
                <i aria-hidden="true" />
                <span className="morph">
                  {pricing.tiers.map((t) => (
                    <span key={t.id} className={t.id === tier.id ? "is-active" : undefined} aria-hidden={t.id !== tier.id}>
                      {t.name}
                    </span>
                  ))}
                </span>
              </span>
              {plan && (
                <div className="split" role="group" aria-label="Payment">
                  <button type="button" aria-pressed={!split} className={!split ? "is-active" : undefined} onClick={() => setSplit(false)}>
                    Pay once
                  </button>
                  <button type="button" aria-pressed={split} className={split ? "is-active" : undefined} onClick={() => setSplit(true)}>
                    {plan.count} payments
                  </button>
                </div>
              )}
            </div>
            <p className="summary-price">
              <span className="summary-amount">
                $<NumberRoll value={String(showSplit && plan ? plan.amount : tier.price)} />
              </span>
              <span className="summary-unit">{showSplit && plan ? `× ${plan.count} monthly` : "one-time"}</span>
            </p>
            <div className="seats">
              {tier.cohort ? (
                <>
                  <div className="seats-bar">
                    <i style={{ width: `${(cohort.taken / cohort.seats) * 100}%` }} />
                  </div>
                  <p>
                    <b>
                      {left} of {cohort.seats} seats left
                    </b>{" "}
                    in {cohort.name}
                  </p>
                </>
              ) : (
                <p>
                  <b>Start today.</b> Upgrade to a later cohort and pay only the difference.
                </p>
              )}
            </div>
            <ul className="summary-list" key={tier.id}>
              {tier.features.map((f, i) => (
                <li key={f} style={{ "--i": i } as CSSProperties}>
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink to={tierHref(tier)} label={tier.cta} variant="white" className="summary-cta" />
          </div>
        </div>
      </div>
    </section>
  );
}
