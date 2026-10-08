"use client";
import { useState } from "react";
import { ArrowUpRight, FileText, Search } from "lucide-react";
import type { Example } from "@/data/types";
const pages = ["Overview", "Components", "Changelog"];
export function CommandOutput({
  applied,
  example,
}: {
  applied: boolean;
  example: Example;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const results = pages.filter((page) =>
    page.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="command-output">
      <span className="output-overline">YOUR WORKSPACE</span>
      <h3>{applied ? example.output.title : "Your pages"}</h3>
      {applied && (
        <label className="output-search">
          <Search size={15} />
          <input
            aria-label="Find an example page"
            placeholder="Find a page…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected("");
            }}
          />
        </label>
      )}
      <div className="output-page-list">
        {results.map((page) => (
          <button
            key={page}
            onClick={() => setSelected(page)}
            aria-pressed={selected === page}
          >
            <FileText size={14} />
            <span>{page}</span>
            <ArrowUpRight size={14} />
          </button>
        ))}
        {!results.length && <p className="output-empty">No matching pages.</p>}
      </div>
      <span className="output-form-note" role="status">
        {selected
          ? `${selected} selected in this preview.`
          : "A few places worth going."}
      </span>
    </div>
  );
}
