import { site } from "@/site.config";
import { Button, Eyebrow, Title } from "@/components/ui";
import { Sculpture } from "@/components/art/Sculpture";
export function Hero() {
  return (
    <section className="hero dark" data-scene>
      <div className="hero-copy">
        <Eyebrow>{site.hero.eyebrow}</Eyebrow>
        <Title as="h1" lines={site.hero.lines} className="hero-title" />
        <p className="hero-description" data-reveal>
          {site.hero.description}
        </p>
        <div className="hero-actions" data-reveal>
          <Button to={site.links.booking}>{site.hero.primary}</Button>
          <a className="text-link" href="#systems">
            {site.hero.secondary}
            <span>↓</span>
          </a>
        </div>
        <p className="hero-note mono" data-reveal>
          {site.hero.note}
        </p>
      </div>
      <div className="hero-art">
        <div className="hero-art-top mono">
          <span>T / 01</span>
          <span>THE CONNECTED STATE</span>
          <span>↗</span>
        </div>
        <Sculpture />
        <div className="hero-art-bottom mono">
          <span className="live-dot" />
          {site.hero.artLabel}
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>INDEPENDENT AI SYSTEMS STUDIO</span>
        <a href="#intro">
          A LITTLE LESS FRICTION <span>↓</span>
        </a>
      </div>
    </section>
  );
}
