"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ember-300" aria-label={`${siteConfig.name} home`}>
      <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-b from-ember-100 to-ember-400 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_6px_18px_-6px_color-mix(in_srgb,var(--color-ember-500)_70%,transparent)]">
        <span className="size-2.5 rounded-full bg-on-ember" />
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{siteConfig.name}</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { links, login, cta } = siteConfig.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-5">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex items-center justify-between rounded-full border backdrop-blur-xl transition-[max-width,background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          scrolled
            ? "max-w-3xl border-ember-200/15 bg-bg/80 py-2 pl-4 pr-2 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.9)] md:pl-5"
            : "max-w-6xl border-white/[0.07] bg-bg/40 py-3 pl-5 pr-3 md:pl-6",
        )}
      >
        <Logo />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14px] text-ink-mid outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={login.href}
            className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink-mid outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ember-300 md:block"
          >
            {login.label}
          </a>
          <Button href={cta.href} size="sm" className="hidden md:inline-flex">
            {cta.label}
          </Button>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ember-300 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/[0.08] bg-bg p-3 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.95)] backdrop-blur-xl md:hidden"
      >
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[16px] text-ink-mid outline-none transition-colors hover:bg-white/[0.05] hover:text-ink focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-3">
          <Button href={login.href} variant="secondary" size="sm" className="justify-center">
            {login.label}
          </Button>
          <Button href={cta.href} size="sm" className="justify-between">
            {cta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
