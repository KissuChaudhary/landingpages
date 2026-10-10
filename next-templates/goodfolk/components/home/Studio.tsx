import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { ButtonLink, Eyebrow, Mark, Multiline } from "../ui";
export function Studio() {
  return (
    <section
      className="studio-section wrapper section-pad"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="studio-image" data-reveal>
        <img
          src={asset(site.studio.image)}
          alt={site.studio.imageAlt}
          width="1536"
          height="1024"
          loading="lazy"
        />
        <span className="studio-image-label">
          <Mark />
          {site.studio.note}
        </span>
      </div>
      <div className="studio-copy">
        <div className="studio-intro">
          <Eyebrow>{site.studio.eyebrow}</Eyebrow>
          <h2 data-reveal id="studio-title">
            <Multiline text={site.studio.title} />
          </h2>
        </div>
        <div className="studio-description">
          <p>{site.studio.description}</p>
          <ButtonLink href={site.contactHref}>
            Meet your next creative team
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
