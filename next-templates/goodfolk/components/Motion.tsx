"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const words = Array.from(
      document.querySelectorAll<HTMLElement>("[data-word-reveal]"),
    );
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const update = () => {
      frame = 0;
      if (media.matches) return;
      const height = window.innerHeight;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero)
        hero.style.setProperty(
          "--hero-drift",
          `${Math.min(70, Math.max(0, -hero.getBoundingClientRect().top * 0.12))}px`,
        );
      words.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > height) return;
        const progress = Math.min(
          1,
          Math.max(0, (height * 0.88 - rect.top) / (height * 0.45)),
        );
        const spans = Array.from(
          el.querySelectorAll<HTMLElement>("[data-word]"),
        );
        spans.forEach((span, i) =>
          span.style.setProperty(
            "--word-opacity",
            String(
              0.24 +
                0.76 *
                  Math.min(
                    1,
                    Math.max(0, (progress * (spans.length + 1) - i) / 2),
                  ),
            ),
          ),
        );
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const setup = () => {
      observer?.disconnect();
      root.dataset.motion = media.matches ? "reduced" : "on";
      if (media.matches) {
        document
          .querySelector<HTMLElement>("[data-hero]")
          ?.style.removeProperty("--hero-drift");
        reveal.forEach((el) => {
          el.dataset.visible = "true";
        });
        return;
      }
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = "true";
              observer?.unobserve(entry.target);
            }
          }),
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      reveal.forEach((el) => observer?.observe(el));
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
      delete root.dataset.motion;
    };
  }, []);
  return null;
}
