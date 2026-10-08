"use client";
import { useId, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  GitBranch,
  Undo2,
} from "lucide-react";
import { Mark } from "@/components/ui/Brand";
import { site } from "@/site.config";
import { CodeView } from "./CodeView";
import { DiffView } from "./DiffView";
import { OutputPreview } from "./OutputPreview";
import type { ExampleState, WorkspaceView } from "@/lib/useExample";
import { copyCode } from "@/lib/files";
import { ComponentDownload } from "@/components/ui/ComponentDownload";
import { moveTab } from "@/lib/tabs";
const views: { id: WorkspaceView; label: string }[] = [
  { id: "build", label: "Build" },
  { id: "review", label: "Review" },
  { id: "preview", label: "Preview" },
];
export function Workspace({
  state,
  compact = false,
}: {
  state: ExampleState;
  compact?: boolean;
}) {
  const uid = useId();
  const [narrow, setNarrow] = useState(false);
  async function copy() {
    try {
      await copyCode(state.code);
      state.setMessage("Full component copied.");
    } catch {
      state.setMessage(
        "Clipboard unavailable. Select the code or export the file.",
      );
    }
  }
  return (
    <div className={`workspace-window ${compact ? "workspace-compact" : ""}`}>
      <div className="workspace-top">
        <span className="workspace-wordmark">
          <Mark />
          {site.brand.name}
          <span>/ workspace</span>
        </span>
        <span className="workspace-ready">
          <span />
          Local example
        </span>
      </div>
      <div className="workspace-toolbar">
        <div
          role="tablist"
          aria-label="Workspace view"
          className="workspace-tabs"
        >
          {views.map((view, index) => (
            <button
              key={view.id}
              role="tab"
              aria-selected={state.view === view.id}
              tabIndex={state.view === view.id ? 0 : -1}
              id={`${uid}-${view.id}`}
              aria-controls={`${uid}-panel`}
              onClick={() => state.setView(view.id)}
              onKeyDown={(event) =>
                moveTab(event, index, views.length, (target) =>
                  state.setView(views[target].id),
                )
              }
            >
              {view.label}
            </button>
          ))}
        </div>
        <div className="workspace-tools">
          <button onClick={copy} aria-label={site.actions.copy}>
            <Copy size={15} />
          </button>
          <ComponentDownload
            code={state.code}
            file={state.example.file}
            label={site.actions.export}
            onDownload={() => state.setMessage(`${state.example.file} export prepared.`)}
            onUnavailable={() => state.setMessage("Export unavailable in this browser.")}
          >
            <Download size={15} />
          </ComponentDownload>
        </div>
      </div>
      <div className="workspace-request">
        <span className="request-symbol">↗</span>
        <p>{state.example.request}</p>
      </div>
      <div
        className={`workspace-panel view-${state.view}`}
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-${state.view}`}
      >
        {state.view === "build" && (
          <>
            <CodeView
              code={state.code}
              file={state.example.file}
              compact={compact}
            />
            <div className="workspace-output">
              <div className="preview-label">
                <span>OUTPUT / {state.applied ? "CHANGED" : "ORIGINAL"}</span>
                <ArrowUpRight size={12} />
              </div>
              <OutputPreview example={state.example} applied={state.applied} />
            </div>
          </>
        )}
        {state.view === "review" && (
          <DiffView example={state.example} applied={state.applied} />
        )}
        {state.view === "preview" && (
          <div className="workspace-preview-view">
            <div
              className="preview-size-control"
              role="group"
              aria-label="Output width"
            >
              <button aria-pressed={!narrow} onClick={() => setNarrow(false)}>
                Wide
              </button>
              <button aria-pressed={narrow} onClick={() => setNarrow(true)}>
                Narrow
              </button>
            </div>
            <div
              className={`workspace-preview-canvas ${narrow ? "is-narrow" : ""}`}
            >
              <OutputPreview example={state.example} applied={state.applied} />
            </div>
          </div>
        )}
      </div>
      <div className="workspace-bottom">
        <span className="workspace-branch">
          <GitBranch size={13} /> first-commit
        </span>
        <button
          className={`apply-button ${state.applied ? "is-applied" : ""}`}
          onClick={state.apply}
        >
          {state.applied ? <Undo2 size={13} /> : <Check size={13} />}
          {state.applied ? site.actions.undo : site.actions.apply}
        </button>
      </div>
      <div className="workspace-status" role="status">
        {state.message ||
          (state.applied
            ? "Your change, kept. Ready for the next step."
            : "Inspect the example. Make the change your own.")}
      </div>
    </div>
  );
}
