"use client";
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowArt } from "@/components/product/WorkflowArt";
import { moveTab } from "@/lib/tabs";
export function Workflow() {
  const [step, setStep] = useState(0);
  const uid = useId();
  const content = site.workflow;
  return (
    <section
      id="workflow"
      className="grid-section workflow-section"
      aria-label="From a thought to a thing"
    >
      <SectionHeading {...content} />
      <div
        className="workflow-steps"
        role="tablist"
        aria-label="Building workflow"
      >
        {content.steps.map((item, index) => (
          <button
            role="tab"
            tabIndex={step === index ? 0 : -1}
            id={`${uid}-${index}`}
            aria-controls={`${uid}-panel`}
            aria-selected={step === index}
            key={item.title}
            onClick={() => setStep(index)}
            onKeyDown={(event) =>
              moveTab(event, index, content.steps.length, setStep)
            }
          >
            <span className="workflow-number">0{index + 1}</span>
            <div>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div
        className="workflow-panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-${step}`}
      >
        <div className="workflow-panel-copy">
          <span className="eyebrow">
            STEP 0{step + 1} / {content.steps[step].title.toUpperCase()}
          </span>
          <h3>{content.steps[step].subtitle}</h3>
          <p>{content.steps[step].description}</p>
          <div className="workflow-progress" aria-hidden="true">
            {content.steps.map((_, index) => (
              <span
                key={index}
                className={index <= step ? "is-complete" : ""}
              />
            ))}
          </div>
        </div>
        <div className="workflow-panel-art">
          <WorkflowArt step={step} />
        </div>
      </div>
    </section>
  );
}
