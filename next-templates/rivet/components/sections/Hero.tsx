import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action } from "../ui/Action";
import { Mark } from "../ui/Mark";
export function Hero() {
  const [before, after] = site.hero.lineTwo.split(site.hero.highlight);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" data-drift>
        <img
          src={asset("/images/hero.webp")}
          alt="A brushed metal ribbon rising through a concrete space"
          fetchPriority="high"
        />
      </div>
      <div className="hero-frame">
        <div className="hero-rail">
          <span className="barcode" />
          <span>Independent by design</span>
          <span>Est. with intention</span>
        </div>
        <div className="hero-content">
          <p className="label-type hero-eyebrow">
            <span className="status-dot" />
            {site.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            <span className="hero-line">{site.hero.lineOne}</span>
            <span className="hero-line">
              {before}
              <mark>{site.hero.highlight}</mark>
              {after}
            </span>
          </h1>
          <p className="hero-text">{site.hero.text}</p>
          <div className="hero-actions">
            <Action href={site.links.booking || "/contact"}>
              {site.hero.primary}
            </Action>
            <Action href="/#process" quiet>
              {site.hero.secondary}
            </Action>
          </div>
        </div>
        <span className="hero-index label-type">Studio notes / 001</span>
        <div className="hero-note">
          <div>
            <Mark />
            <span className="label-type">{site.brand} studio</span>
            <p>{site.hero.note}</p>
            <span className="label-type">Design × Engineering</span>
          </div>
          <img
            src={asset("/images/studio.webp")}
            alt="Two designers considering a prototype"
          />
        </div>
        <a className="hero-scroll label-type" href="#intro">
          <span>Scroll to discover</span>
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}
