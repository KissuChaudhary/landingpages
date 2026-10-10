import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand, Spark } from "../ui/Brand";
import { Arrow } from "../ui/Arrow";
export function Footer() {
  return (
    <footer className="footer dark-section">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow">
              <Spark />
              An open line.
            </p>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
              <Arrow />
            </a>
            <span className="footer-location">{site.location}</span>
          </div>
          <nav aria-label="Footer navigation">
            <a href={href("/work")}>Work</a>
            <a href={href("/#services")}>Services</a>
            <a href={href("/#process")}>Process</a>
            <a href={href("/journal")}>Journal</a>
            <a href={href("/contact")}>Contact</a>
            {site.links.instagram && (
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Arrow />
              </a>
            )}
            {site.links.linkedin && (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Arrow />
              </a>
            )}
          </nav>
        </div>
        <a
          className="footer-wordmark"
          href={href("/")}
          aria-label={`${site.brand} home`}
        >
          <Brand />
        </a>
        <div className="footer-bottom">
          <span>
            © {site.copyrightYear} {site.brand} studio
          </span>
          <span className="footer-slogan">
            Independent minds. Uncommon outcomes.
          </span>
          <div>
            <a href={href("/privacy")}>Privacy</a>
            <a href={href("/terms")}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
