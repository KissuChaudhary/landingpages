import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { MotionControl } from "../Motion";
export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            {site.descriptor}
            <br />
            {site.location}
          </p>
        </div>
        <div>
          <span>Start a conversation</span>
          <a href={"mailto:" + site.email}>{site.email}</a>
          <p className="availability">
            <i />
            {site.availability}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={href("/work")}>Our work</a>
          <a href={href("/#approach")}>The approach</a>
          <a href={href("/journal")}>Journal</a>
          <a href={href("/contact")}>Contact</a>
          {site.links.linkedin && <a href={site.links.linkedin}>LinkedIn</a>}
          {site.links.instagram && <a href={site.links.instagram}>Instagram</a>}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {site.copyrightYear} {site.brand}
        </span>
        <div>
          <a href={href("/privacy")}>Privacy</a>
          <a href={href("/terms")}>Terms</a>
        </div>
        <MotionControl />
      </div>
    </footer>
  );
}
