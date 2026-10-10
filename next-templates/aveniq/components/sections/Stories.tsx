import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/links";
import { Label, Title } from "../ui";
export function Stories() {
  return (
    <section id="use-cases" className="stories section-shell section-space">
      <div className="section-heading">
        <Label>{site.stories.eyebrow}</Label>
        <div>
          <Title lines={site.stories.title} />
          <p className="section-description">{site.stories.description}</p>
        </div>
      </div>
      <div className="story-stack">
        {site.stories.items.map((item, index) => (
          <article
            key={item.number}
            className={`story-card story-${item.tone}`}
            style={{ "--card": index } as CSSProperties}
            data-stack
          >
            <div className="story-copy">
              <div className="story-top">
                <span>{item.category}</span>
                <span>{item.number} / 03</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="story-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="story-note">{item.note}</span>
            </div>
            <div className="story-image">
              <img
                src={asset(item.image)}
                alt={
                  index === 0
                    ? "Translucent glass planes arranged around a chrome sphere"
                    : index === 1
                      ? "Intersecting glass ellipses above a polished aluminum disc"
                      : "A single continuous sculptural glass ribbon"
                }
                width="1536"
                height="1024"
                loading="lazy"
              />
              <span className="image-notation" aria-hidden="true">
                Aveniq / A clearer perspective
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
