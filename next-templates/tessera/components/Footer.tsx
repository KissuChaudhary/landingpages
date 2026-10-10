import { site } from "@/site.config";
import { href } from "@/lib/links";
import { Button, Eyebrow, Mark, Title } from "./ui";
export function Footer() {
  return (
    <footer className="footer dark" data-scene>
      <div className="closing section">
        <Eyebrow>{site.closing.eyebrow}</Eyebrow>
        <Title lines={site.closing.title} />
        <div className="closing-bottom">
          <p>{site.closing.body}</p>
          <Button to={site.links.booking}>{site.closing.action}</Button>
        </div>
      </div>
      <div className="footer-links">
        <a href={`mailto:${site.email}`}>
          {site.email} <span>↗</span>
        </a>
        <div>
          {site.nav.map((item) => (
            <a key={item.label} href={href(item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <a href={href("/privacy")}>Privacy</a>
          <a href={href("/terms")}>Terms</a>
          <a href={href("/")}>Back to the beginning ↑</a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        <Mark />
        <span>{site.brand}</span>
      </div>
      <div className="footer-base mono">
        <span>
          © {new Date().getFullYear()} {site.footer.copyright}
        </span>
        <span>{site.footer.sample}</span>
        <span>{site.footer.line}</span>
      </div>
    </footer>
  );
}
