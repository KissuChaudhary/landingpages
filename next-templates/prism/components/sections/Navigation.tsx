"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { usePrism } from "@/components/PrismProvider";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { start } = usePrism();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.nav.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="button button-small button-light"
            onClick={() => start()}
          >
            Open Prism
            <ArrowUpRight size={15} />
          </button>
          <button
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav container"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {site.nav.map((link) => (
          <a href={link.href} key={link.label} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
      </nav>
    </header>
  );
}
