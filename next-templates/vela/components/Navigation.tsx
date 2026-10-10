"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/site.config";
import { bookingHref, path } from "@/lib/urls";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Primitives";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () =>
      setScrolled(
        window.scrollY > 80 || window.location.pathname.includes("contact"),
      );
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header
      className={`navigation ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
    >
      <div className="nav-inner">
        <a href={path("/")} aria-label={`${site.brand} home`}>
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((link) => (
            <a href={path(link.href)} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Button href={bookingHref()}>{site.hero.secondary}</Button>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {site.navigation.map((link) => (
          <a
            key={link.label}
            href={path(link.href)}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <span>↗</span>
          </a>
        ))}
        <a href={bookingHref()} onClick={() => setOpen(false)}>
          {site.hero.secondary}
          <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
