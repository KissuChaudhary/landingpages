"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { site, enrollHref, seatsLeft, cohortDate } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "./ui/Brand";
import { ButtonLink, Roll } from "./ui/Primitives";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The pill behind the menu slides to the section in the middle of the screen.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const isCurrent = (link: string) => {
    const [path, id] = link.split("#");
    if (id) return pathname === "/" && current === id;
    return pathname === path;
  };

  return (
    <header ref={root} className={`nav${scrolled || open ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="container nav-bar">
        <Brand />
        <nav className="nav-links" aria-label="Main">
          {site.nav.map((l) => (
            <a key={l.href} href={href(l.href)} className={isCurrent(l.href) ? "is-current" : undefined} aria-current={isCurrent(l.href) ? "true" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="nav-cohort">
            <i aria-hidden="true" />
            {site.cohort.name} · {cohortDate()} · {seatsLeft()} seats
          </span>
          {site.links.signin && (
            <a className="nav-signin" href={site.links.signin}>
              <Roll text="Log in" />
            </a>
          )}
          <ButtonLink to={enrollHref()} label="Enroll" className="btn-sm" />
          <button ref={toggle} type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="nav-sheet" hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {site.nav.map((l, i) => (
            <a key={l.href} href={href(l.href)} style={{ "--i": i } as CSSProperties} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          {site.links.signin && (
            <a href={site.links.signin} style={{ "--i": site.nav.length } as CSSProperties}>
              Log in
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
