import { site } from "@/site.config";
import { services } from "@/data/services";
import { Label, Action } from "../ui/Action";
import { ServiceArt } from "../art/ServiceArt";
export function Services() {
  return (
    <section className="services section-wrap" id="services">
      <div className="section-heading">
        <Label>{site.services.eyebrow}</Label>
        <h2 data-reveal>{site.services.heading}</h2>
        <div className="section-aside">
          <p data-reveal>{site.services.text}</p>
          <Action href="/contact" quiet>
            Find your starting point
          </Action>
        </div>
      </div>
      <div className="services-list">
        {services.map((s, i) => (
          <details
            className="service-row"
            name="studio-services"
            key={s.title}
            open={i === 0}
          >
            <summary>
              <span className="service-number">
                /0{i + 1}
                <span className="dot-field" />
              </span>
              <span className="service-title">
                <span className="label-type">{s.title}</span>
                <span>{s.name}</span>
              </span>
              <span className="disclosure-sign" />
            </summary>
            <div className="service-body">
              <div>
                <p>{s.text}</p>
                <p className="service-output">{s.outputs}</p>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <ServiceArt kind={s.diagram} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
