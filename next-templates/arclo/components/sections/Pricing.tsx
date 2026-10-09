"use client";
import { useState } from "react";
import { Check, CircleDollarSign } from "lucide-react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { amount, annualSavings } from "@/lib/billing";
import { Section, SectionHead, Button } from "../ui/Primitives";
import { useExperience } from "../Experience";
export function Pricing({ comparison = false }: { comparison?: boolean }) {
  const [annual, setAnnual] = useState(false);
  const savings = annualSavings(site.plans);
  const { choosePlan } = useExperience();
  return (
    <Section id="pricing" className="pricing-section">
      <SectionHead
        label="Pricing"
        icon={CircleDollarSign}
        title="Good things start small."
        description="From your first useful agent to your team’s next big leap. Grow at your own pace."
      />
      <div className="billing-switch">
        <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
          Monthly
        </button>
        <button
          type="button"
          role="switch"
          aria-label="Annual billing"
          aria-checked={annual}
          className="switch"
          onClick={() => setAnnual(!annual)}
        >
          <span />
        </button>
        <button aria-pressed={annual} onClick={() => setAnnual(true)}>
          Yearly {savings > 0 && <span>Save up to {savings}%</span>}
        </button>
      </div>
      <div className="three-grid pricing-grid">
        {site.plans.map((plan) => (
          <article
            className={`surface plan-card reveal ${plan.id === "pro" ? "plan-featured" : ""}`}
            key={plan.id}
          >
            <div className="plan-name">
              <h3>{plan.name}</h3>
              {plan.id === "pro" && <span>THE SWEET SPOT</span>}
            </div>
            <div className="plan-price">
              <strong>
                ${amount(annual ? plan.annual / 12 : plan.monthly)}
              </strong>
              <span>/ month</span>
            </div>
            <p className="plan-period">
              {annual
                ? `$${amount(plan.annual)} billed yearly`
                : "Billed monthly"}
            </p>
            <p className="plan-audience">{plan.audience}</p>
            <Button
              secondary={plan.id !== "pro"}
              onClick={() => choosePlan(plan, annual)}
            >
              {plan.id === "starter"
                ? "Start exploring"
                : `Choose ${plan.name}`}
            </Button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {comparison ? (
        <div className="plan-comparison" id="comparison">
          <h3>A little more detail.</h3>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Plan comparison"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">What’s included</th>
                  {site.plans.map((plan) => (
                    <th scope="col" key={plan.id}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Active agents",
                  "Workflows",
                  "Monthly runs",
                  "Run history",
                ].map((name, index) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    {site.plans.map((plan) => (
                      <td key={plan.id}>{plan.limits[index]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="section-action">
          <Button secondary href={`${route("/pricing")}#comparison`}>
            Compare the plans
          </Button>
        </div>
      )}
    </Section>
  );
}
