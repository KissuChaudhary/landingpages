"use client";
import { createContext, useContext, useEffect, useState } from "react";
const MotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});
export function Motion({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    try {
      setPaused(localStorage.getItem("daymark-motion") === "paused");
    } catch {}
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      (root.dataset.motion =
        paused || reduced || document.hidden ? "paused" : "running");
    sync();
    document.addEventListener("visibilitychange", sync);
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    reveals.forEach((element) => {
      if (
        element.getBoundingClientRect().top > window.innerHeight &&
        !paused &&
        !reduced
      ) {
        element.classList.add("reveal-wait");
        revealObserver.observe(element);
      } else element.classList.add("revealed");
    });
    const loopObserver = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.inview = entry.isIntersecting
          ? "true"
          : "false";
      }),
    );
    document
      .querySelectorAll("[data-loop]")
      .forEach((element) => loopObserver.observe(element));
    return () => {
      document.removeEventListener("visibilitychange", sync);
      revealObserver.disconnect();
      loopObserver.disconnect();
    };
  }, [paused, reduced]);
  const toggle = () =>
    setPaused((value) => {
      try {
        localStorage.setItem("daymark-motion", value ? "running" : "paused");
      } catch {}
      return !value;
    });
  return (
    <MotionContext.Provider value={{ paused, reduced, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export function MotionControl() {
  const { paused, reduced, toggle } = useContext(MotionContext);
  return (
    <button
      className="motion-control"
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      disabled={reduced}
      aria-label={
        reduced
          ? "Motion reduced by your device preference"
          : paused
            ? "Resume ambient motion"
            : "Pause ambient motion"
      }
    >
      <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
      {reduced ? "Reduced motion" : paused ? "Motion paused" : "Pause motion"}
    </button>
  );
}
