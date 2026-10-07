"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Renders children at a fixed logical size and scales them to the container's width, so animations can use
 * stable pixel coordinates at every breakpoint.
 */
export function ScaledStage({
  width,
  height,
  className,
  innerClassName,
  children,
  style,
}: {
  width: number;
  height: number;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const node = outerRef.current;
    if (!node) return;
    const update = () => setScale(node.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={outerRef}
      className={cn("relative w-full", className)}
      style={{
        height: scale === null ? undefined : height * scale,
        aspectRatio: scale === null ? `${width} / ${height}` : undefined,
        ...style,
      }}
    >
      <div
        className={cn("absolute left-0 top-0 origin-top-left transition-opacity duration-300", innerClassName)}
        style={{ width, height, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        {children}
      </div>
    </div>
  );
}
