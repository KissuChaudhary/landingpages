import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
import { ProblemMap } from "../product/ProblemMap";
export function Problem() {
  return (
    <Frame className="section problem" id="problem">
      <div className="problem-copy">
        <SectionHead label={site.problem.label} title={site.problem.title} />
        <ol className="problem-list">
          {site.problem.items.map((item, i) => (
            <li key={item.title} data-reveal>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ProblemMap />
    </Frame>
  );
}
