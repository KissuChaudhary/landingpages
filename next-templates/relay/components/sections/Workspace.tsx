import { site } from "@/site.config";
import { assetPath } from "@/lib/assets";
import { RequestBar } from "@/components/product/RequestBar";
import { ContextSources } from "@/components/product/ContextSources";
import { ResultDocument } from "@/components/product/ResultDocument";
import { GridSection } from "@/components/ui/GridSection";
export function Workspace() {
  return (
    <GridSection
      className="workspace-section"
      id="workspace"
      aria-label="Try the assistant"
    >
      <div className="section-introduction">
        <h2>From a thought<br />to a useful next step.</h2>
        <p>Try it for yourself. Choose an example, add the context that matters, and take the result with you.</p>
      </div>
        {site.workspace.screenshot ? (
          <div>
            <div className="request-heading">
              <h2>{site.workspace.title}</h2>
              {site.links.app && (
                <a className="button button-blue" href={site.links.app}>
                  {site.hero.action}
                </a>
              )}
            </div>
            <img
              className="workspace-screenshot"
              src={assetPath(site.workspace.screenshot.src)}
              alt={site.workspace.screenshot.alt}
            />
          </div>
        ) : (
          <div className="workspace-shell">
            <div className="workspace-grid">
              <ContextSources />
              <div className="workspace-main">
                <RequestBar />
                <ResultDocument />
              </div>
            </div>
          </div>
        )}
        <p className="demo-note">{site.workspace.note}</p>
    </GridSection>
  );
}
