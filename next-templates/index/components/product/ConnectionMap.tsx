"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";
import { useResearch } from "./ResearchProvider";
export function ConnectionMap({ surface }: { surface: string }) {
  const { topic, openSource } = useResearch();
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState({
    width: 500,
    height: 230,
    paths: [] as string[],
  });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width) return;
      const x = bounds.width / 2;
      const y = bounds.height / 2;
      const paths = [...element.querySelectorAll("button")].map((button, i) => {
        const rect = button.getBoundingClientRect();
        const startX = (i === 1 ? rect.left : rect.right) - bounds.left;
        const startY = rect.top + rect.height / 2 - bounds.top;
        return `M${startX} ${startY} C${(startX + x) / 2} ${startY},${x} ${startY},${x} ${y}`;
      });
      setMap({ width: bounds.width, height: bounds.height, paths });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element
      .querySelectorAll("button")
      .forEach((button) => observer.observe(button));
    measure();
    return () => observer.disconnect();
  }, [topic.id]);
  return (
    <div ref={ref} className="connection-map">
      <svg
        className="connection-map__lines"
        viewBox={`0 0 ${map.width} ${map.height}`}
        aria-hidden="true"
      >
        {map.paths.map((path, i) => (
          <path d={path} key={i} />
        ))}
      </svg>
      <div className="connection-map__hub" aria-hidden="true">
        <Link2 size={32} />
      </div>
      {topic.sources.map((source, i) => (
        <button
          key={source.id}
          className={`connection-tag connection-tag--${i}`}
          onClick={() => openSource(source, surface)}
        >
          {source.tag}
          <ArrowUpRight size={14} />
        </button>
      ))}
    </div>
  );
}
