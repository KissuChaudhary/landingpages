"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/ui/Chat";
import { Container } from "@/components/ui/Title";
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
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-rose">
          <Mark className="size-8" />
          <span className="display text-[1.5rem] leading-none text-ink">{name}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] font-medium text-ink-mid transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href={nav.login.href} className="text-[15px] font-medium text-ink-mid transition-colors hover:text-ink">
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
          className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-full text-ink md:hidden"
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
                  className="flex h-12 items-center border-b border-line text-[17px] font-medium text-ink"
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
