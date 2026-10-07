"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/site.config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { nav, name } = siteConfig;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-[var(--frame)] items-center justify-between px-6 md:px-12">
        <a href="#top" className="display text-[1.5rem] leading-none text-text outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {name}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] text-text-mid transition-colors hover:text-text">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={nav.login.href} className="text-[15px] text-text-mid transition-colors hover:text-text">
            {nav.login.label}
          </a>
          <Button href={nav.cta.href} className="h-10">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-lg text-text md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex w-[var(--frame)] flex-col px-6 py-4">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center border-b border-line text-[17px] text-text"
              >
                {link.label}
              </a>
            ))}
            <Button href={nav.cta.href} onClick={() => setOpen(false)} className="mt-5 w-full">
              {nav.cta.label}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
