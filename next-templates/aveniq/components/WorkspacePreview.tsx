import { site } from "@/site.config";
import { Arrow, Mark } from "./ui";
export function WorkspacePreview() {
  const content = site.preview;
  return (
    <div
      className="workspace-preview"
      aria-label="Illustrative product workspace"
    >
      <div className="workspace-bar">
        <Mark />
        <span>{content.title}</span>
        <span className="workspace-dots" aria-hidden="true">
          •••
        </span>
      </div>
      <div className="workspace-body">
        <p className="workspace-label">{content.label}</p>
        <p className="workspace-question">{content.question}</p>
        <div className="workspace-sources">
          {content.sources.map((source, index) => (
            <span key={source}>
              <i>{index + 1}</i>
              {source}
            </span>
          ))}
        </div>
        <div className="workspace-result">
          <span className="workspace-spark" aria-hidden="true">
            ✳
          </span>
          <div>
            <span className="workspace-label">A direction to explore</span>
            <h3>{content.result}</h3>
            <p>{content.insight}</p>
          </div>
        </div>
        <div className="workspace-next">
          <span>{content.action}</span>
          <Arrow />
        </div>
      </div>
    </div>
  );
}
