"use client";

import * as React from "react";

/*
 * The visitor's system setting (prefers-reduced-motion) decides whether the
 * page moves on its own. With it on, the loops (the glyph field, the moving
 * word, the logo strip) stay still and every reveal is shown at once. Without
 * it, each loop still rests while it's off screen or the tab is hidden, and
 * the logo strip eases to a stop under the pointer.
 */

type MotionState = { reduced: boolean; still: boolean };

const MotionContext = React.createContext<MotionState>({ reduced: false, still: false });

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
  const value = React.useMemo(() => ({ reduced, still: reduced }), [reduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export const useMotion = () => React.useContext(MotionContext);

/** Pauses and resumes Web Animations inside an element, e.g. a component's own loops. */
export function usePausedAnimations(ref: React.RefObject<HTMLElement | null>, paused: boolean) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => el.getAnimations({ subtree: true }).forEach((a) => (paused ? a.pause() : a.play()));
    apply();
    // Loops created after this (a resize restarts them) follow the same choice.
    const timer = window.setTimeout(apply, 120);
    return () => window.clearTimeout(timer);
  }, [ref, paused]);
}
