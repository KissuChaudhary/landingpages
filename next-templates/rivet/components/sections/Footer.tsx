"use client";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { useMotion } from "../MotionProvider";
import { Mark, Arrow } from "../ui/Mark";
export function Footer() {
  const { enabled, systemReduced, toggle } = useMotion();
  return (
    <footer className="footer section-wrap">
      <div className="footer-top">
        <a href={route("/contact")} className="footer-invite">
          A new idea?
          <br />
          <span>We’re all ears.</span>
          <Arrow diagonal />
        </a>
        <div className="footer-nav">
          <nav aria-label="Footer navigation">
            {site.navigation.map((n) => (
              <a key={n.label} href={route(n.href)}>
                {n.label}
              </a>
            ))}
          </nav>
          <div>
            <span className="label-type">Find us</span>
            <p>{site.location}</p>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.links.instagram && (
              <a href={site.links.instagram}>Instagram ↗</a>
            )}
            {site.links.linkedin && (
              <a href={site.links.linkedin}>LinkedIn ↗</a>
            )}
          </div>
        </div>
      </div>
      <a
        href={route("/")}
        className="footer-wordmark"
        aria-label={`${site.brand} home`}
      >
        <Mark />
        <span>
          {site.brand.toLowerCase()}
          <sup>®</sup>
        </span>
      </a>
      <div className="footer-bottom label-type">
        <span>
          © {site.copyrightYear} {site.brand} Studio
        </span>
        <span>Thoughtfully made. Together.</span>
        <a href={route("/privacy")}>Privacy</a>
        <button
          onClick={toggle}
          disabled={systemReduced}
          aria-pressed={enabled}
        >
          {systemReduced
            ? "Reduced motion"
            : `Motion ${enabled ? "on" : "off"}`}
          <span className={`motion-switch ${enabled ? "on" : ""}`} />
        </button>
        <a href="#main" aria-label="Back to top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
