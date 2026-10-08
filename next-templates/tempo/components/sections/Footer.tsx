import { Brand } from "@/components/ui/Brand";
import { site } from "@/site.config";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div>
          <Brand />
          <p>{site.brand.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#rhythm">Your rhythm</a>
          <a href="#membership">Membership</a>
          <a href="#questions">Questions</a>
          <a href={`mailto:${site.links.email}`}>Say hello ↗</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          © {site.brand.year} {site.brand.name}. A fictional app demonstration.
        </p>
        <span className="mono">LESS RUSH. MORE RHYTHM.</span>
        <a href="#top">Back to the little beginning ↑</a>
      </div>
    </footer>
  );
}
