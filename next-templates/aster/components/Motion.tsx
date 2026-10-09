"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const MotionContext = createContext({
  paused: false,
  system: false,
  toggle: () => {},
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [manual, setManual] = useState(false);
  const [system, setSystem] = useState(false);
  const pathname = usePathname();
  const paused = manual || system;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      setManual(localStorage.getItem("aster-motion") === "paused");
    } catch {}
    const sync = () => setSystem(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    document.documentElement.dataset.ready = "true";
    if (paused) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [paused, pathname]);
  const toggle = () => {
    const next = !manual;
    setManual(next);
    try {
      localStorage.setItem("aster-motion", next ? "paused" : "on");
    } catch {}
  };
  return (
    <MotionContext.Provider value={{ paused, system, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
