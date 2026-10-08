import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { BrandMark } from "@/components/ui/Brand";

export function Hero() {
  const { hero } = site;
  return (
    <section className="hero container" id="top" aria-labelledby="hero-title">
      <div className="hero-kicker">
        <p className="eyebrow">{hero.eyebrow}</p>
        <span className="availability">
          <span className="status-dot" />
          {site.brand.availability}
        </span>
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">
          {hero.lead}
          <br />
          <em>{hero.accent}</em>
        </h1>
        <div className="hero-intro">
          <p>{hero.description}</p>
          <a className="text-link" href="#work">
            {hero.cta}
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <figure className="hero-image">
        <img
          src={asset(hero.image)}
          alt={hero.alt}
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="hero-image-top">
          <span className="image-label">Selected study / 001</span>
          <BrandMark className="hero-star" />
        </div>
        <figcaption>
          <div>
            <p>{hero.project}</p>
            <span>{hero.note}</span>
          </div>
          <a
            href="#work"
            className="image-arrow"
            aria-label="View selected work"
          >
            <ArrowUpRight size={26} aria-hidden="true" />
          </a>
        </figcaption>
      </figure>
      <div className="hero-foot">
        <p className="eyebrow">{hero.caption}</p>
        <span className="eyebrow">Still / Moving / Memorable</span>
      </div>
      <div className="specialties">
        <p>Made for brands in</p>
        <ul>
          {site.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
