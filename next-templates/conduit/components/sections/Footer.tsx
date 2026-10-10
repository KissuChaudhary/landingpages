import { site } from "@/site.config";
import { href, route } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { Button, Frame, Label } from "../ui/Primitives";
export function Footer() {
  return (
    <footer className="footer dark">
      <Frame className="closing">
        <span className="junction is-live closing-port" aria-hidden="true" />
        <div className="closing-copy">
          <Label>{site.closing.label}</Label>
          <h2>{site.closing.title}</h2>
        </div>
        <div className="closing-aside">
          <p>{site.closing.description}</p>
          <div className="button-row">
            <Button variant="light" href={site.links.app || href("/#route")}>
              {site.closing.primary}
            </Button>
            <Button variant="outline" href={route("/pricing")}>
              {site.closing.secondary}
            </Button>
          </div>
        </div>
      </Frame>
      <Frame className="footer-links">
        <div className="footer-brand">
          <a href={route("/")} aria-label={`${site.brand} home`}>
            <Brand />
          </a>
          <p>{site.footer.description}</p>
        </div>
        {site.footer.groups.map((group) => (
          <div className="footer-group" key={group.title}>
            <p className="mono">{group.title}</p>
            {group.links.map((link) => (
              <a href={href(link.href)} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </Frame>
      <Frame className="footer-mark">
        <svg viewBox="0 0 1200 230" aria-hidden="true">
          <text x="600" y="186" textLength="1150" lengthAdjust="spacingAndGlyphs" className="mark-outline">
            {site.brand}
          </text>
          <text x="600" y="186" textLength="1150" lengthAdjust="spacingAndGlyphs" className="mark-signal">
            {site.brand}
          </text>
        </svg>
        <div className="footer-bottom mono">
          <span>{site.footer.copyright}</span>
          <span>Built for the possibilities ahead.</span>
        </div>
      </Frame>
    </footer>
  );
}
