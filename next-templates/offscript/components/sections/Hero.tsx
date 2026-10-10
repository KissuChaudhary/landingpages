import { site } from "@/site.config";
import { Arrow, Label } from "../ui";
import { ContactSheet } from "../ContactSheet";
export function Hero() {
  return (
    <section className="hero wrap" data-hero aria-labelledby="hero-title">
      <Label>{site.hero.eyebrow}</Label>
      <div className="hero-intro">
        <h1 id="hero-title">
          <span>{site.hero.lines[0]}</span>
          <span>{site.hero.lines[1]}</span>
        </h1>
        <div className="hero-aside">
          <p>{site.hero.description}</p>
          <a href="#work">
            {site.hero.primary}
            <Arrow diagonal size={18} />
          </a>
        </div>
      </div>
      <ContactSheet />
      <div className="hero-bottom">
        <span>{site.hero.note}</span>
        <span>
          Good things happen outside the lines.
          <Arrow size={16} />
        </span>
      </div>
    </section>
  );
}
