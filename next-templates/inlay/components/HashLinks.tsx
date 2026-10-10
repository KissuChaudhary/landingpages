"use client";

import { useEffect } from "react";

// Links to a section of the page you're already on glide there instead of reloading,
// even when the URL spells the page differently (for example /index.html on static hosts).
const normalize = (path: string) => path.replace(/index\.html$/, "").replace(/\.html$/, "").replace(/\/$/, "");

export function HashLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || normalize(url.pathname) !== normalize(window.location.pathname)) return;
      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!section) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", url.hash);
      // Arriving at a form (the claim field) puts the cursor in it, where there's a mouse.
      const field = section.matches("input") ? section : section.querySelector("input");
      if (field instanceof HTMLInputElement && window.matchMedia("(pointer: fine)").matches) field.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
