import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stories() {
  return (
    <section
      className="section stories-section container"
      aria-labelledby="stories-title"
    >
      <div className="stories-heading">
        <SectionHeading {...site.stories} id="stories-title" />
        <span className="stories-symbol" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="stories-grid">
        {site.stories.quotes.map((story, i) => (
          <figure className="story" key={story.name}>
            <div className="story-top">
              <span className="mono">CREATIVE PERSPECTIVE / 0{i + 1}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </div>
            <blockquote>“{story.quote}”</blockquote>
            <figcaption>
              <span
                className="story-avatar"
                style={{ background: story.color }}
              >
                {story.initials}
              </span>
              <div>
                <span>{story.name}</span>
                <span>{story.role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="section-footnote">{site.stories.note}</p>
    </section>
  );
}
