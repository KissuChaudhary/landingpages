"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

function Mark() {
  return (
    <span aria-hidden className="grid size-8 place-items-center rounded-full bg-ink text-on-ink">
      <span className="display text-[17px] italic leading-none">m</span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { links, cta } = siteConfig.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <div className="relative w-full max-w-[44rem]">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between rounded-full border bg-white/85 py-2 pl-3 pr-2 backdrop-blur-xl transition-shadow duration-300 md:pl-4",
            scrolled ? "border-line-strong shadow-lift" : "border-white/70 shadow-soft",
          )}
        >
          <a
            href="#top"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <Mark />
            <span className="display text-[21px] leading-none text-ink">{siteConfig.name}</span>
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-mid outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={cta.href}
            className="group hidden h-10 items-center gap-2 rounded-full bg-ink pl-5 pr-1.5 text-[14px] font-medium text-on-ink outline-none transition-colors hover:bg-[#2b2620] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:inline-flex"
          >
            {cta.label}
            <span aria-hidden className="grid size-7 place-items-center rounded-full bg-on-ink text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="size-3.5" strokeWidth={2.25} />
            </span>
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-ink pl-4 pr-1.5 text-[14px] font-medium text-on-ink outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden className="grid size-7 place-items-center rounded-full bg-on-ink/15">
              {open ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
            </span>
          </button>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className="mt-2 rounded-[1.75rem] border border-line-strong bg-paper-raised p-3 shadow-lift md:hidden"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block rounded-2xl px-4 py-3 text-[26px] text-ink outline-none hover:bg-sand/60 focus-visible:ring-2 focus-visible:ring-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-medium text-on-ink outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
