import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Button } from "../ui/Button";
import { Arrow } from "../ui/Arrow";
import { MotionControl } from "../Motion";
export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">
          <span />
          {site.hero.eyebrow}
        </p>
        <h1>
          {site.hero.lines.map((line, index) => (
            <span className="hero-line" key={line}>
              <span style={{ animationDelay: index * 100 + "ms" }}>
                {index === site.hero.lines.length - 1
                  ? line.replace(/\.$/, "")
                  : line}
                {index === site.hero.lines.length - 1 && (
                  <>
                    <i className="hero-period" aria-hidden="true" />
                    <span className="sr-only">.</span>
                  </>
                )}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <Button>{site.hero.primary}</Button>
          <a className="hero-secondary" href="#work">
            {site.hero.secondary}
            <Arrow diagonal />
          </a>
        </div>
        <div className="hero-foot">
          <span className="tiny-mark" aria-hidden="true">
            ↗
          </span>
          <p>{site.hero.note}</p>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-photo">
          <img
            src={asset(site.hero.image)}
            alt={site.hero.imageAlt}
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="photo-label">
            <span>{site.hero.imageLabel}</span>
            <Arrow diagonal />
          </div>
          <span className="photo-caption">{site.hero.imageCaption}</span>
        </div>
        <div className="journey-card" data-loop>
          <div className="journey-card-top">
            <span>A longer view of growth</span>
            <span className="live-dot" />
          </div>
          <div className="journey-stages">
            <span>First click</span>
            <Arrow />
            <span>First order</span>
            <Arrow />
            <strong>Next order</strong>
          </div>
          <svg viewBox="0 0 340 42" fill="none" aria-hidden="true">
            <path
              d="M25 5v15q0 14 14 14h250q14 0 14-14V5"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="m20 10 5-5 5 5" stroke="currentColor" strokeWidth="1" />
            <circle className="journey-dot" r="3.5" fill="currentColor" />
          </svg>
          <p>Build the relationship. Keep it moving.</p>
        </div>
        <div className="hero-motion">
          <MotionControl />
        </div>
      </div>
    </section>
  );
}
