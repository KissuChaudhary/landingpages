"use client";
import type { Source } from "@/data/topics";
import { useResearch } from "./ResearchProvider";
export function Citation({
  source,
  number,
}: {
  source: Source;
  number: number;
}) {
  const { openSource } = useResearch();
  return (
    <button
      className="citation"
      onClick={() => openSource(source)}
      aria-label={`Open source ${number}: ${source.title}`}
    >
      {number}
    </button>
  );
}
