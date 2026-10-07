"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** The wordmark: a lime tick inside a pine square, then the name. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" aria-hidden className="size-7">
        <rect width="28" height="28" rx="7" fill={light ? "#cdee8a" : "#0f2a21"} />
        <path d="M8 14.5l4 4 8-9" fill="none" stroke={light ? "#0f2a21" : "#cdee8a"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`display text-[1.75rem] leading-none ${light ? "text-on-pine" : "text-ink"}`}>{siteConfig.name}</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { nav } = siteConfig;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" aria-label={`${siteConfig.name}, home`} className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-moss">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] text-ink-mid transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href={nav.login.href} className="text-[15px] text-ink-mid transition-colors hover:text-ink">
            {nav.login.label}
          </a>
          <Button href={nav.cta.href} className="h-10 px-5">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-lg text-ink md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-3">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center border-b border-line text-[17px] text-ink"
                >
                  {link.label}
                </a>
              ))}
              <Button href={nav.cta.href} onClick={() => setOpen(false)} className="mt-5 w-full">
                {nav.cta.label}
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
