import { ArrowDown, Check } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="section container" id="process">
      <Reveal>
        <SectionHeading {...site.process} />
      </Reveal>
      <ol className="process-list">
        {site.process.steps.map((step, index) => (
          <li key={step.number}>
            <Reveal className="process-row">
              <div className="process-marker">
                <span>{step.number}</span>
                {index < site.process.steps.length - 1 && (
                  <ArrowDown size={15} aria-hidden="true" />
                )}
              </div>
              <div className="process-name">
                <p className="eyebrow">{step.timing}</p>
                <h3>{step.name}</h3>
              </div>
              <p className="process-description">{step.text}</p>
              <div className="process-deliverable">
                <Check size={15} aria-hidden="true" />
                {step.artifact}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="process-note">
        <span className="status-dot" />
        <p>One point of contact. A shared direction. No loose ends.</p>
      </div>
    </section>
  );
}
