"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/*
 * Motion follows the visitor's system setting (prefers-reduced-motion).
 *   on    html[data-motion="on"]: reveals start hidden, the tour pins and
 *         morphs, numbers roll
 *   off   reduced motion, or no JavaScript: every section is laid out in
 *         normal flow, complete and still
 * The boot script sets the attribute before the first paint, so nothing flashes.
 */

export const motionBootScript = `(function(){try{document.documentElement.dataset.motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on"}catch(e){}})();`;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
export const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  React.useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "off" : "on";
  }, [reduced]);

  // Anything marked data-reveal rises in the first time it reaches the screen.
  React.useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (reduced) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced, pathname]);

  return <>{children}</>;
}

/** True once the element has been on screen (or, with `once` off, while it is). */
export function useInView<T extends Element>({ once = true, threshold = 0, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);
  return [ref, inView] as const;
}

/**
 * Calls `onProgress` with 0..1 as the element travels from `start` to `end` (fractions of
 * the viewport height, measured at the element's top). At most once a frame, only while
 * the element is near the screen, and once with 1 under reduced motion.
 */
export function useScrollProgress<T extends HTMLElement>(onProgress: (progress: number, el: T) => void, { start = 0.9, end = 0.4 } = {}) {
  const ref = React.useRef<T>(null);
  const reduced = useReducedMotion();
  const handler = React.useRef(onProgress);
  handler.current = onProgress;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      handler.current(1, el);
      return;
    }
    let frame = 0;
    let near = false;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      handler.current(Math.min(1, Math.max(0, (vh * start - top) / (vh * (start - end)))), el);
    };
    const schedule = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };
    const watch = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
    }, { rootMargin: "25% 0px" });
    watch.observe(el);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      watch.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced, start, end]);

  return ref;
}

/** Linear map of `p` from [a, b] to [0, 1], clamped. */
export const span = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
/** Smoothstep of `p` between a and b. */
export const smooth = (p: number, a: number, b: number) => {
  const t = span(p, a, b);
  return t * t * (3 - 2 * t);
};
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
