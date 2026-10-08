"use client";
import { ArrowUp, Pause, Play, RotateCcw } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
export function RequestBar() {
  const { assistant: a } = useRelay();
  const busy = a.phase > 0 && a.phase < 3;
  return (
    <div className="request-area">
      <div className="request-heading">
        <h2>{site.workspace.title}</h2>
        <div
          className="scenario-tabs"
          role="tablist"
          aria-label="Assistant examples"
        >
          {site.workspace.tabs.map((tab, index) => (
            <button
              key={tab.id}
              role="tab"
              aria-label={tab.label}
              aria-selected={a.id === tab.id}
              tabIndex={a.id === tab.id ? 0 : -1}
              aria-controls="relay-result"
              id={`scenario-${tab.id}`}
              onClick={() => a.choose(tab.id)}
              onKeyDown={(event) => {
                const key = event.key;
                const target =
                  key === "ArrowRight"
                    ? (index + 1) % 3
                    : key === "ArrowLeft"
                      ? (index + 2) % 3
                      : key === "Home"
                        ? 0
                        : key === "End"
                          ? 2
                          : -1;
                if (target < 0) return;
                event.preventDefault();
                a.choose(site.workspace.tabs[target].id);
                (
                  event.currentTarget.parentElement?.children[
                    target
                  ] as HTMLElement
                )?.focus();
              }}
            >
              <span className="tab-label-full">{tab.label}</span>
              <span className="tab-label-short" aria-hidden="true">{tab.short}</span>
            </button>
          ))}
        </div>
      </div>
      <form
        className="request-line"
        onSubmit={(event) => {
          event.preventDefault();
          a.run();
        }}
      >
        <label className="sr-only" htmlFor="relay-request">
          Your request
        </label>
        <textarea
          id="relay-request"
          rows={2}
          value={a.request}
          onChange={(event) => a.setRequest(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={busy}
          autoComplete="off"
        />
        <button
          className="send-button"
          type="submit"
          aria-label="Prepare this example"
          disabled={busy || !a.sources.length || !a.request.trim()}
        >
          <ArrowUp size={23} />
        </button>
      </form>
      <div className="replay-row">
        <p role="status">
          {busy
            ? `${a.running ? "" : "Paused · "}${a.phase === 1 ? "Gathering the selected context…" : "Preparing your example…"}`
            : a.changed
              ? "Context changed. Prepare again to use it."
              : "A thought, with a little context."}
        </p>
        <div>
          {busy && (
            <button
              className="quiet-link"
              onClick={a.running ? a.pause : a.resume}
            >
              {a.running ? <Pause size={16} /> : <Play size={16} />}{" "}
              {a.running ? "Pause" : "Resume"}
            </button>
          )}
          <button className="quiet-link" onClick={a.reset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
