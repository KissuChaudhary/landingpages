"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { stories } from "@/data/stories";
import { Section, SectionHead } from "../ui/Primitives";
import { Portrait } from "../ui/Portrait";
export function Stories() {
  const [selected, setSelected] = useState(0);
  const visible = [stories[selected], stories[(selected + 1) % stories.length]];
  return (
    <Section id="stories">
      <SectionHead
        label="From the finance team"
        icon={Quote}
        title="Month end, without the dread."
        description="Three teams on what changed when the close stopped living in spreadsheets."
      />
      <div className="story-grid" aria-live="polite">
        {visible.map((story) => (
          <article className="surface story-card" key={story.name}>
            <div className="story-visual">
              <Portrait person={story.person} />
              <strong>{story.result}</strong>
              <span>{story.label}</span>
            </div>
            <div className="story-copy">
              <span className="story-brand">{story.brand}</span>
              <blockquote>“{story.quote}”</blockquote>
              <div>
                <h3>{story.name}</h3>
                <p>{story.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="story-controls">
        <span>Illustrative finance stories</span>
        <div>
          <button
            className="icon-button"
            aria-label="Previous stories"
            onClick={() =>
              setSelected((selected + stories.length - 1) % stories.length)
            }
          >
            <ArrowLeft size={17} />
          </button>
          <span>0{selected + 1} / 03</span>
          <button
            className="icon-button"
            aria-label="Next stories"
            onClick={() => setSelected((selected + 1) % stories.length)}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </Section>
  );
}
