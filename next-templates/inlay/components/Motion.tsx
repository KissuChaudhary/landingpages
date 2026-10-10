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

  // Reveal anything marked data-reveal as it enters the viewport.
  useEffect(() => {
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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced, pathname]);

  return <MotionContext.Provider value={{ reduced }}>{children}</MotionContext.Provider>;
}

/** True once the element has been in view (or, with `once` off, while it is). */
export function useInView<T extends Element>({ once = true, threshold = 0.3, rootMargin = "0px" } = {}) {
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

export type Range = (el: HTMLElement, viewport: number) => { start: number; distance: number };

/** From the moment the element's top reaches the bottom of the viewport until its bottom leaves the top. */
export const throughViewport: Range = (el, vh) => ({ start: vh, distance: el.offsetHeight + vh });

/** While a tall section scrolls past a sticky child: 0 when its top meets the viewport top, 1 when its bottom does. */
export const pinned: Range = (el, vh) => ({ start: 0, distance: Math.max(1, el.offsetHeight - vh) });

/**
 * Calls `onProgress` with 0..1 while the page scrolls through the range. Runs at most once
 * a frame, only while the element is near the viewport, and once with 1 under reduced motion.
 */
export function useScrollProgress<T extends HTMLElement>(onProgress: (progress: number, el: T) => void, range: Range = throughViewport) {
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
    let near = true;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const { start, distance } = measure.current(el, vh);
      const top = el.getBoundingClientRect().top;
      handler.current(Math.min(1, Math.max(0, (start - top) / distance)), el);
    };
    const schedule = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };
    // Skip the work entirely while the section is far off screen.
    const watch = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if (near) schedule();
    }, { rootMargin: "50% 0px" });
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
  }, [reduced]);

  return ref;
}

/**
 * Runs `tick(dt)` every frame while `active`, the element is on screen and the tab is
 * visible. For the parts that move on their own: the hero tiles and the connect lines.
 */
export function useFrameLoop<T extends Element>(tick: (dt: number) => void, active: boolean) {
  const ref = useRef<T>(null);
  const handler = useRef(tick);
  handler.current = tick;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    let frame = 0;
    let last = 0;
    let visible = false;
    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      handler.current(dt);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    watch.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      watch.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  return ref;
}

/** How fast the page is scrolling, in px per ms, eased toward zero. Read it inside a frame loop. */
export function useScrollVelocity() {
  const velocity = useRef(0);
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const v = (window.scrollY - lastY) / dt;
      velocity.current = velocity.current * 0.6 + v * 0.4;
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return velocity;
}

/** Linear map of `p` from [a, b] to [0, 1], clamped. */
export const span = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
