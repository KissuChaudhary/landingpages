import { site } from "@/site.config";
import { Arrow, Label, Title } from "../ui";
export function Process() {
  return (
    <section
      id="process"
      className="process section-pad"
      aria-labelledby="process-title"
    >
      <div className="wrap process-grid">
        <div className="process-intro">
          <Label>{site.process.eyebrow}</Label>
          <div id="process-title">
            <Title lines={site.process.title} />
          </div>
          <p>{site.process.description}</p>
          <span className="process-note">
            A shared direction. No disappearing acts.
          </span>
        </div>
        <ol className="process-steps" data-process>
          {site.process.steps.map((step, index) => (
            <li key={step.title} data-reveal>
              <span className="process-index">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="process-output">
                  <Arrow size={15} />
                  {step.output}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
