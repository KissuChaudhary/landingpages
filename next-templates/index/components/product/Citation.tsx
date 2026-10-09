"use client";
import type { Source } from "@/data/topics";
import { useResearch, type Surface } from "./ResearchProvider";
export function Citation({
  source,
  number,
  surface,
}: {
  source: Source;
  number: number;
  surface: Surface;
}) {
  const { openSource } = useResearch();
  return (
    <button
      className="citation"
      onClick={() => openSource(source, surface)}
      aria-label={`Open source ${number}: ${source.title}`}
    >
      {number}
    </button>
  );
}
