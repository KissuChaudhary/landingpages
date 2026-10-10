import { Quote } from "lucide-react";
import { site } from "@/site.config";
import { Avatar, Reveal, SectionHead } from "@/components/ui/Primitives";
export function Stories() {
  return (
    <section className="stories section frame">
      <SectionHead {...site.stories} />
      <div className="story-quotes">
        {site.stories.items.map((story, index) => (
          <Reveal
            className={`quote-card quote-${story.tone}`}
            key={story.name}
            delay={index * 100}
          >
            <Quote size={25} strokeWidth={1.4} aria-hidden="true" />
            <blockquote>“{story.quote}”</blockquote>
            <div className="quote-person">
              <Avatar initials={story.initials} tone={story.tone} />
              <div>
                <b>{story.name}</b>
                <span>{story.role}</span>
              </div>
              <span className="quote-index">0{index + 1}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="section-note">{site.stories.note}</p>
    </section>
  );
}
