import { site } from "@/site.config";
import { engagements } from "@/data/services";
import { Label, Action } from "../ui/Action";
export function Pricing() {
  return (
    <section className="pricing section-wrap" id="engagements">
      <div className="section-heading">
        <Label>{site.pricing.eyebrow}</Label>
        <h2 data-reveal>{site.pricing.heading}</h2>
      </div>
      <div className="pricing-grid">
        {engagements.map((e, i) => (
          <article
            className={`price-card ${e.featured ? "price-featured" : ""}`}
            data-reveal
            key={e.id}
          >
            <div className="price-top label-type">
              <span>
                0{i + 1} / {e.period}
              </span>
              <span>{e.duration}</span>
            </div>
            {e.featured && (
              <span className="price-badge label-type">
                A complete collaboration ↗
              </span>
            )}
            <h3>{e.name}</h3>
            <p>{e.text}</p>
            <div className="price-amount">
              <strong>{e.price}</strong>
              <span className="label-type">{e.unit}</span>
            </div>
            <ul>
              {e.features.map((f) => (
                <li key={f}>
                  <span>+</span>
                  {f}
                </li>
              ))}
            </ul>
            <Action href={`/contact?engagement=${e.id}`} dark={e.featured}>
              {e.cta}
            </Action>
          </article>
        ))}
      </div>
      <p className="pricing-note label-type">{site.pricing.note}</p>
    </section>
  );
}
