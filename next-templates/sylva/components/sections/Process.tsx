import { site, bookingHref } from "@/site.config";
import { asset } from "@/lib/urls";
import { SectionHeading, TextLink } from "../ui/Primitives";
export function Process() {
  return (
    <section id="process" className="process section-pad wrap">
      <div className="process-visual" data-reveal>
        <div className="organic-frame">
          <img
            src={asset(site.process.image)}
            alt="Thoughtful hands tending greenery at the nursery"
            loading="lazy"
          />
        </div>
        <span className="process-note">From the very first leaf.</span>
        <span className="process-roundel">
          Naturally
          <br />
          <em>considered.</em>
        </span>
      </div>
      <div className="process-copy">
        <SectionHeading {...site.process} />
        <div className="process-steps">
          {site.process.steps.map((step, index) => (
            <details className="process-step" key={step.id} open={index === 0}>
              <summary>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <i aria-hidden="true" />
              </summary>
              <div className="step-body">
                <p>{step.body}</p>
              </div>
            </details>
          ))}
        </div>
        <TextLink to={bookingHref()}>Start with your space</TextLink>
      </div>
    </section>
  );
}
