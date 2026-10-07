"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button, OutlineButton } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

/** The wordmark: the serif name, with a small orange mark that nods to the number. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 font-serif text-[1.625rem] font-semibold leading-none tracking-tight text-ink ${className ?? ""}`}>
      <span aria-hidden className="flex size-7 items-center justify-center rounded-lg bg-flame font-sans text-[11px] font-bold tracking-normal text-ink">
        14
      </span>
      {siteConfig.name}
    </span>
  );
}

/**
 * A floating bar that stays at the top. The links are separated by small dots, the centre carries an availability
 * chip, and the call to action is the quiet outlined button.
 */
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
    <header className="sticky top-2 z-50 px-2 pt-2 sm:top-3 sm:px-5 sm:pt-3">
      <div className="mx-auto max-w-[1180px] rounded-2xl border border-line bg-card/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-[68px] sm:px-5">
          <a href="#top" aria-label={`${siteConfig.name}, home`} className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-flame">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-3 lg:flex">
            {nav.links.map((link, index) => (
              <span key={link.href} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden className="size-1 rounded-full bg-line-strong" /> : null}
                <a href={link.href} className="rounded-md px-1 text-[14px] font-medium text-ink-mid transition-colors hover:text-ink">
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="hidden items-center gap-2 rounded-full border border-line bg-wash px-3 py-1.5 text-[12px] font-medium text-ink-mid xl:flex">
              <span aria-hidden className="size-1.5 animate-[blink_2s_ease-in-out_infinite] rounded-full bg-good" />
              {nav.availability}
            </span>
            <a href={nav.login.href} className="text-[14px] font-medium text-ink-mid transition-colors hover:text-ink">
              {nav.login.label}
            </a>
            <OutlineButton href={nav.cta.href}>{nav.cta.label}</OutlineButton>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-xl text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open ? (
          <div id="mobile-menu" className="border-t border-line px-4 pb-5 pt-2 lg:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex h-12 items-center border-b border-line text-[16px] font-medium text-ink">
                  {link.label}
                </a>
              ))}
              <Button href={nav.cta.href} onClick={() => setOpen(false)} className="mt-5 h-12 w-full text-[16px]">
                {nav.cta.label}
              </Button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
