"use client";
import { topics } from "@/data/topics";
import { useResearch } from "./ResearchProvider";
export function TopicSelector() {
  const { topic, select } = useResearch();
  return (
    <div className="topic-selector" role="group" aria-label="Research examples">
      {topics.map((item) => (
        <button
          key={item.id}
          onClick={() => select(item.id)}
          aria-pressed={item.id === topic.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
