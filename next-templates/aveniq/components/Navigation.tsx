"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Brand, Button } from "./ui";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Brand />
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={open ? "navigation is-open" : "navigation"}
          >
            {site.navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mobile-contact"
              href={contact()}
              onClick={() => setOpen(false)}
            >
              Get started
            </a>
          </nav>
          <Button href={contact()} className="nav-cta">
            Get started
          </Button>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
