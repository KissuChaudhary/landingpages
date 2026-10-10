import { site } from "@/site.config";
import { projects } from "@/data/projects";
import { asset, route } from "@/lib/urls";
import { Arrow, ButtonLink, Eyebrow, Mark } from "../ui";
export function Hero() {
  return (
    <>
      <section className="hero wrapper" data-hero aria-labelledby="hero-title">
        <div className="hero-copy">
          <Eyebrow>{site.hero.eyebrow}</Eyebrow>
          <h1 id="hero-title">
            {site.hero.lines.map((line, i) => (
              <span key={line} className={`hero-line hero-line-${i}`}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions">
            <ButtonLink href={site.contactHref}>
              {site.hero.primaryLabel}
            </ButtonLink>
            <a className="text-link" href="#work">
              {site.hero.secondaryLabel}
              <Arrow />
            </a>
          </div>
          <p className="hero-caption">
            <span className="tiny-lines" aria-hidden="true" />
            {site.hero.caption}
          </p>
        </div>
        <div className="hero-collage">
          <div className="hero-backplate" aria-hidden="true" />
          <figure className="hero-main">
            <img
              src={asset(site.hero.image)}
              alt={site.hero.imageAlt}
              width="1024"
              height="1536"
              fetchPriority="high"
            />
            <figcaption>
              <span>Out of the ordinary.</span>
              <Mark />
            </figcaption>
          </figure>
          <a
            className="hero-inset"
            href={route(`/work/${projects[1].slug}`)}
            aria-label={`Explore the ${projects[1].name} campaign`}
          >
            <img
              src={asset(site.hero.insetImage)}
              alt={site.hero.insetAlt}
              width="1024"
              height="1536"
            />
            <span>
              {projects[1].name}
              <Arrow diagonal />
            </span>
          </a>
          <div className="hero-sticker" aria-hidden="true">
            {site.hero.sticker.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
            <svg viewBox="0 0 40 28" fill="none">
              <path
                d="M2 4c12 18 20 20 34 8m-14 1 14-2-5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="collage-number" aria-hidden="true">
            OS / 001
          </span>
        </div>
      </section>
      <div className="brand-rail wrapper">
        <p>
          Different worlds.
          <br />
          Same good chemistry.
        </p>
        <div>
          {projects.map((p) => (
            <a
              href={route(`/work/${p.slug}`)}
              key={p.slug}
              className={`brand-${p.slug}`}
            >
              {p.name}
              <span>®</span>
            </a>
          ))}
        </div>
        <span className="rail-note">
          A selection of our
          <br />
          creative collaborations
        </span>
      </div>
    </>
  );
}
