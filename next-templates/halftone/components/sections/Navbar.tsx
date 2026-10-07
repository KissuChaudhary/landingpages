"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { EASE } from "@/components/motion/hooks";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";

/** A floating frosted bar that opens into a menu on small screens. */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center px-4 sm:top-5"
    >
      <nav aria-label="Primary" className="glass pointer-events-auto w-full max-w-5xl overflow-hidden rounded-[26px] border border-white/40 px-3 py-2 sm:px-4">
        <div className="flex h-9 items-center justify-between gap-4">
          <a href="#top" onClick={() => setIsOpen(false)} aria-label={`${site.brand.name} home`} className="shrink-0 pl-1">
            <BrandMark />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {site.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-semibold tracking-[0.1px] text-ink transition-colors hover:bg-black/[0.05]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={site.nav.signIn.href}
              className="hidden rounded-full px-3.5 py-1.5 text-[15px] font-semibold text-ink transition-colors hover:bg-black/[0.05] sm:inline-flex"
            >
              {site.nav.signIn.label}
            </a>
            <Button href={site.nav.cta.href} size="sm" className="hidden sm:inline-flex">
              {site.nav.cta.label}
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-black/[0.05] lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span className={cn("absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-all duration-300", isOpen ? "top-[5px] rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-all duration-300", isOpen ? "top-[5px] -rotate-45" : "top-[10px]")} />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-0.5 pb-2 pt-3">
                {site.nav.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-3 py-2.5 text-[17px] font-semibold text-ink transition-colors hover:bg-black/[0.05]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/[0.06] pt-4">
                  <Button href={site.nav.signIn.href} variant="secondary" onClick={() => setIsOpen(false)}>
                    {site.nav.signIn.label}
                  </Button>
                  <Button href={site.nav.cta.href} onClick={() => setIsOpen(false)}>
                    {site.nav.cta.label}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
