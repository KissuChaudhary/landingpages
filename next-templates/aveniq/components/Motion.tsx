"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const root = document.documentElement;
      root.dataset.enhanced = "true";
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll("[data-reveal], [data-title]")
        .forEach((node) => observer.observe(node));
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const workflow = document.querySelector<HTMLElement>("[data-workflow]");
      const steps = [...document.querySelectorAll<HTMLElement>("[data-step]")];
      const orbits = [
        ...document.querySelectorAll<HTMLElement>("[data-orbit]"),
      ];
      const stack = [...document.querySelectorAll<HTMLElement>("[data-stack]")];
      const clamp = (value: number) => Math.max(0, Math.min(1, value));
      let frame = 0;
      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const desktop = window.innerWidth > 900;
        if (hero)
          hero.style.setProperty(
            "--hero-shift",
            `${clamp(-hero.getBoundingClientRect().top / 700) * 45}px`,
          );
        let active = 0;
        steps.forEach((step, index) => {
          if (step.getBoundingClientRect().top < height * 0.62) active = index;
        });
        steps.forEach((step, index) => {
          step.dataset.active = String(index <= active);
        });
        orbits.forEach((node, index) => {
          node.dataset.active = String(index === active);
        });
        if (workflow && steps.length) {
          const start = steps[0].getBoundingClientRect().top;
          const end = steps[steps.length - 1].getBoundingClientRect().top;
          workflow.style.setProperty(
            "--progress",
            clamp((height * 0.62 - start) / Math.max(1, end - start)).toFixed(
              4,
            ),
          );
        }
        stack.forEach((card, index) => {
          const next = stack[index + 1];
          const progress =
            desktop && next
              ? clamp(
                  (height * 0.85 - next.getBoundingClientRect().top) /
                    (height * 0.65),
                )
              : 0;
          card.style.setProperty(
            "--stack-scale",
            (1 - progress * 0.045).toFixed(4),
          );
          card.style.setProperty(
            "--stack-shade",
            (1 - progress * 0.25).toFixed(4),
          );
        });
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        delete root.dataset.enhanced;
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
