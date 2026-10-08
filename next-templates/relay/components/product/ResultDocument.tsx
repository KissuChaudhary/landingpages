"use client";
import { Bookmark, Check, Copy, Download } from "lucide-react";
import { getScenario, resultText } from "@/data/scenarios";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
import { useTextFile } from "@/lib/useTextFile";
export function ResultDocument() {
  const { assistant: a } = useRelay();
  const result = a.result;
  const href = useTextFile(result ? resultText(result) : "");
  return (
    <div
      className="result-area"
      id="relay-result"
      role="tabpanel"
      aria-labelledby={`scenario-${a.id}`}
    >
      <div className="result-heading">
        <span>{site.workspace.resultTitle}</span>
        <span>
          {a.phase === 3
            ? "Ready for your next step"
            : a.phase === 0
              ? "Your next step starts here"
              : "Local example replay"}
        </span>
      </div>
      {result ? (
        <article className="result-document">
          <h3>{result.title}</h3>
          <p>{result.introduction}</p>
          <ol>
            {result.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="result-conclusion">{result.conclusion}</p>
        </article>
      ) : (
        <div className="result-empty">
          <span className="empty-stroke" aria-hidden="true" />
          <h3>
            {a.phase === 0
              ? "One thought is enough."
              : a.phase === 1
                ? "Bringing the pieces together."
                : "Giving the thought a shape."}
          </h3>
          <p>
            {a.phase === 0
              ? "Choose your context, then prepare an example."
              : "A short replay of a prepared local example. Nothing is being sent."}
          </p>
        </div>
      )}
      {result && (
        <div className="result-actions">
          <button className="quiet-link" onClick={a.copy}>
            <Copy size={17} /> Copy
          </button>
          <a
            className="quiet-link"
            href={href}
            download={getScenario(a.id).file}
            aria-disabled={!href || undefined}
            onClick={(event) => {
              if (!href) event.preventDefault();
              else a.setNotice("Text export prepared.");
            }}
          >
            <Download size={17} /> Download
          </a>
          <button
            className="quiet-link"
            aria-pressed={a.saved.includes(a.id)}
            onClick={() => a.toggleSaved()}
          >
            {a.saved.includes(a.id) ? (
              <Check size={17} />
            ) : (
              <Bookmark size={17} />
            )}{" "}
            {a.saved.includes(a.id) ? "Saved" : "Save example"}
          </button>
        </div>
      )}
      <p className="workspace-notice" role="status">
        {a.notice}
      </p>
    </div>
  );
}
