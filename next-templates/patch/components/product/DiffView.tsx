import { Minus, Plus } from "lucide-react";
import type { Example } from "@/data/types";
export function DiffView({
  example,
  applied,
}: {
  example: Example;
  applied: boolean;
}) {
  return (
    <div className="diff-view">
      <div className="diff-heading">
        <span>{example.file}</span>
        <span>{applied ? "Change kept" : "Proposed change"}</span>
      </div>
      <div className="diff-lines" aria-label="Selected change excerpts">
        <span className="diff-label">ORIGINAL</span>
        {example.removed.map((line) => (
          <div className="diff-line diff-removed" key={line}>
            <Minus size={12} />
            <code>{line}</code>
          </div>
        ))}
        <span className="diff-label">{applied ? "APPLIED" : "PROPOSED"}</span>
        {example.added.map((line) => (
          <div className="diff-line diff-added" key={line}>
            <Plus size={12} />
            <code>{line}</code>
          </div>
        ))}
      </div>
      <p className="diff-summary">{example.summary}</p>
    </div>
  );
}
