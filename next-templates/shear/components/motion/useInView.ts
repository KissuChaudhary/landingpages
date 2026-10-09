"use client";

import * as React from "react";

/**
 * True once (or while) the element is on screen.
 * `once` keeps it true after the first sighting, for entrances.
 */
export function useInView<T extends Element>(options: { once?: boolean; rootMargin?: string; threshold?: number } = {}) {
  const { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0 } = options;
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
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);
  return [ref, inView] as const;
}

/** True while the tab is visible, so loops can sleep in the background. */
export function usePageVisible() {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

/**
 * Both at once: `seen` stays true after the first sighting (so a scene keeps
 * its final state), `visible` follows the screen (so its loops can rest).
 */
export function useSeen<T extends Element>(rootMargin = "0px") {
  const ref = React.useRef<T>(null);
  const [state, setState] = React.useState({ seen: false, visible: false });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setState((s) => (s.visible === entry.isIntersecting && (s.seen || !entry.isIntersecting) ? s : { seen: s.seen || entry.isIntersecting, visible: entry.isIntersecting })),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);
  return [ref, state.seen, state.visible] as const;
}
