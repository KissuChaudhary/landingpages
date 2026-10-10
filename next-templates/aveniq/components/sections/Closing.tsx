import { site } from "@/site.config";
import { asset, contact, sales } from "@/lib/links";
import { Brand, Button, Label, Mark } from "../ui";
export function Closing() {
  return (
    <section className="closing section-shell">
      <div className="closing-panel" data-reveal>
        <img
          src={asset("/images/flow.webp")}
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
          className="closing-image"
        />
        <div className="closing-copy">
          <Label>{site.closing.eyebrow}</Label>
          <h2>
            {site.closing.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="closing-actions">
            <Button href={contact()}>{site.closing.primary}</Button>
            <Button href={sales()} variant="secondary">
              {site.closing.secondary}
            </Button>
          </div>
        </div>
        <Mark className="closing-mark" />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer-top">
        <div className="footer-brand">
          <Brand />
          <p>{site.footer.description}</p>
        </div>
        <nav aria-label="Footer navigation">
          {site.navigation.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <span>A conversation starts here.</span>
          <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
          {site.links.linkedin && <a href={site.links.linkedin}>LinkedIn ↗</a>}
          {site.links.github && <a href={site.links.github}>GitHub ↗</a>}
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        {site.name.toLowerCase()}
        <span>↗</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.footer.note}</span>
        <a href="#main">Back to the top ↑</a>
      </div>
    </footer>
  );
}
