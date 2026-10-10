"use client";

import * as React from "react";
import { site } from "@/site.config";
import { bookingHref } from "@/lib/links";
import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { PauseButton, useMotion } from "@/components/motion/MotionProvider";

/*
 * HEADER: one bar for the whole page.
 *   top      sits on the hero with no edge
 *   scrolled tightens a little and gains a hairline; the link for the section
 *            you're reading is underlined
 *   links    an underline glides to the link under the pointer, then back
 *   phones   the bar grows down into the menu (no overlay); Escape or a link
 *            closes it and gives focus back
 * The pause button stops every loop on the page and stays within reach.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function Header() {
  const { reduced } = useMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>();
  const [line, setLine] = React.useState({ left: 0, width: 0, ready: false });
  const listRef = React.useRef<HTMLUListElement>(null);
  const menuButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section in view.
  React.useEffect(() => {
    const sections = site.nav.links.map((l) => document.getElementById(l.href.slice(1))).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // The underline rests under the section in view, and follows the pointer.
  const place = React.useCallback((el: HTMLElement | null) => {
    if (!el) return setLine((l) => ({ ...l, width: 0 }));
    setLine((l) => ({ left: el.offsetLeft + 14, width: el.offsetWidth - 28, ready: l.width > 0 }));
  }, []);
  const rest = React.useCallback(() => {
    const el = active ? listRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    place(el ?? null);
  }, [active, place]);
  React.useEffect(rest, [rest]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-[border-color] duration-300 ${scrolled || open ? "border-line" : "border-transparent"}`}
    >
      <div className={`mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 ${scrolled ? "h-[62px]" : "h-[76px]"}`}>
        <Brand />
        <nav aria-label="Main" className="max-[899px]:hidden">
          <ul ref={listRef} className="relative flex items-center" onPointerLeave={rest}>
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onPointerEnter={(e) => place(e.currentTarget)}
                  onFocus={(e) => place(e.currentTarget)}
                  onBlur={rest}
                  aria-current={active === link.href.slice(1) ? "location" : undefined}
                  className="flex h-10 items-center px-3.5 text-[14.5px] font-[480] text-ink/70 transition-colors duration-300 hover:text-ink aria-[current]:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 left-0 h-[2px] rounded-full bg-berry"
              style={{
                width: line.width,
                transform: `translateX(${line.left}px)`,
                opacity: line.width ? 1 : 0,
                transition: reduced ? "none" : `opacity 240ms ${EASE}${line.ready ? `, transform 460ms ${EASE}, width 460ms ${EASE}` : ""}`,
              }}
            />
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <PauseButton className="max-[899px]:hidden" />
          <Button href={bookingHref()} size="sm" className="max-[379px]:hidden">
            {site.nav.cta}
          </Button>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-10 place-items-center rounded-full border border-line min-[900px]:hidden"
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute h-[1.6px] w-4 rounded-full bg-ink"
                style={{ transform: open ? `rotate(${i ? -45 : 45}deg)` : `translateY(${i ? 3 : -3}px)`, transition: `transform 420ms ${EASE}` }}
              />
            ))}
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className="grid min-[900px]:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 520ms ${EASE}` }}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="px-4 pb-5 sm:px-6">
            {site.nav.links.map((link, i) => (
              <li
                key={link.href}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(-8px)",
                  transition: `opacity 360ms ${EASE} ${open ? 60 + i * 45 : 0}ms, transform 520ms ${EASE} ${open ? 60 + i * 45 : 0}ms`,
                }}
              >
                <a href={link.href} onClick={() => setOpen(false)} className="display flex h-14 items-center justify-between border-b border-line text-[30px] text-ink">
                  {link.label}
                  <span className="label text-subtle">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between gap-3 pt-5">
              <Button href={bookingHref()} className="flex-1">
                {site.nav.cta}
              </Button>
              <PauseButton />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
