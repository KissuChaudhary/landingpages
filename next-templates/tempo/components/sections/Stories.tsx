import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Stories() {
  return (
    <section className="stories-section" aria-label="Everyday perspectives">
      <div className="container section">
        <SectionIntro
          centered
          label="Little changes, familiar feelings"
          title={
            <>
              Good company.
              <br />
              <em>Good little days.</em>
            </>
          }
        />
        <div className="stories-grid">
          {site.stories.map((story, index) => (
            <figure className={`story-card ${story.colour}`} key={story.name}>
              <span className="story-number mono">
                EVERYDAY PERSPECTIVE / 0{index + 1}
              </span>
              <span className="story-quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>“{story.quote}”</blockquote>
              <figcaption>
                <span className="story-avatar">{story.initials}</span>
                <span>
                  <strong>{story.name}</strong>
                  <span>{story.role}</span>
                </span>
              </figcaption>
              <div className="story-note">
                <span aria-hidden="true">✳</span>
                {story.note}
              </div>
            </figure>
          ))}
        </div>
        <p className="demo-note">
          Illustrative stories for the template · replace with your own
          community.
        </p>
      </div>
    </section>
  );
}
