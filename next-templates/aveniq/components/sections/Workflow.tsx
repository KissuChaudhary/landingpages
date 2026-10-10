import { site } from "@/site.config";
import { Label, Mark, Title } from "../ui";
export function Workflow() {
  return (
    <section
      id="workflow"
      className="workflow section-shell section-space"
      data-workflow
    >
      <div className="workflow-intro">
        <Label>{site.workflow.eyebrow}</Label>
        <Title lines={site.workflow.title} />
        <p className="section-description">{site.workflow.description}</p>
        <div className="workflow-orbit" aria-hidden="true">
          <span className="orbit-ring ring-one" />
          <span className="orbit-ring ring-two" />
          <span className="orbit-ring ring-three" />
          <div className="orbit-center">
            <Mark />
          </div>
          {site.workflow.steps.map((step, index) => (
            <span
              key={step.label}
              className={`orbit-tag tag-${index}`}
              data-orbit={index}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
      <div className="workflow-steps">
        <div className="workflow-rail" aria-hidden="true">
          <span />
        </div>
        {site.workflow.steps.map((step, index) => (
          <article className="workflow-step" key={step.label} data-step={index}>
            <span className="step-count">0{index + 1}</span>
            <div>
              <p className="step-label">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="step-detail">{step.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
