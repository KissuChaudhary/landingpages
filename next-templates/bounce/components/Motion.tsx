"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Motion follows the system reduced-motion setting.

type MotionState = { reduced: boolean };

const MotionContext = createContext<MotionState>({ reduced: false });

export const useMotion = () => useContext(MotionContext);

/** Runs before first paint so reveals and the hero intro never flash. */
export const motionBootScript = `(function(){try{document.documentElement.dataset.motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on"}catch(e){}})();`;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = reduced ? "off" : "on";
  }, [reduced]);

  // Reveal anything marked with data-reveal as it enters the viewport.
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    if (reduced) {
      items.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced, pathname]);

  return <MotionContext.Provider value={{ reduced }}>{children}</MotionContext.Provider>;
}

/** True once the element has been in view (or always, with `once` off, while it is). */
export function useInView<T extends Element>(options: { once?: boolean; threshold?: number; rootMargin?: string } = {}) {
  const { once = true, threshold = 0.25, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);
  return [ref, inView] as const;
}

/**
 * Calls `onProgress` with 0..1 as the page scrolls through `distance(el)` pixels,
 * starting when the element's top is `start(el)` pixels from the viewport top.
 * Runs at most once per frame and not at all with reduced motion.
 */
export function useScrollProgress<T extends HTMLElement>(
  onProgress: (progress: number, el: T) => void,
  range: (el: T, viewport: number) => { start: number; distance: number },
) {
  const ref = useRef<T>(null);
  const { reduced } = useMotion();
  const handler = useRef(onProgress);
  const measure = useRef(range);
  handler.current = onProgress;
  measure.current = range;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      handler.current(1, el);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const { start, distance } = measure.current(el, vh);
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (start - top) / Math.max(1, distance)));
      handler.current(p, el);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return ref;
}
