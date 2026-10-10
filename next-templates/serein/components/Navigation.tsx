"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "./ui/Brand";
import { Arrow } from "./ui/Arrow";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);
  return (
    <header className={`navigation ${open ? "menu-open" : ""}`}>
      <div className="nav-inner">
        <a
          className="nav-brand"
          href={href("/")}
          aria-label={`${site.brand} home`}
        >
          <Brand />
        </a>
        <span className="nav-note">Independent brand & digital studio</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((link) => (
            <a key={link.label} href={href(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="nav-contact"
          href={href(site.links.booking || "/contact")}
        >
          Let's talk <Arrow />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <div id="site-menu" className="nav-menu" inert={!open}>
        <nav aria-label="Expanded navigation">
          {[
            ...site.navigation,
            { label: "Journal", href: "/journal" },
            { label: "Contact", href: "/contact" },
          ].map((link, index) => (
            <a
              key={link.label}
              href={href(link.href)}
              onClick={() => setOpen(false)}
            >
              <span className="menu-number">0{index + 1}</span>
              {link.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <span>{site.location}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </header>
  );
}
