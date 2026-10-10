"use client";

import { useEffect, type CSSProperties } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { useInView } from "../Motion";
import { Mark } from "../ui/Brand";

export function Footer() {
  const { footer, social, links } = site;
  const [mark, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const socials = social.filter((s) => s.href);

  // Size the wordmark so it spans the container exactly, whatever the brand name.
  useEffect(() => {
    const el = mark.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "";
      const base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(base * box.clientWidth) / el.offsetWidth}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [mark]);

  return (
    <footer className="footer">
      <div className="container">
        <div ref={mark} className={`wordmark${inView ? " is-in" : ""}`} aria-hidden="true">
          <Mark className="wordmark-mark" size={28} />
          <span className="wordmark-text">
            {Array.from(site.brand).map((c, i, all) => (
              <span key={i} style={{ "--i": i, "--mix": `${Math.round((i / Math.max(1, all.length - 1)) * 100)}%` } as CSSProperties}>
                <span>{c}</span>
              </span>
            ))}
          </span>
        </div>

        <div className="footer-grid">
          <div className="footer-about">
            <p>{footer.blurb}</p>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="footer-title">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={href(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <div className="footer-end">
            {socials.length > 0 && (
              <ul className="footer-social">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
