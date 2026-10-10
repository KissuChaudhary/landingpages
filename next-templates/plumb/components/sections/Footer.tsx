"use client";

import * as React from "react";
import { site } from "@/site.config";
import { NumberRoll } from "@/components/hairline/number-roll";
import { Wordmark } from "@/components/ui/Brand";
import { SmartLink } from "@/components/ui/Primitives";

/*
 * FOOTER: links, then a clock of the time you've spent on this page. It counts only
 * while the tab is visible, ticks on the second and rolls like an odometer, and the
 * line beside it says what an analytics product should: we counted you once, without
 * a cookie. Columns with an empty href are left out.
 */

function useTimeOnPage() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    let spent = 0;
    let since = document.visibilityState === "visible" ? performance.now() : 0;
    let timer = 0;
    const elapsed = () => spent + (since ? performance.now() - since : 0);
    const tick = () => {
      const ms = elapsed();
      setSeconds(Math.floor(ms / 1000));
      if (since) timer = window.setTimeout(tick, 1000 - (ms % 1000) + 8);
    };
    const onVisibility = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === "visible") {
        since = performance.now();
        tick();
      } else {
        spent = elapsed();
        since = 0;
      }
    };
    tick();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return seconds;
}

export function Footer() {
  const { footer, links, brand } = site;
  const seconds = useTimeOnPage();
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  const year = new Date().getFullYear();
  const spoken = `${minutes} minute${minutes === 1 ? "" : "s"} and ${rest} second${rest === 1 ? "" : "s"}`;

  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <SmartLink to="/" aria-label={`${brand.name} home`}>
            <Wordmark />
          </SmartLink>
          <p>{site.meta.description}</p>
          {links.status ? (
            <a className="footer-status" href={links.status} target="_blank" rel="noopener noreferrer">
              <i aria-hidden="true" />
              {footer.status}
            </a>
          ) : null}
        </div>
        {footer.columns.map((col) => {
          const items = col.links.filter((l) => l.href);
          if (!items.length) return null;
          return (
            <nav key={col.title} className="footer-col" aria-label={col.title}>
              <p>{col.title}</p>
              <ul>
                {items.map((l) => (
                  <li key={l.label}>
                    <SmartLink to={l.href} className="text-link">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })}
      </div>

      <div className="wrap footer-clock">
        <p className="footer-clock-label">{footer.clock.label}</p>
        <p className="footer-time" aria-hidden="true">
          <NumberRoll value={minutes} format={{ minimumIntegerDigits: 2 }} direction="up" duration={650} locales={site.locale} />
          <span className="footer-colon">:</span>
          <NumberRoll value={rest} format={{ minimumIntegerDigits: 2 }} direction="up" duration={650} locales={site.locale} />
        </p>
        <p className="footer-clock-text">
          {footer.clock.before} <span className="sr-only">{spoken}</span>
          <span aria-hidden="true">{minutes ? `${minutes}m ${rest}s` : `${rest} seconds`}</span>. {footer.clock.after}
        </p>
      </div>

      <div className="wrap footer-base">
        <span>
          © {year} {brand.legal} · {brand.city}
        </span>
        <a className="footer-up" href="#main">
          Back to top
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 10V2.5M2.5 6 6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
