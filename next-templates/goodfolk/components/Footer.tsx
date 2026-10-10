import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Arrow, ButtonLink, Eyebrow, Mark, Multiline } from "./ui";
export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="closing wrapper">
        <div>
          <Eyebrow>{site.closing.eyebrow}</Eyebrow>
          <h2 data-reveal>
            <Multiline text={site.closing.title} />
          </h2>
        </div>
        <div className="closing-action">
          <div className="closing-symbol" aria-hidden="true">
            <Mark />
          </div>
          <ButtonLink light href={site.contactHref}>
            {site.closing.label}
          </ButtonLink>
        </div>
      </div>
      <div className="footer-info wrapper">
        <a className="footer-email" href={`mailto:${site.email}`}>
          {site.email}
          <Arrow diagonal />
        </a>
        <p>{site.location}</p>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <a key={item.label} href={route(item.href)}>
              {item.label}
            </a>
          ))}
          {site.socials.map((item) => (
            <a key={item.label} href={route(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom wrapper">
        <p>
          © {new Date().getFullYear()} {site.brand}
        </p>
        <span>
          <i />
          {site.availability}
        </span>
        <div>
          {site.legalLinks.map((item) => (
            <a key={item.label} href={route(item.href)}>
              {item.label}
            </a>
          ))}
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        {site.brand}
        <span>®</span>
      </div>
    </footer>
  );
}
