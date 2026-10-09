"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
const MotionContext = createContext({
  paused: false,
  system: false,
  toggle: () => {},
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [manual, setManual] = useState(false);
  const [system, setSystem] = useState(false);
  const paused = manual || system;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      setManual(localStorage.getItem("daybreak-motion") === "paused");
    } catch {}
    const sync = () => setSystem(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    if (paused) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    document.documentElement.dataset.ready = "true";
    return () => observer.disconnect();
  }, [paused]);
  function toggle() {
    const next = !manual;
    setManual(next);
    try {
      localStorage.setItem("daybreak-motion", next ? "paused" : "on");
    } catch {}
  }
  return (
    <MotionContext.Provider value={{ paused, system, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export function ReadingText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { paused } = useMotion();
  useEffect(() => {
    if (paused) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (innerHeight * 0.87 - r.top) / (innerHeight * 0.48)),
      );
      el.style.setProperty("--reading", String(progress));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [paused]);
  const words = text.split(" ");
  return (
    <p className="reading-text" ref={ref} aria-label={text}>
      {words.map((word, i) => (
        <span
          aria-hidden="true"
          key={i}
          style={{ "--word": i / words.length } as React.CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
