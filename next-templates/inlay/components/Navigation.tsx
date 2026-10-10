"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { loginHref, signupHref } from "@/lib/links";
import { Brand } from "@/components/ui/Brand";
import { Button, SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";

// A white pill that narrows once you scroll. On the home page a soft highlight rests on
// the section you're reading and glides to whichever link you point at. On phones the
// bar itself grows into the menu.

const sectionOf = (link: string) => (link.startsWith("/#") ? link.slice(2) : null);

export function Navigation() {
  const pathname = usePathname();
  const handle = useHandle();
  const home = pathname === "/" || pathname.endsWith("/index.html") || pathname === "";
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [glide, setGlide] = useState({ x: 0, w: 0, on: false });
  const links = useRef<(HTMLSpanElement | null)[]>([]);
  const list = useRef<HTMLUListElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const login = loginHref();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is in the middle of the screen.
  useEffect(() => {
    if (!home) return setActive(null);
    const ids = site.nav.map((l) => sectionOf(l.href)).filter(Boolean) as string[];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [home]);

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
    const el = bar.current;
    el?.addEventListener("transitionend", place);
    return () => {
      window.removeEventListener("resize", place);
      el?.removeEventListener("transitionend", place);
    };
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
          <SmartLink to="/" className="nav-brand" aria-label={`${site.brand} home`}>
            <Brand />
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
            {login && (
              <SmartLink to={login} className="nav-login">
                {site.login}
              </SmartLink>
            )}
            <SmartLink to={signupHref(handle)} className="nav-cta">
              {site.signup}
            </SmartLink>
            <button ref={toggle} type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
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
                <li key={link.href} style={{ "--i": i } as CSSProperties}>
                  <SmartLink to={link.href} className="nav-menu-link">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <div className="nav-menu-end" onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}>
              {login && <Button to={login} label={site.login} tone="line" arrow={false} />}
              <Button to={signupHref(handle)} label={site.signup} tone="ink" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
