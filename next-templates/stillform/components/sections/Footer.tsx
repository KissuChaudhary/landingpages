import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { BrandMark } from "@/components/ui/Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p>{site.footer.statement}</p>
          <a href="#top">
            {site.footer.backToTop}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-wordmark" aria-label={site.brand.name}>
          {site.brand.name}
          <span>.</span>
          <BrandMark />
        </div>
        <div className="footer-bottom">
          <span>{site.brand.copyright}</span>
          <span>{site.brand.location}</span>
          <span>{site.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
