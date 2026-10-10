"use client";

import * as React from "react";

/**
 * Writes the element's scroll progress to CSS variables, without re-rendering:
 *   --p  0 when its top reaches `start` (fraction of the viewport from the top),
 *        1 when it reaches `end`
 *   --e  the same, eased out (cubic)
 * With `fully`, progress instead runs from the element's top entering at the
 * bottom of the screen (0) to the whole element being on screen (1), which
 * suits things near the end of the page.
 * Returns true once progress passes `settleAt`, for things that should happen
 * when the layout has arrived (numbers rolling, lines drawing).
 */
export function useScrollProgress<T extends HTMLElement>({
  start = 1,
  end = 0.35,
  settleAt = 0.92,
  disabled = false,
  fully = false,
}: { start?: number; end?: number; settleAt?: number; disabled?: boolean; fully?: boolean } = {}) {
  const ref = React.useRef<T>(null);
  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (disabled) {
      el.style.setProperty("--p", "1");
      el.style.setProperty("--e", "1");
      setSettled(true);
      return;
    }
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = fully ? (vh - rect.top) / Math.max(1, rect.height) : (vh * start - rect.top) / (vh * (start - end));
      const p = Math.min(1, Math.max(0, raw));
      const e = 1 - Math.pow(1 - p, 3);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--e", e.toFixed(4));
      if (p >= settleAt) setSettled(true);
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });
    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [start, end, settleAt, disabled, fully]);

  return [ref, settled] as const;
}
