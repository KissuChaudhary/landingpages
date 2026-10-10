import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
import { RunLog } from "../product/RunLog";
import {
  BuilderDiagram,
  DataDiagram,
  ModelDiagram,
  ToolsDiagram,
  WorkflowDiagram,
} from "../product/CapabilityDiagrams";
const layers = [
  { Diagram: DataDiagram, tag: "context.layer" },
  { Diagram: BuilderDiagram, tag: "logic.canvas" },
  { Diagram: WorkflowDiagram, tag: "flow.runtime" },
  { Diagram: ModelDiagram, tag: "model.router" },
  { Diagram: ToolsDiagram, tag: "tool.connect" },
];
export function Capabilities() {
  return (
    <Frame className="section capabilities dark" id="capabilities">
      <div className="cap-head">
        <SectionHead label={site.capabilities.label} title={site.capabilities.title} />
        <RunLog />
      </div>
      <ol className="cap-stack">
        <span className="cap-rail" aria-hidden="true">
          <span />
        </span>
        {site.capabilities.items.map((item, i) => {
          const { Diagram, tag } = layers[i];
          return (
            <li
              className="cap-layer"
              key={item.key}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="cap-node" aria-hidden="true" />
              <span className="mono cap-index">0{i + 1}</span>
              <div className="cap-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <Diagram />
              <span className="mono cap-tag">{tag}</span>
            </li>
          );
        })}
      </ol>
    </Frame>
  );
}
