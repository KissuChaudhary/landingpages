"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches) return;
      const root = document.documentElement;
      root.dataset.enhanced = "true";
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      );
      document
        .querySelectorAll("[data-reveal]")
        .forEach((node) => observer.observe(node));
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const studio = document.querySelector<HTMLElement>("[data-statement]");
      const process = document.querySelector<HTMLElement>("[data-process]");
      let raf = 0;
      let readProgress = 0;
      const clamp = (value: number) => Math.min(1, Math.max(0, value));
      const update = () => {
        raf = 0;
        if (hero)
          hero.style.setProperty(
            "--drift",
            (clamp(-hero.getBoundingClientRect().top / 800) * 90).toFixed(2) +
              "px",
          );
        if (studio) {
          readProgress = Math.max(
            readProgress,
            clamp(
              (window.innerHeight * 0.8 - studio.getBoundingClientRect().top) /
                (studio.offsetHeight + window.innerHeight * 0.2),
            ),
          );
          studio.style.setProperty("--read", readProgress.toFixed(4));
        }
        if (process)
          process.style.setProperty(
            "--progress",
            clamp(
              (window.innerHeight * 0.6 - process.getBoundingClientRect().top) /
                process.offsetHeight,
            ).toFixed(4),
          );
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        delete root.dataset.enhanced;
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      cleanup();
      media.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
