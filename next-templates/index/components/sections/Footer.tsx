"use client";
import { site } from "@/site.config";
import { Mark } from "@/components/ui/Mark";
import { useMotion } from "@/components/motion/MotionProvider";
export function Footer() {
  const { enabled, toggle, systemReduced } = useMotion();
  return (
    <footer className="footer container">
      <div className="footer__top">
        <a className="brand" href="#top">
          <Mark />
          {site.brand}
          <span className="brand__dot">.</span>
        </a>
        <nav aria-label="Footer navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#examples">Examples</a>
          <a href="#pricing">Pricing</a>
          <a href={site.links.docs || "#questions"}>
            {site.links.docs ? "Documentation" : "Questions"}
          </a>
          {site.links.email && (
            <a href={`mailto:${site.links.email}`}>Contact</a>
          )}
        </nav>
      </div>
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.brand}. A place for your thinking.
        </p>
        <button
          className="motion-toggle"
          onClick={toggle}
          disabled={systemReduced}
          aria-pressed={!enabled}
        >
          <span aria-hidden="true" />
          {systemReduced
            ? "Reduced motion"
            : enabled
              ? "Motion on"
              : "Motion paused"}
        </button>
      </div>
    </footer>
  );
}
