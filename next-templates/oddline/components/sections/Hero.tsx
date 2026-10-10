import { site } from "@/site.config";
import { asset, contact } from "@/lib/links";
import { Arrow, Button, Label, Star } from "../ui";
export function Hero() {
  return (
    <section className="hero wrap" data-hero aria-labelledby="hero-title">
      <div className="hero-copy">
        <Label>{site.hero.eyebrow}</Label>
        <h1 id="hero-title">
          {site.hero.lines[0]}
          <br />
          <span>{site.hero.lines[1]}</span>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <Button href="#work">{site.hero.primary}</Button>
          <a className="quiet-link" href={contact()}>
            {site.hero.secondary}
            <Arrow size={16} />
          </a>
        </div>
        <div className="hero-signature">
          <span className="signature-line" />
          <p>{site.hero.note}</p>
          <Star />
        </div>
      </div>
      <div className="hero-composition">
        <div className="composition-coordinate">
          OL—01 / CREATIVE IN GOOD COMPANY
        </div>
        <div className="hero-cut hero-cut-coffee">
          <img
            src={asset("/images/coffee.webp")}
            alt="A vivid cobalt-blue coffee campaign set"
          />
          <span>
            GOOD IDEAS
            <br />
            DON’T SIT STILL.
          </span>
        </div>
        <div className="hero-main">
          <img
            src={asset(site.hero.image)}
            alt="A creator in a cobalt shirt holding a silver camera"
            fetchPriority="high"
          />
          <div className="image-topline">
            <span className="live-dot" />A FRESH PERSPECTIVE <span>01/03</span>
          </div>
          <div className="hero-main-caption">
            <span>Oddline originals</span>
            <Arrow diagonal />
          </div>
        </div>
        <div className="hero-cut hero-cut-skincare">
          <img
            src={asset("/images/skincare.webp")}
            alt="A tactile lilac skincare campaign set"
          />
          <span>MADE YOU LOOK.</span>
        </div>
        <div className="hero-sticker">
          <Star />
          <span>
            Good brands
            <br />
            deserve
            <br />
            an audience.
          </span>
        </div>
        <div className="hero-frame-corner corner-a" />
        <div className="hero-frame-corner corner-b" />
      </div>
      <div className="hero-bottom">
        <div>
          {site.hero.disciplines.map((word, i) => (
            <span key={word}>
              {word}
              {i < 2 && <i>×</i>}
            </span>
          ))}
        </div>
        <a href="#work">
          A little further down <Arrow size={15} />
        </a>
      </div>
    </section>
  );
}
