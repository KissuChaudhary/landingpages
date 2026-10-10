import { site } from "@/site.config";
import { SectionHeading } from "../ui/SectionHeading";
import { ProcessIcon } from "../visuals/ProcessIcon";
import { Button } from "../ui/Button";
export function Process() {
  return (
    <section className="process section-space container" id="process">
      <div className="process-heading">
        <SectionHeading
          label="How it comes together"
          title={"Good work begins\nwith a good conversation."}
        />
        <Button to="/contact" secondary>
          Talk it through
        </Button>
      </div>
      <div className="process-grid">
        {site.process.map((step, i) => (
          <article
            key={step.number}
            className="process-step"
            data-reveal
            style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <div className="process-step-top">
              <ProcessIcon kind={step.icon} />
              <span>{step.number}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className="process-note">{step.note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
