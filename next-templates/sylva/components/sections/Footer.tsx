import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "../ui/Brand";
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-intro">
            <Brand />
            <p>
              {site.footer.note}
              <br />
              {site.footer.small}
            </p>
          </div>
          <div className="footer-links">
            <p className="eyebrow">Explore</p>
            <a href={href("/about")}>Our approach</a>
            <a href={href("/collection")}>The collection</a>
            <a href={href("/#spaces")}>Our spaces</a>
          </div>
          <div className="footer-links">
            <p className="eyebrow">Keep growing</p>
            <a href={href("/care")}>Plant care</a>
            <a href={href("/contact")}>
              Project enquiries
              <ArrowUpRight size={14} />
            </a>
            {site.links.email && (
              <a href={`mailto:${site.links.email}`}>{site.links.email}</a>
            )}
            {site.links.instagram && (
              <a href={site.links.instagram} target="_blank" rel="noreferrer">
                Instagram
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {site.brand.toLowerCase()}
          <span>✳</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {site.copyrightYear} {site.brand} Botanical Interiors
          </span>
          <a href={href("/privacy")}>Privacy</a>
        </div>
      </div>
    </footer>
  );
}
