"use client";

import { Menu, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`flex size-9 items-center justify-center rounded-[11px] ${light ? "bg-orange text-ink" : "bg-ink text-white"}`}>
        <Share2 className="size-[18px]" strokeWidth={2.25} />
      </span>
      <span className={`display text-[1.375rem] leading-none ${light ? "text-on-night" : "text-ink"}`}>{siteConfig.name}</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { nav } = siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors ${scrolled || open ? "border-line" : "border-transparent"}`}>
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" aria-label={`${siteConfig.name}, home`} className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-orange">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] font-medium text-ink-mid transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={nav.cta.href}
          className="hidden h-11 items-center gap-2.5 rounded-full border border-line-strong bg-sheet py-1 pl-1.5 pr-5 text-[15px] font-semibold text-ink outline-none transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-orange lg:inline-flex"
        >
          <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-orange text-[13px] font-bold text-ink">
            {siteConfig.name.slice(0, 1)}
          </span>
          {nav.cta.label}
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-3">
              {nav.links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex h-12 items-center border-b border-line text-[17px] font-medium text-ink">
                  {link.label}
                </a>
              ))}
              <a href={nav.cta.href} onClick={() => setOpen(false)} className="mt-5 flex h-14 items-center justify-center rounded-full bg-ink text-[16px] font-semibold text-white">
                {nav.cta.label}
              </a>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
