import { site } from "@/site.config";
import { Heading } from "../ui/Heading";
import { Button } from "../ui/Button";
export function Engagements() {
  return (
    <section className="section wrap" id="engagements">
      <Heading {...site.engagements} />
      <div className="engagement-grid">
        {site.plans.map((plan, index) => (
          <article
            className={
              "engagement " + (index === 1 ? "engagement-featured" : "")
            }
            key={plan.id}
            data-reveal
          >
            <div className="engagement-top">
              <span>
                0{index + 1} / {plan.period}
              </span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{plan.name}</h3>
            <p className="plan-label">{plan.label}</p>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">+</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="engagement-bottom">
              <div>
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <Button to={"/contact?engagement=" + plan.id} light={index === 1}>
                {plan.action}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
