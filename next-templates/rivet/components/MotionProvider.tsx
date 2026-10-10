"use client";
import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext({
  enabled: true,
  systemReduced: false,
});
export const useMotion = () => useContext(Context);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const enabled = !systemReduced;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    let frame = 0;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      frame = 0;
      const extent = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--page-progress",
        String(extent > 0 ? scrollY / extent : 0),
      );
      if (!enabled) return;
      document.querySelectorAll<HTMLElement>("[data-open]").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        el.style.setProperty(
          "--open",
          String(Math.max(0, Math.min(1, (innerHeight * 0.62 - top) / (innerHeight * 0.5)))),
        );
      });
      if (!fine.matches && scrollY > 0)
        document.querySelectorAll<HTMLElement>('[data-sheen="scroll"]').forEach((el) => {
          const travel = Math.min(1, scrollY / (innerHeight * 0.7));
          el.style.setProperty("--sx", `${(1.4 - travel * 1.8) * innerWidth}px`);
        });
      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight)
          el.style.setProperty(
            "--drift",
            `${Math.max(-32, Math.min(32, (innerHeight / 2 - r.top - r.height / 2) * 0.06))}px`,
          );
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const sheens = enabled
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-sheen]"))
      : [];
    const follow = (event: PointerEvent) => {
      if (!fine.matches) return;
      const el = event.currentTarget as HTMLElement;
      el.style.setProperty(
        "--sx",
        `${event.clientX - el.getBoundingClientRect().left}px`,
      );
    };
    const rest = (event: PointerEvent) =>
      (event.currentTarget as HTMLElement).style.removeProperty("--sx");
    sheens.forEach((el) => {
      el.addEventListener("pointermove", follow);
      el.addEventListener("pointerleave", rest);
    });
    update();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    return () => {
      observer.disconnect();
      sheens.forEach((el) => {
        el.removeEventListener("pointermove", follow);
        el.removeEventListener("pointerleave", rest);
      });
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);
  return (
    <Context.Provider value={{ enabled, systemReduced }}>
      {children}
    </Context.Provider>
  );
}
