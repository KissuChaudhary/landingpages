import { ArrowUpRight, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Sparkles, SlidersHorizontal, ArrowUpRight];
export function Workflow() {
  return (
    <section
      className="section workflow-section container"
      aria-labelledby="workflow-title"
    >
      <SectionHeading {...site.workflow} centered id="workflow-title" />
      <div className="workflow-grid">
        {site.workflow.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <article className="workflow-step" key={step.title}>
              <div className="workflow-node">
                <Icon size={21} />
                <span className="mono">0{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="workflow-detail">
                {i === 2 ? (
                  <Check size={13} />
                ) : (
                  <span className="detail-dot" />
                )}
                <span>{step.detail}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
