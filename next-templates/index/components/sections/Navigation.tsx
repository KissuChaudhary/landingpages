"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/site.config";
import { Mark } from "@/components/ui/Mark";
import { Action } from "@/components/ui/Action";
const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#examples", label: "Explore" },
  { href: "#pricing", label: "Pricing" },
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="brand" href="#top" aria-label={`${site.brand} home`}>
          <Mark />
          {site.brand}
          <span className="brand__dot">.</span>
        </a>
        <nav className="nav__links" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <Action href={site.links.app || "#research"}>
            {site.hero.action}
          </Action>
          <button
            className="icon-button nav__menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="nav__mobile"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
