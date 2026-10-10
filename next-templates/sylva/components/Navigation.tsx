"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Brand } from "./ui/Brand";
import { site, bookingHref } from "@/site.config";
import { href } from "@/lib/urls";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((link) => (
            <a key={link.label} href={href(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={href(bookingHref())}>
          Let's talk plants <ArrowUpRight size={16} />
        </a>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {site.navigation.map((link) => (
          <a
            key={link.label}
            onClick={() => setOpen(false)}
            href={href(link.href)}
          >
            {link.label}
            <ArrowUpRight size={19} />
          </a>
        ))}
        <a onClick={() => setOpen(false)} href={href(bookingHref())}>
          Let's talk plants
          <ArrowUpRight size={19} />
        </a>
      </nav>
    </header>
  );
}
