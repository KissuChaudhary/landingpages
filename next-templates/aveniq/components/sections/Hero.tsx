import { site } from "@/site.config";
import { asset, contact } from "@/lib/links";
import { Button, Check, Label } from "../ui";
import { WorkspacePreview } from "../WorkspacePreview";
export function Hero() {
  return (
    <section
      className="hero section-shell"
      data-hero
      aria-labelledby="hero-title"
    >
      <div className="hero-panel">
        <div className="hero-copy">
          <Label>{site.hero.eyebrow}</Label>
          <h1 id="hero-title">
            {site.hero.lines.map((line, index) => (
              <span key={line} className={index ? "hero-accent" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions">
            <Button href={contact()}>{site.hero.primary}</Button>
            <Button variant="text" href="#platform">
              {site.hero.secondary}
            </Button>
          </div>
          <p className="hero-note">
            <span className="note-ring" aria-hidden="true" />
            {site.hero.note}
          </p>
        </div>
        <div className="hero-art">
          <img
            src={asset(site.hero.image)}
            alt="An iridescent glass ribbon folding into one continuous loop"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="art-caption">
            <span>A / 01</span>
            <span>Clear thinking, in motion.</span>
          </div>
          <div className="hero-workspace">
            <WorkspacePreview />
          </div>
          <span className="art-coordinate" aria-hidden="true">
            A clearer view of what’s next. ↗
          </span>
        </div>
      </div>
      <div className="principles">
        {site.principles.map((principle) => (
          <p key={principle}>
            <Check />
            {principle}
          </p>
        ))}
        <span className="principles-note">Thoughtful by design.</span>
      </div>
    </section>
  );
}
