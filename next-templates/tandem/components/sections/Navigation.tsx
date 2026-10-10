"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { site } from "@/site.config";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 801px)");
    const wide = () => {
      if (media.matches) setOpen(false);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", key);
    media.addEventListener("change", wide);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      media.removeEventListener("change", wide);
    };
  }, []);
  return (
    <header
      className={`navigation ${scrolled ? "nav-scrolled" : ""} ${open ? "nav-open" : ""}`}
    >
      <div className="nav-bar container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Button href="#start" className="nav-cta">
            Get a little backup
          </Button>
          <button
            ref={toggle}
            className="mobile-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span className={open ? "icon-open" : ""}>
              <Menu size={20} />
              <X size={20} />
            </span>
          </button>
        </div>
      </div>
      <div id="mobile-nav" className="mobile-nav" inert={!open}>
        <nav aria-label="Mobile navigation">
          {site.nav.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              {l.label}
              <ArrowUpRight size={19} />
            </a>
          ))}
          <a href="#start" onClick={() => setOpen(false)}>
            Get a little backup
            <ArrowUpRight size={19} />
          </a>
        </nav>
      </div>
    </header>
  );
}
