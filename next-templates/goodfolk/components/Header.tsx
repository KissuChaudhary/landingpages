"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Arrow, Mark } from "./ui";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header ref={header} className="site-header">
      <a
        className="wordmark"
        href={route("/")}
        aria-label={`${site.brand} home`}
      >
        <Mark />
        <span>{site.brand}</span>
        <sup>®</sup>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {site.navigation.map((item) => (
          <a key={item.label} href={route(item.href)}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href={route(site.contactHref)}>
        {site.contactLabel}
        <Arrow diagonal />
      </a>
      <button
        className="menu-toggle"
        ref={toggle}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        <span /> <span />
      </button>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {site.navigation.map((item) => (
          <a
            onClick={() => setOpen(false)}
            key={item.label}
            href={route(item.href)}
          >
            {item.label}
            <Arrow diagonal />
          </a>
        ))}
        <a onClick={() => setOpen(false)} href={route(site.contactHref)}>
          {site.contactLabel}
          <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}
