"use client";
import { useEffect } from "react";
export const motionBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='on'}catch(e){}`;
/** One observer and one scheduled scroll pass for the entire site. */
export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let enabled = false;
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")];
    const update = () => {
      frame = 0;
      document.documentElement.dataset.scrolled = String(window.scrollY > 40);
      if (!enabled) return;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) /
              (window.innerHeight + rect.height),
          ),
        );
        scene.style.setProperty("--progress", progress.toFixed(4));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const setup = () => {
      enabled = !media.matches;
      document.documentElement.dataset.motion = enabled ? "on" : "off";
      observer?.disconnect();
      if (enabled) {
        observer = new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              const scene = entry.target.hasAttribute("data-scene");
              if (scene)
                entry.target.setAttribute(
                  "data-active",
                  String(entry.isIntersecting),
                );
              if (entry.isIntersecting) {
                entry.target.setAttribute("data-visible", "true");
                if (!scene) observer?.unobserve(entry.target);
              }
            }),
          { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
        );
        document
          .querySelectorAll("[data-reveal], [data-scene]")
          .forEach((el) => observer?.observe(el));
      }
      schedule();
    };
    setup();
    media.addEventListener("change", setup);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", setup);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return null;
}
