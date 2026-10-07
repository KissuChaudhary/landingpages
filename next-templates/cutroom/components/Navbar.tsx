"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

function Mark() {
  // An orange square with the trim handles of a clip: the same shape as the headline highlight.
  return (
    <span aria-hidden className="relative grid size-8 place-items-center rounded-[10px] bg-flame">
      <span className="absolute inset-y-[28%] left-[22%] w-[3px] rounded-full bg-ink" />
      <span className="absolute inset-y-[28%] right-[22%] w-[3px] rounded-full bg-ink" />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { links, cta } = siteConfig.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-paper/85 backdrop-blur-xl transition-colors duration-300",
        scrolled || open ? "border-line" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 w-[var(--content)] items-center justify-between md:h-[72px]">
        <a
          href="#top"
          aria-label={`${siteConfig.name} home`}
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-text"
        >
          <Mark />
          <span className="display text-[22px] leading-none text-text">{siteConfig.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-text-mid outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={cta.href}
          className="group hidden h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-[14px] font-semibold text-on-ink outline-none transition-colors hover:bg-ink-raised focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 md:inline-flex"
        >
          {cta.label}
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45">
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </span>
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-ink pl-4 pr-1 text-[14px] font-semibold text-on-ink outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-paper text-ink">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper md:hidden">
        <ul className="mx-auto w-[var(--content)] py-3">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="display block border-b border-line py-4 text-[28px] text-text outline-none focus-visible:ring-2 focus-visible:ring-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center rounded-full bg-flame text-[16px] font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2"
            >
              {cta.label}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
