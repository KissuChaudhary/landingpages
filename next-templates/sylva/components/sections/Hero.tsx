import { ArrowDown, Sprout } from "lucide-react";
import { site } from "@/site.config";
import { asset, href } from "@/lib/urls";
import { Button, TextLink } from "../ui/Primitives";
export function HeroJourney() {
  return (
    <div className="hero-journey" data-journey>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-backdrop"
          src={asset(site.hero.backdrop)}
          alt=""
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="seed-dot" />
              {site.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              <span>{site.hero.lineOne}</span>
              <em>{site.hero.lineTwo}</em>
            </h1>
            <p className="hero-description">{site.hero.description}</p>
            <div className="hero-actions">
              <Button to="/#plants">{site.hero.primary}</Button>
              <a className="hero-secondary" href={href("/#approach")}>
                {site.hero.secondary}
                <ArrowDown size={15} />
              </a>
            </div>
            <div className="hero-footnote">
              <Sprout size={20} strokeWidth={1} />
              <span>{site.hero.note}</span>
            </div>
          </div>
        </div>
        <div className="hero-specimen-label">
          <span>01 / Monstera deliciosa</span>
          <small>Generous leaves. Effortless character.</small>
        </div>
        <div className="hero-bottom wrap">
          <span>Plant people. Space thinkers.</span>
          <a href={href("/#approach")}>
            <span>Take a slow scroll</span>
            <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <div className="travelling-plant" aria-hidden="true">
        <img src={asset(site.hero.image)} alt="" fetchPriority="high" />
        <div className="plant-ground" />
      </div>
      <section
        id="approach"
        className="approach wrap"
        aria-labelledby="approach-title"
      >
        <div className="approach-panel">
          <div className="approach-copy" data-reveal>
            <p className="eyebrow">{site.approach.eyebrow}</p>
            <h2 id="approach-title">
              {site.approach.title}
              <br />
              <em>{site.approach.accent}</em>
            </h2>
            <p>{site.approach.description}</p>
            <TextLink to="/about">Get to know Sylva</TextLink>
          </div>
          <div className="approach-photo">
            <img
              src={asset(site.approach.image)}
              alt="A plant stylist checking a Monstera leaf in a sunlit nursery"
              loading="lazy"
            />
            <span className="photo-caption">
              A little care goes a long way.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
