"use client";

import { Pause, Play } from "lucide-react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { useMotion } from "../Motion";
import { Brand } from "../ui/Brand";

export function Footer() {
  const { footer, social, links } = site;
  const { paused, setPaused, reduced } = useMotion();
  const socials = social.filter((s) => s.href);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Brand />
            <p>{footer.blurb}</p>
            <a className="text-link" href={`mailto:${links.email}`}>
              {links.email}
            </a>
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
            {!reduced && (
              <button type="button" className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>
                <span className="motion-icon" aria-hidden="true">
                  <Pause size={12} strokeWidth={2.4} className={paused ? "" : "is-active"} />
                  <Play size={12} strokeWidth={2.4} className={paused ? "is-active" : ""} />
                </span>
                <span className="morph">
                  <span className={paused ? "" : "is-active"} aria-hidden={paused}>
                    Pause motion
                  </span>
                  <span className={paused ? "is-active" : ""} aria-hidden={!paused}>
                    Play motion
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
