"use client";

import { useState } from "react";
import { kinds, work, type Kind } from "@/data/work";
import { WorkCard } from "@/components/sections/Work";
import { NumberRoll } from "@/components/ui/NumberRoll";

// Every case study, with a filter by kind. The highlight is thrown to the chosen filter,
// the count rolls and the cards that remain rise back in.

export function WorkIndex() {
  const [filter, setFilter] = useState<Kind | "All">("All");
  const shown = filter === "All" ? work : work.filter((w) => w.kind === filter);
  const options: (Kind | "All")[] = ["All", ...kinds];

  return (
    <>
      <div className="work-filter" role="group" aria-label="Filter by kind">
        {options.map((option) => (
          <button key={option} type="button" className="work-filter-option" aria-pressed={filter === option} onClick={() => setFilter(option)}>
            {option}
          </button>
        ))}
        <span className="work-count" aria-live="polite">
          <NumberRoll value={shown.length} /> {shown.length === 1 ? "project" : "projects"}
        </span>
      </div>
      <div className="work-grid work-index" key={filter}>
        {shown.map((item, i) => (
          <div key={item.slug} className="work-index-item" style={{ "--i": i } as React.CSSProperties}>
            <WorkCard item={item} reveal={false} />
          </div>
        ))}
      </div>
    </>
  );
}
