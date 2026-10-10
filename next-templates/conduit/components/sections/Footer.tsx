"use client";
import { site } from "@/site.config";
import { href, route } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { Button, Frame, Label } from "../ui/Primitives";
export function Footer() {
  return (
    <footer className="footer dark">
      <Frame className="closing">
        <div>
          <Label>{site.closing.label}</Label>
          <h2>{site.closing.title}</h2>
        </div>
        <div>
          <p>{site.closing.description}</p>
          <div className="button-row">
            <Button variant="light" href={site.links.app || href("/#solution")}>
              {site.closing.primary}
            </Button>
            <Button variant="outline" href={route("/pricing")}>
              {site.closing.secondary}
            </Button>
          </div>
        </div>
        <div className="closing-pixels" aria-hidden="true" />
      </Frame>
      <div className="footer-links">
        <div className="footer-brand">
          <a href={route("/")} aria-label={`${site.brand} home`}>
            <Brand />
          </a>
          <p>{site.footer.description}</p>
          <span>{site.footer.copyright}</span>
        </div>
        {site.footer.groups.map((group) => (
          <div className="footer-group" key={group.title}>
            <p>{group.title}</p>
            {group.links.map((link) => (
              <a href={href(link.href)} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Built for the possibilities ahead.</span>
      </div>
      <div className="pixel-wordmark" aria-hidden="true">
        <svg viewBox="0 0 1200 240">
          <defs>
            <pattern
              id="footer-pixels"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
            >
              <rect width="4.8" height="4.8" fill="#222326" />
            </pattern>
            <pattern
              id="footer-sparks"
              width="79"
              height="61"
              patternUnits="userSpaceOnUse"
            >
              <rect x="7" y="14" width="4.8" height="4.8" fill="#5580ff" />
              <rect x="35" y="42" width="4.8" height="4.8" fill="#1746ff" />
            </pattern>
          </defs>
          <text
            x="600"
            y="194"
            textAnchor="middle"
            textLength="1090"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-pixels)"
          >
            {site.brand}
          </text>
          <text
            className="wordmark-sparks"
            x="600"
            y="194"
            textAnchor="middle"
            textLength="1090"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-sparks)"
          >
            {site.brand}
          </text>
        </svg>
      </div>
    </footer>
  );
}
