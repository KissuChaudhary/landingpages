import { site } from "@/site.config";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Arrow } from "../ui/Arrow";
export function Pricing() {
  return (
    <section className="pricing section-space container" id="pricing">
      <SectionHeading
        label="Ways to work together"
        title={"The right shape\nfor your next chapter."}
        centered
      />
      <div className="pricing-grid">
        {site.plans.map((plan, i) => (
          <article
            className={`pricing-card ${i === 1 ? "pricing-dark dark-section" : ""}`}
            key={plan.id}
            data-reveal
          >
            <div className="pricing-top">
              <span className="pricing-label">
                <span className="status-dot" />
                {plan.label}
              </span>
              <span className="tiny-number">0{i + 1}</span>
            </div>
            <h3>{plan.name}</h3>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">{plan.price}</div>
            <p className="plan-cadence">{plan.cadence}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Arrow diagonal={false} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button to={`/contact?engagement=${plan.id}`} light={i === 1}>
              {plan.cta}
            </Button>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Every good collaboration starts with a conversation. We'll agree on
        scope, timeline and fees together.
      </p>
    </section>
  );
}
