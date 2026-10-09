"use client";
import { useEffect, useState } from "react";
import { Mark } from "@/components/ui/Mark";
import { useVisible } from "@/components/motion/useVisible";
export function SourceConnections() {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const [geometry, setGeometry] = useState({
    width: 144,
    height: 360,
    sourceY: [60, 180, 300],
    targetY: 180,
  });
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (visible) setEntered(true);
  }, [visible]);
  useEffect(() => {
    const connector = ref.current;
    const scene = connector?.parentElement;
    const stack = scene?.querySelector(".source-stack");
    const paper = scene?.querySelector(".synthesis-paper");
    if (!connector || !scene || !stack || !paper) return;
    const measure = () => {
      const bounds = connector.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const target = paper.getBoundingClientRect();
      setGeometry({
        width: bounds.width,
        height: bounds.height,
        sourceY: [...stack.children].map((child) => {
          const row = child.getBoundingClientRect();
          return row.top + row.height / 2 - bounds.top;
        }),
        targetY: target.top + target.height / 2 - bounds.top,
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    observer.observe(paper);
    observer.observe(connector);
    measure();
    return () => observer.disconnect();
  }, [ref]);
  const { width, height, sourceY, targetY } = geometry;
  return (
    <div
      ref={ref}
      className={`scene-connection ${entered ? "connection--entered" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {sourceY.map((y, i) => (
          <path
            key={i}
            pathLength="1"
            d={`M0 ${y} C${width * 0.55} ${y},${width * 0.45} ${targetY},${width} ${targetY}`}
          />
        ))}
      </svg>
      <span style={{ top: targetY }}>
        <Mark />
      </span>
    </div>
  );
}
