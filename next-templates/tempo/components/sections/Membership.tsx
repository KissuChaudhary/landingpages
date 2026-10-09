"use client";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/site.config";
import { useTempo } from "@/components/TempoProvider";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { NumberRoll } from "@/components/hairline/number-roll";
import { TextMorph } from "@/components/hairline/text-morph";

export function Membership() {
  const [yearly, setYearly] = useState(true);
  const { choosePlan } = useTempo();
  const paid = site.plans.find((plan) => plan.monthly > 0);
  const saving = paid
    ? Math.round((1 - paid.yearly / (paid.monthly * 12)) * 100)
    : 0;
  return (
    <section
      className="section container membership-section"
      id="membership"
      aria-label="Tempo membership"
    >
      <div className="membership-heading">
        <SectionIntro
          label="A little space. A simple choice."
          title={
            <>
              Make room for
              <br />
              <em>your everyday.</em>
            </>
          }
        >
          Start with the little things. Find a little more room when you’re
          ready.
        </SectionIntro>
        <div>
          <div
            className="billing-toggle"
            role="group"
            aria-label="Billing period"
          >
            <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
          <p className="billing-saving">
            {saving}% less with a yearly membership
          </p>
        </div>
      </div>
      <div className="membership-grid">
        {site.plans.map((plan, index) => (
          <article
            className={`membership-card ${index ? "plus-card" : "free-card"}`}
            key={plan.id}
          >
            <div className="plan-heading">
              <h3>{plan.name}</h3>
              <span className="mono">
                {index ? "A LITTLE MORE ROOM" : "A GOOD PLACE TO START"}
              </span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              <span>
                <NumberRoll
                  value={yearly ? plan.yearly / 12 : plan.monthly}
                  prefix="$"
                  locales="en-US"
                  format={{ maximumFractionDigits: 2 }}
                />
              </span>
              <span>/ month</span>
            </div>
            <p className="plan-billing">
              <TextMorph>
                {plan.monthly === 0
                  ? "Free, for your everyday."
                  : yearly
                    ? `$${plan.yearly} billed once a year`
                    : `$${plan.monthly} billed monthly`}
              </TextMorph>
            </p>
            <button
              className={`button ${index ? "button-lime" : "button-outline"}`}
              onClick={() => choosePlan(plan, yearly)}
            >
              {index
                ? "Find a little more room"
                : "Start with the little things"}
              <ArrowUpRight size={15} />
            </button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} />
                  {feature}
                </li>
              ))}
            </ul>
            <span className="plan-flower" aria-hidden="true">
              ✳
            </span>
          </article>
        ))}
      </div>
      <p className="demo-note">
        Illustrative memberships · explore a plan, no payment collected.
      </p>
    </section>
  );
}
