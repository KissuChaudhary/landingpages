"use client";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const MotionContext = createContext({
  reduced: false,
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  useEffect(() => {
    const enabled = !reduced;
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!enabled) {
      elements.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px 30px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    document.documentElement.classList.add("motion-ready");
    let frame = 0;
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".story-panel"),
    );
    const dashboard = document.querySelector<HTMLElement>(".hero-dashboard");
    const update = () => {
      frame = 0;
      if (dashboard) {
        const progress = Math.min(window.scrollY / 700, 1);
        dashboard.style.setProperty("--hero-tilt", `${(1 - progress) * 4}deg`);
      }
      if (window.innerWidth < 900) return;
      panels.forEach((panel, index) => {
        const next = panels[index + 1];
        const progress = next
          ? Math.max(
              0,
              Math.min(1, 1 - (next.getBoundingClientRect().top - 120) / 450),
            )
          : 0;
        panel.style.setProperty("--stack-scale", String(1 - progress * 0.035));
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [reduced]);
  return (
    <MotionContext.Provider value={{ reduced }}>
      {children}
    </MotionContext.Provider>
  );
}
