import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
import {
  BuilderDiagram,
  DataDiagram,
  ModelDiagram,
  ToolsDiagram,
  WorkflowDiagram,
} from "../product/CapabilityDiagrams";
const diagrams = [
  DataDiagram,
  BuilderDiagram,
  WorkflowDiagram,
  ModelDiagram,
  ToolsDiagram,
];
export function Capabilities() {
  return (
    <Frame className="section capabilities dark" id="capabilities">
      <SectionHead
        label={site.capabilities.label}
        title={site.capabilities.title}
      />
      <div className="capability-grid">
        {site.capabilities.items.map((item, i) => {
          const Diagram = diagrams[i];
          return (
            <article
              className={`capability capability-${item.key}`}
              key={item.key}
              data-reveal
            >
              <Diagram />
              <div className="capability-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="task-field" aria-hidden="true">
        {[0, 1].map((row) => (
          <div className={`task-rail rail-${row}`} key={row}>
            <div>
              {[...site.capabilities.tasks, ...site.capabilities.tasks].map(
                (task, i) => (
                  <span key={i}>{task}</span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
