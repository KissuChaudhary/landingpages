"use client";
import { useEffect } from "react";
/** Progressive enhancement: the page is readable before JS and if motion is reduced. */
export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disconnect = () => {};
    const setup = () => {
      disconnect();
      if (media.matches || !("IntersectionObserver" in window)) return;
      document.documentElement.dataset.enhanced = "true";
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll("[data-reveal]")
        .forEach((node) => observer.observe(node));
      disconnect = () => {
        observer.disconnect();
        delete document.documentElement.dataset.enhanced;
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      disconnect();
      media.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
