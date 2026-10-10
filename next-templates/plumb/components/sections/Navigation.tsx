"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import { signupHref } from "@/lib/links";
import { Wordmark } from "@/components/ui/Brand";
import { Roll, SmartLink } from "@/components/ui/Primitives";

/*
 * NAVIGATION: one bar, fixed to the top.
 *   scroll   transparent over the hero; a white bar with a hairline once you scroll
 *   glide    a hairline under the links glides to the one you point at, and rests on
 *            the section you're reading
 *   dock     "Start free" is where the tour's surface lands at the end; it gives a small
 *            nod when it arrives (html[data-docked])
 *   phones   Menu opens the bar downward into the links; Escape or a link closes it and
 *            focus goes back to the button
 */

const sectionOf = (href: string) => (href.includes("#") ? href.split("#")[1] : "");

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("");
  const [hover, setHover] = React.useState<string | null>(null);
  const [glide, setGlide] = React.useState<{ x: number; w: number; ready: boolean }>({ x: 0, w: 0, ready: false });
  const listRef = React.useRef<HTMLUListElement>(null);
  const menuButton = React.useRef<HTMLButtonElement>(null);
  const home = pathname === "/" || pathname.endsWith("/index.html");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section you're reading: the last one whose top has passed the upper third.
  React.useEffect(() => {
    if (!home) return;
    const ids = site.nav.map((l) => sectionOf(l.href)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id === "tour" ? "tour-section" : id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35 && el.getBoundingClientRect().bottom > window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [home]);

  // The hairline glides to the pointed or active link.
  const focusId = hover ?? active;
  React.useLayoutEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${focusId}"]`);
    if (!list || !link) {
      setGlide((g) => ({ ...g, w: 0 }));
      return;
    }
    setGlide((g) => ({ x: link.offsetLeft + 12, w: link.offsetWidth - 24, ready: g.ready || g.w > 0 }));
  }, [focusId]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-bar">
        <SmartLink to="/" className="nav-brand" aria-label={`${site.brand.name} home`}>
          <Wordmark />
        </SmartLink>

        <ul ref={listRef} className="nav-links" onPointerLeave={() => setHover(null)}>
          {site.nav.map((link) => {
            const id = sectionOf(link.href) || link.href;
            return (
              <li key={link.href}>
                <SmartLink
                  to={link.href}
                  data-id={id}
                  className={active === id ? "is-active" : ""}
                  aria-current={active === id ? "true" : undefined}
                  onPointerEnter={() => setHover(id)}
                  onFocus={() => setHover(id)}
                  onBlur={() => setHover(null)}
                >
                  {link.label}
                </SmartLink>
              </li>
            );
          })}
          <span
            className="nav-glide"
            aria-hidden="true"
            style={{ transform: `translateX(${glide.x}px) scaleX(${glide.w ? 1 : 0})`, width: glide.w || undefined, transition: glide.ready ? undefined : "none" }}
          />
        </ul>

        <div className="nav-actions">
          {site.links.login ? (
            <SmartLink to={site.links.login} className="nav-login">
              Log in
            </SmartLink>
          ) : null}
          <SmartLink to={signupHref()} className="nav-cta" data-nav-cta="">
            <Roll text={site.cta} />
          </SmartLink>
          <button
            ref={menuButton}
            type="button"
            className="nav-menu"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="nav-panel" className="nav-panel" inert={!open || undefined}>
        <div>
          <ul>
            {site.nav.map((link, i) => (
              <li key={link.href} style={{ "--i": i } as React.CSSProperties}>
                <SmartLink to={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </SmartLink>
              </li>
            ))}
            {site.links.login ? (
              <li style={{ "--i": site.nav.length } as React.CSSProperties}>
                <SmartLink to={site.links.login}>Log in</SmartLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  );
}
