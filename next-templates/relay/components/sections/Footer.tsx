import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
export function Footer() {
  return (
    <footer className="grid-section"><div className="footer grid-inner">
      <div>
        <Brand />
        <p>{site.footer.statement}</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="#workspace">Workspace</a>
        <a href="#questions">Questions</a>
        {site.links.docs && <a href={site.links.docs}>Documentation</a>}
        <a href={`mailto:${site.links.email}`}>Say hello</a>
      </nav>
      <div className="footer-note">
        <span>{site.footer.note}</span>
        <span>
          © {new Date().getFullYear()} {site.brand}
        </span>
      </div>
    </div></footer>
  );
}
