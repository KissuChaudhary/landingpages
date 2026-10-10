"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/links";
import { Arrow, Mark } from "./ui";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className={`navigation ${open ? "nav-open" : ""}`}>
      <a className="brand" href={href("/")} aria-label={`${site.brand} home`}>
        <Mark />
        <span>{site.brand}</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {site.nav.map((item) => (
          <a href={href(item.href)} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="nav-contact" href={href(site.links.booking)}>
        Let’s talk <Arrow diagonal />
      </a>
      <button
        className="nav-toggle"
        ref={toggle}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <div className="mobile-nav-shell">
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          inert={!open}
        >
          {site.nav.map((item, i) => (
            <a
              href={href(item.href)}
              key={item.label}
              onClick={() => setOpen(false)}
            >
              <small className="mono">0{i + 1}</small>
              {item.label}
              <Arrow />
            </a>
          ))}
          <a href={href(site.links.booking)} onClick={() => setOpen(false)}>
            Start a conversation
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
