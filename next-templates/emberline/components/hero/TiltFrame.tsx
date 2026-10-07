"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lays the product frame back and brings it upright as the page scrolls (0 to 360px).
 * Writes to the DOM directly in a rAF so scrolling never re-renders React, and does nothing
 * when the visitor prefers reduced motion.
 */
export function TiltFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const t = Math.min(1, Math.max(0, window.scrollY / 360));
      node.style.transform = `rotateX(${(16 * (1 - t)).toFixed(2)}deg) scale(${(0.96 + 0.04 * t).toFixed(4)})`;
      node.style.opacity = (0.82 + 0.18 * t).toFixed(3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-tilt
      className="relative origin-top rounded-2xl will-change-transform"
      style={{ transform: "rotateX(16deg) scale(0.96)", opacity: 0.82 }}
    >
      {children}
    </div>
  );
}
