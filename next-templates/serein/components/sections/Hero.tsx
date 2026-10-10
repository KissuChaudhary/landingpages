import { site } from "@/site.config";
import { Brand } from "../ui/Brand";
import { Eyebrow } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Ribbon } from "../visuals/Ribbon";
import { HeroReel } from "./HeroReel";

export function Hero() {
  return (
    <section className="hero dark-section" aria-labelledby="hero-title">
      <Ribbon />
      <div className="hero-inner container">
        <div className="hero-top">
          <Eyebrow>{site.hero.eyebrow}</Eyebrow>
          <span className="hero-location">{site.location}</span>
        </div>
        <h1 id="hero-title" className="hero-title">
          <Brand />
          <span>studio</span>
        </h1>
        <div className="hero-body">
          <div className="hero-description">
            <p>{site.hero.description}</p>
            <div className="hero-actions">
              <Button to="/#work" light secondary>
                {site.hero.primary}
              </Button>
              <Button to={site.links.booking || "/contact"} light>
                {site.hero.secondary}
              </Button>
            </div>
          </div>
          <HeroReel />
        </div>
        <div className="hero-bottom">
          <span>{site.hero.descriptor}</span>
          <span className="hero-footnote">{site.hero.footnote}</span>
        </div>
      </div>
    </section>
  );
}
