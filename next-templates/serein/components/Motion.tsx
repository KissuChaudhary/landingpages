"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MotionContext = createContext({ paused: true, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let preference: string | null = null;
    try {
      preference = localStorage.getItem("serein-motion");
    } catch {}
    setPaused(media.matches || preference === "paused");
    const sync = () => setPaused(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    document.documentElement.dataset.ready = "true";
    if (paused) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 32px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [paused, pathname]);
  const toggle = () =>
    setPaused((value) => {
      try {
        localStorage.setItem("serein-motion", value ? "playing" : "paused");
      } catch {}
      return !value;
    });
  return (
    <MotionContext.Provider value={{ paused, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}

export function MotionControl({ compact = false }: { compact?: boolean }) {
  const { paused, toggle } = useMotion();
  return (
    <button
      className={`motion-control ${compact ? "compact" : ""}`}
      type="button"
      onClick={toggle}
      aria-label={paused ? "Play ambient motion" : "Pause ambient motion"}
      aria-pressed={paused}
    >
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      {!compact && (paused ? "Motion paused" : "Pause motion")}
    </button>
  );
}
