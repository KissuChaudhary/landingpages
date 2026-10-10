import { site } from "@/site.config";
import { contact } from "@/lib/links";
import { Arrow, Brand, Button, Label, Star } from "../ui";
export function Closing() {
  return (
    <section className="closing wrap" aria-labelledby="closing-title">
      <div>
        <Label>{site.closing.eyebrow}</Label>
        <h2 id="closing-title" data-reveal>
          {site.closing.title[0]}
          <br />
          {site.closing.title[1]}
        </h2>
        <div className="closing-actions">
          <Button href={contact()}>{site.closing.cta}</Button>
          <p>{site.closing.note}</p>
        </div>
      </div>
      <Star className="closing-star" />
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Brand />
          <p>{site.footer.note}</p>
        </div>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${site.links.email}`}>
            {site.links.email}
            <Arrow diagonal size={17} />
          </a>
          <span>{site.footer.location}</span>
          {site.links.instagram && (
            <a href={site.links.instagram}>
              Instagram <Arrow diagonal size={14} />
            </a>
          )}
          {site.links.linkedin && (
            <a href={site.links.linkedin}>
              LinkedIn <Arrow diagonal size={14} />
            </a>
          )}
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        {site.brand.toLowerCase()}
        <Star />
      </div>
      <div className="footer-bottom">
        <span>
          © {site.year} {site.brand}
        </span>
        <span>{site.footer.tagline}</span>
        <a href="#top">
          Back to top <Arrow diagonal size={13} />
        </a>
      </div>
    </footer>
  );
}
