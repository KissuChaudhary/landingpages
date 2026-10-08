import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#top" aria-label={`${site.brand.name} home`}>
            <Brand small />
          </a>
          <p>{site.brand.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#questions">Questions</a>
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${site.links.email}`}>
            {site.footer.contact}
            <ArrowUpRight size={14} />
          </a>
          {site.links.docs && (
            <a href={site.links.docs}>
              {site.footer.docs}
              <ArrowUpRight size={14} />
            </a>
          )}
          <span>{site.footer.fictional}</span>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        {site.brand.name}
        <span>+</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {site.brand.year} {site.brand.name}.
        </span>
        <span>GOOD IDEAS / GOOD BEGINNINGS</span>
        <a href="#top">
          {site.footer.top}
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
