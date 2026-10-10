"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const MotionContext = createContext({ paused: false, toggle: () => {} });
const clamp = (value: number) => Math.min(1, Math.max(0, value));
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    try {
      setPaused(localStorage.getItem("sylva-motion") === "off");
    } catch {
      /* Storage is optional. */
    }
    return () => media.removeEventListener("change", sync);
  }, []);
  const reduced = paused || systemReduced;
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = reduced ? "off" : "on";
    if (reduced) {
      delete root.dataset.enhanced;
      return;
    }
    root.dataset.enhanced = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((node) => observer.observe(node));
    const journey = document.querySelector<HTMLElement>("[data-journey]");
    const fan = document.querySelector<HTMLElement>("[data-fan]");
    const care = document.querySelector<HTMLElement>("[data-care]");
    let raf = 0;
    let active = true;
    const update = () => {
      raf = 0;
      if (!active) return;
      const height = window.innerHeight;
      if (window.innerWidth > 900) {
        if (journey) {
          const progress = clamp(-journey.getBoundingClientRect().top / 820);
          journey.style.setProperty("--journey", progress.toFixed(4));
        }
        if (fan) {
          const bounds = fan.getBoundingClientRect();
          const progress = clamp(
            (height * 0.15 - bounds.top) / (height * 0.62),
          );
          fan.style.setProperty("--spread", progress.toFixed(4));
        }
        if (care) {
          const progress = clamp(
            (height * 0.7 - care.getBoundingClientRect().top) / (height * 0.65),
          );
          care.style.setProperty("--bloom", progress.toFixed(4));
        }
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      active = false;
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete root.dataset.enhanced;
    };
  }, [reduced, pathname]);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem("sylva-motion", next ? "off" : "on");
    } catch {
      /* Storage is optional. */
    }
  };
  return (
    <MotionContext.Provider value={{ paused: reduced, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export function MotionToggle() {
  const { paused, toggle } = useContext(MotionContext);
  return (
    <button className="motion-toggle" onClick={toggle} aria-pressed={paused}>
      <span className={paused ? "" : "motion-dot"} />
      {paused ? "Motion paused" : "Pause motion"}
    </button>
  );
}
