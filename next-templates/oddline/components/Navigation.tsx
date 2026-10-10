"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Arrow, Brand } from "./ui";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-wrap wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href={contact()}>
          Let’s talk <Arrow diagonal size={16} />
        </a>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {site.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <Arrow diagonal size={17} />
              </a>
            ))}
            <a href={contact()}>
              Let’s talk <Arrow diagonal size={17} />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
