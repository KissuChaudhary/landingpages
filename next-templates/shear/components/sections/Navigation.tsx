"use client";

import * as React from "react";
import { site } from "@/site.config";
import { Brand, Mark } from "@/components/ui/Brand";
import { Pill } from "@/components/ui/Pill";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * NAVIGATION
 *   hero      the full bar sits inside the dark frame
 *   floating  once that bar scrolls away, a compact one slides down from
 *             the top and marks the section you're reading
 *   links     a soft highlight glides to the link under the pointer
 *   phone     the menu button grows the bar into a panel (no overlay);
 *             Escape or a link closes it and gives focus back
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

function NavLinks({ active, compact = false }: { active?: string; compact?: boolean }) {
  const listRef = React.useRef<HTMLUListElement>(null);
  const [glow, setGlow] = React.useState<{ left: number; width: number; on: boolean; ready: boolean }>({ left: 0, width: 0, on: false, ready: false });
  const point = (el: HTMLElement) => setGlow((g) => ({ left: el.offsetLeft, width: el.offsetWidth, on: true, ready: g.on }));
  return (
    <ul ref={listRef} className="relative flex items-center" onPointerLeave={() => setGlow((g) => ({ ...g, on: false, ready: false }))}>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 rounded-full bg-white/[0.08]"
        style={{
          width: glow.width,
          transform: `translateX(${glow.left}px)`,
          opacity: glow.on ? 1 : 0,
          transition: `opacity 240ms ${EASE}${glow.ready ? `, transform 420ms ${EASE}, width 420ms ${EASE}` : ""}`,
        }}
      />
      {site.nav.links.map((link) => {
        const current = active === link.href.slice(1);
        return (
          <li key={link.href}>
            <a
              href={link.href}
              onPointerEnter={(e) => point(e.currentTarget)}
              onFocus={(e) => point(e.currentTarget)}
              aria-current={current ? "location" : undefined}
              className={`relative flex items-center rounded-full font-[480] text-white/70 transition-colors duration-300 hover:text-white ${
                compact ? "h-9 px-3 text-[13px]" : "h-10 px-3.5 text-[14px]"
              } ${current ? "text-white" : ""}`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mint transition-[opacity,scale] duration-500"
                style={{ opacity: current ? 1 : 0, scale: current ? "1" : "0" }}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function MenuButton({ open, onClick, controls }: { open: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 md:hidden"
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-[1.5px] w-4 rounded-full bg-current"
          style={{
            transform: open ? `rotate(${i ? -45 : 45}deg)` : `translateY(${i ? 3 : -3}px)`,
            transition: `transform 420ms ${EASE}`,
          }}
        />
      ))}
    </button>
  );
}

/** The panel the bar grows into on phones. */
function MenuPanel({ id, open, onNavigate }: { id: string; open: boolean; onNavigate: () => void }) {
  return (
    <div
      id={id}
      className="grid md:hidden"
      style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 520ms ${EASE}` }}
      inert={!open}
    >
      <div className="min-h-0 overflow-hidden">
        <ul className="flex flex-col px-2 pb-2 pt-3">
          {site.nav.links.map((link, i) => (
            <li
              key={link.href}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(-6px)",
                filter: open ? "none" : "blur(4px)",
                transition: `opacity 360ms ${EASE} ${open ? 80 + i * 40 : 0}ms, transform 520ms ${EASE} ${open ? 80 + i * 40 : 0}ms, filter 360ms ${EASE} ${open ? 80 + i * 40 : 0}ms`,
              }}
            >
              <a href={link.href} onClick={onNavigate} className="flex h-12 items-center justify-between border-b border-white/[0.07] px-2 text-[19px] font-[460] tracking-[-0.02em] text-white">
                {link.label}
                <span aria-hidden="true" className="text-[13px] text-white/35">
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
          {site.nav.login.href && (
            <li>
              <a href={site.nav.login.href} className="flex h-12 items-center px-2 text-[15px] text-white/60">
                {site.nav.login.label}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function useMenu() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.querySelector("button")?.focus();
    };
    const close = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [open]);
  return { open, setOpen, buttonRef };
}

/** The bar inside the hero's dark frame. */
export function HeroNav({ sentinelRef }: { sentinelRef: React.Ref<HTMLDivElement> }) {
  const { open, setOpen, buttonRef } = useMenu();
  return (
    <div ref={sentinelRef} className="relative z-20 px-4 pt-4 md:px-7 md:pt-5">
      <nav aria-label="Main" className="flex h-12 items-center justify-between gap-4">
        <Brand className="text-white" />
        <div className="max-md:hidden">
          <NavLinks />
        </div>
        <div ref={buttonRef} className="flex items-center gap-2">
          {site.nav.login.href && (
            <a href={site.nav.login.href} className="px-3 text-[14px] font-[480] text-white/70 transition-colors hover:text-white max-md:hidden">
              {site.nav.login.label}
            </a>
          )}
          <Pill href={site.nav.cta.href} size="sm" className="max-[380px]:hidden">
            {site.nav.cta.label}
          </Pill>
          <MenuButton open={open} onClick={() => setOpen(!open)} controls="hero-menu" />
        </div>
      </nav>
      <MenuPanel id="hero-menu" open={open} onNavigate={() => setOpen(false)} />
    </div>
  );
}

/** The compact bar that takes over once the hero's bar has scrolled away. */
export function FloatingNav({ show }: { show: boolean }) {
  const { open, setOpen, buttonRef } = useMenu();
  const { reduced } = useMotion();
  const [active, setActive] = React.useState<string>();

  // Marks the section in view.
  React.useEffect(() => {
    const ids = site.nav.links.map((l) => l.href.slice(1)).filter(Boolean);
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!show) setOpen(false);
  }, [show, setOpen]);

  return (
    <div
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      style={{
        transform: show ? "none" : "translateY(-140%)",
        opacity: show ? 1 : 0,
        transition: reduced ? "none" : `transform 620ms ${EASE}, opacity 400ms ${EASE}`,
      }}
      inert={!show}
    >
      <div className="tone-dark w-full max-w-[860px] overflow-hidden rounded-[26px] border border-white/10 bg-ink p-1.5 text-white">
        <nav aria-label="Main" className="flex h-10 items-center justify-between gap-3 pl-2">
          <a href="#top" className="brand grid size-8 place-items-center" aria-label={`${site.brand.name}, back to top`}>
            <Mark className="size-[22px] text-mint" />
          </a>
          <div className="max-md:hidden">
            <NavLinks active={active} compact />
          </div>
          <div ref={buttonRef} className="flex items-center gap-1.5">
            <Pill href={site.nav.cta.href} size="sm">
              {site.nav.cta.label}
            </Pill>
            <MenuButton open={open} onClick={() => setOpen(!open)} controls="floating-menu" />
          </div>
        </nav>
        <MenuPanel id="floating-menu" open={open} onNavigate={() => setOpen(false)} />
      </div>
    </div>
  );
}
