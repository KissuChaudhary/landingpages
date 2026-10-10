"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { Action, SmartLink, planHref } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";

// The bar narrows once you scroll. On the home page a soft highlight rests on the section
// you're reading and glides to whichever link you point at. On phones the bar itself grows
// into the menu.

const sectionOf = (link: string) => (link.startsWith("/#") ? link.slice(2) : null);

export function Navigation() {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/index.html" || pathname.endsWith("/index.html");
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [glide, setGlide] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false });
  const links = useRef<(HTMLSpanElement | null)[]>([]);
  const list = useRef<HTMLUListElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is in the middle of the screen.
  useEffect(() => {
    if (!home) {
      setActive(null);
      return;
    }
    const ids = site.nav.map((l) => sectionOf(l.href)).filter(Boolean) as string[];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [home]);

  // The highlight sits under the hovered link, or the active section's link.
  const place = useCallback(() => {
    const index = hover ?? (active ? site.nav.findIndex((l) => sectionOf(l.href) === active) : -1);
    const el = index >= 0 ? links.current[index] : null;
    const box = list.current?.getBoundingClientRect();
    if (!el || !box) return setGlide((g) => ({ ...g, on: false }));
    const r = el.getBoundingClientRect();
    setGlide({ x: r.left - box.left, w: r.width, on: true });
  }, [hover, active]);

  useLayoutEffect(place, [place, compact]);
  useEffect(() => {
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);
  // The bar's width animates when it compacts; follow it until it settles.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const end = () => place();
    el.addEventListener("transitionend", end);
    return () => el.removeEventListener("transitionend", end);
  }, [place]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${compact ? "is-compact" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-bar" ref={bar}>
        <div className="nav-row">
          <SmartLink to="/" className="nav-brand" ariaLabel={`${site.brand} home`}>
            <Brand size={30} />
          </SmartLink>
          <nav aria-label="Main" className="nav-links">
            <ul ref={list} onMouseLeave={() => setHover(null)}>
              <span className={`nav-glide ${glide.on ? "is-on" : ""}`} style={{ transform: `translateX(${glide.x}px)`, width: glide.w }} aria-hidden="true" />
              {site.nav.map((link, i) => (
                <li key={link.href}>
                  <SmartLink to={link.href} className={`nav-link ${active && sectionOf(link.href) === active ? "is-active" : ""}`}>
                    <span
                      ref={(el) => {
                        links.current[i] = el;
                      }}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                    >
                      {link.label}
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-end">
            <SmartLink to={planHref()} className="nav-cta">
              {site.cta}
            </SmartLink>
            <button
              ref={toggle}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="nav-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <TextMorph>{open ? "Close" : "Menu"}</TextMorph>
              <span className="nav-burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <div className="nav-menu" id="nav-menu" inert={!open}>
          <div className="nav-menu-inner">
            <ul onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}>
              {site.nav.map((link, i) => (
                <li key={link.href} style={{ "--i": i } as React.CSSProperties}>
                  <SmartLink to={link.href} className="nav-menu-link">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <Action to={planHref()} label={site.cta} tone="lime" className="nav-menu-cta" />
          </div>
        </div>
      </div>
    </header>
  );
}
