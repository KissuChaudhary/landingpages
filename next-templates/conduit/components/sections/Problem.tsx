import { Layers3, Repeat2, ScanLine } from "lucide-react";
import { site } from "@/site.config";
import { Frame, Label } from "../ui/Primitives";
const icons = [Layers3, Repeat2, ScanLine];
export function Problem() {
  return (
    <Frame className="problem dark">
      <div className="section-head centered" data-reveal>
        <Label>{site.problem.label}</Label>
        <h2 className="reveal-statement">
          {site.problem.title.split(" ").map((word, i) => (
            <span key={i} style={{ "--word": i } as React.CSSProperties}>
              {word}{" "}
            </span>
          ))}
        </h2>
      </div>
      <div className="problem-grid">
        {site.problem.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <article key={item.title} data-reveal>
              <div className="problem-symbol">
                <Icon size={32} strokeWidth={1.2} />
                <span aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
    </Frame>
  );
}
