"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { site } from "@/site.config";

/*
 * Two things decide whether the page moves on its own:
 *   reduced  the visitor's system setting (prefers-reduced-motion)
 *   paused   the visitor's own choice, from the pause button in the header
 * Loops (the email deck, the logo strip, the orbit, the closing marquee, the
 * quote autoplay) stop for either.
 */

type MotionState = { reduced: boolean; paused: boolean; still: boolean; toggle: () => void };

const MotionContext = React.createContext<MotionState>({ reduced: false, paused: false, still: false, toggle: () => {} });

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
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    setPaused(document.documentElement.dataset.motion === "paused");
  }, []);

  const toggle = React.useCallback(() => {
    setPaused((was) => {
      const next = !was;
      if (next) document.documentElement.dataset.motion = "paused";
      else delete document.documentElement.dataset.motion;
      try {
        localStorage.setItem(site.motion.storageKey, next ? "paused" : "on");
      } catch {
        /* The choice still holds for this visit. */
      }
      return next;
    });
  }, []);

  const value = React.useMemo(() => ({ reduced, paused, still: reduced || paused, toggle }), [reduced, paused, toggle]);
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

/** The visitor's switch for everything that moves on its own. */
export function PauseButton({ className = "" }: { className?: string }) {
  const { paused, reduced, toggle } = useMotion();
  if (reduced) return null;
  const swap = (on: boolean) =>
    `absolute transition-[opacity,scale,filter] duration-300 ease-[var(--ease)] ${on ? "opacity-100" : "scale-[0.6] opacity-0 blur-[3px]"}`;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Play motion" : "Pause motion"}
      title={paused ? "Play motion" : "Pause motion"}
      className={`relative grid size-9 place-items-center rounded-full border border-line bg-white text-ink/70 transition-colors duration-300 hover:bg-mist hover:text-ink ${className}`}
    >
      <Pause aria-hidden="true" className={`size-3.5 ${swap(!paused)}`} strokeWidth={2.2} />
      <Play aria-hidden="true" className={`size-3.5 translate-x-px ${swap(paused)}`} strokeWidth={2.2} />
    </button>
  );
}
