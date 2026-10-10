import { site } from "@/site.config";
import { contact, home } from "@/lib/links";
import { Arrow, Brand, Label } from "../ui";
export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="wrap">
        <Label>{site.closing.eyebrow}</Label>
        <h2 id="closing-title" data-reveal>
          {site.closing.title[0]}
          <br />
          <span>{site.closing.title[1]}</span>
        </h2>
        <div className="closing-bottom">
          <p>{site.closing.note}</p>
          <a href={contact()}>
            {site.closing.cta}
            <Arrow diagonal size={36} />
          </a>
        </div>
        <div className="closing-pencil" aria-hidden="true">
          <svg viewBox="0 0 800 70" fill="none">
            <path
              d="M6 48c97-19 373-28 608-31 136-2 165 5 164 12S469 55 179 50"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
export function Footer({ inner = false }: { inner?: boolean }) {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Brand inner={inner} />
          <p>{site.footer.note}</p>
        </div>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={`${inner ? home() : ""}${item.href}`}>
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
              Instagram
              <Arrow diagonal size={14} />
            </a>
          )}
          {site.links.linkedin && (
            <a href={site.links.linkedin}>
              LinkedIn
              <Arrow diagonal size={14} />
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {site.year} {site.brand}
        </span>
        <span>{site.footer.tagline}</span>
        <a href="#top">
          Back to top
          <Arrow diagonal size={13} />
        </a>
      </div>
    </footer>
  );
}
