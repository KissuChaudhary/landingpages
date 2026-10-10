"use client";
import { useEffect, useState } from "react";
export function Motion({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      (root.dataset.motion =
        reduced || document.hidden ? "paused" : "running");
    sync();
    document.addEventListener("visibilitychange", sync);
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    reveals.forEach((element) => {
      if (
        element.getBoundingClientRect().top > window.innerHeight &&
        !reduced
      ) {
        element.classList.add("reveal-wait");
        revealObserver.observe(element);
      } else element.classList.add("revealed");
    });
    const loopObserver = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.inview = entry.isIntersecting
          ? "true"
          : "false";
      }),
    );
    document
      .querySelectorAll("[data-loop]")
      .forEach((element) => loopObserver.observe(element));
    return () => {
      document.removeEventListener("visibilitychange", sync);
      revealObserver.disconnect();
      loopObserver.disconnect();
    };
  }, [reduced]);
  return <>{children}</>;
}
