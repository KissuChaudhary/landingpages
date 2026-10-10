import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Arrow, Label, Title } from "../ui";
export function Pricing() {
  return (
    <section
      id="pricing"
      className="pricing wrap section-pad"
      aria-labelledby="pricing-title"
    >
      <div className="section-heading">
        <div>
          <Label>{site.pricing.eyebrow}</Label>
          <Title lines={site.pricing.title} id="pricing-title" />
        </div>
        <p>{site.pricing.description}</p>
      </div>
      <div className="engagements">
        {site.pricing.plans.map((plan, index) => (
          <article key={plan.name} className="engagement" data-reveal>
            <div className="engagement-title">
              <span>
                0{index + 1} / {plan.category}
              </span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">↗</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="engagement-price">
              <span>{plan.suffix}</span>
              <strong>{plan.price}</strong>
              <a href={contact(`${site.brand} — ${plan.name} enquiry`)}>
                {plan.cta}
                <Arrow diagonal size={20} />
              </a>
              <small>{plan.timing}</small>
            </div>
          </article>
        ))}
      </div>
      <p className="pricing-note">{site.pricing.note}</p>
    </section>
  );
}
