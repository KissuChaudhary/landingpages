import { site } from "@/site.config";
import { asset, contact } from "@/lib/links";
import { Arrow, Label } from "../ui";
export function Studio() {
  return (
    <section
      id="studio"
      className="studio section-pad"
      aria-labelledby="studio-statement"
    >
      <div className="wrap">
        <Label>{site.studio.eyebrow}</Label>
        <div className="studio-grid">
          <h2 id="studio-statement" data-reveal>
            {site.studio.statement}
          </h2>
          <div className="studio-description">
            <p>{site.studio.description}</p>
            <a className="text-link" href={contact()}>
              Meet your creative partner
              <Arrow diagonal size={17} />
            </a>
          </div>
        </div>
        <figure className="studio-portrait" data-reveal>
          <img
            src={asset(site.studio.image)}
            alt="An illustrative creative team discussing ideas around a studio table"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <figcaption>
            <span>GOOD WORK STARTS IN GOOD COMPANY.</span>
            <p>{site.studio.note}</p>
            <span>THE OFFSCRIPT WAY ↗</span>
          </figcaption>
        </figure>
        <div className="studio-principles">
          {site.studio.principles.map((item, index) => (
            <p key={item}>
              <span>0{index + 1}</span>
              {item}
            </p>
          ))}
        </div>
        <p className="studio-image-note">{site.studio.imageCaption}</p>
      </div>
    </section>
  );
}
