import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action } from "../ui/Action";
export function Hero() {
  const [before, after] = site.hero.lineTwo.split(site.hero.highlight);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-head section-wrap">
        <div className="hero-meta label-type">
          <span>
            <span className="status-dot" />
            {site.availability}
          </span>
          <span>{site.descriptor}</span>
          <span>{site.location}</span>
        </div>
        <h1 id="hero-title" className="hero-title" data-sheen="scroll">
          <span className="hero-line">
            <span className="hero-cut steel">{site.hero.lineOne}</span>
          </span>
          <span className="hero-line">
            <span className="hero-cut steel">
              {before}
              <em>{site.hero.highlight}</em>
              {after}
            </span>
          </span>
        </h1>
        <div className="hero-grid">
          <i className="rivet" aria-hidden="true" />
          <p className="hero-text">{site.hero.text}</p>
          <div className="hero-actions">
            <i className="rivet" aria-hidden="true" />
            <Action href={site.links.booking || "/contact"}>
              {site.hero.primary}
            </Action>
            <Action href="/#process" quiet>
              {site.hero.secondary}
            </Action>
          </div>
          <p className="hero-note">
            <i className="rivet" aria-hidden="true" />
            {site.hero.note}
          </p>
          <i className="rivet" aria-hidden="true" />
        </div>
      </div>
      <div className="hero-plate" data-open>
        <div className="hero-plate-image" data-drift>
          <img
            src={asset("/images/hero.webp")}
            alt="A brushed metal ribbon rising through a concrete space"
            fetchPriority="high"
          />
        </div>
        <div className="hero-caption label-type">
          <span>{site.hero.eyebrow}</span>
          <a href="#intro">
            Scroll <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
