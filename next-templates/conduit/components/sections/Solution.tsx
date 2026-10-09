import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { Frame, Label, SectionHead } from "../ui/Primitives";
import { BuilderDemo } from "../product/BuilderDemo";
import { WorkflowDemo } from "../product/WorkflowDemo";
import { AnalyticsDemo } from "../product/AnalyticsDemo";
import { asset } from "@/lib/urls";
const demos = [BuilderDemo, WorkflowDemo, AnalyticsDemo];
export function Solution() {
  return (
    <Frame className="solution section" id="solution">
      <SectionHead
        label={site.solution.label}
        title={site.solution.title}
        centered
      />
      <div className="feature-rows">
        {site.solution.features.map((feature, i) => {
          const Demo = demos[i];
          return (
            <article
              className={`feature-row ${i % 2 ? "reverse" : ""}`}
              key={feature.label}
            >
              <div className="feature-copy" data-reveal>
                <Label>{feature.label}</Label>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul>
                  {feature.bullets.map((item) => (
                    <li key={item}>
                      <ArrowRight size={17} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`product-stage stage-${i}`} data-reveal>
                <img
                  src={asset(
                    i === 2 ? "/images/mesh.webp" : "/images/glass.webp",
                  )}
                  alt=""
                  loading="lazy"
                  className="stage-art"
                />
                <div className="data-grain" aria-hidden="true" />
                <Demo />
              </div>
            </article>
          );
        })}
      </div>
    </Frame>
  );
}
