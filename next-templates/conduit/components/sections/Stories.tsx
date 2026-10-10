"use client";
import { ArrowUpRight } from "lucide-react";
import { stories } from "@/data/stories";
import { site } from "@/site.config";
import type { BlueprintKey } from "@/data/blueprints";
import { showBlueprint } from "@/lib/blueprint";
import { SampleLogo } from "../ui/Brand";
import { Frame, SectionHead } from "../ui/Primitives";
export function Stories() {
  return (
    <Frame className="section stories" id="stories">
      <SectionHead label={site.stories.label} title={site.stories.title}>
        <p>{site.stories.intro}</p>
      </SectionHead>
      <div className="story-grid">
        {stories.map((story, i) => (
          <article className="story-card" key={story.id} data-reveal>
            <span className="junction" aria-hidden="true" />
            <div className="story-top">
              <SampleLogo name={story.name} variant={i} />
              <span className="mono">{story.category}</span>
            </div>
            <div className="story-stat">
              <strong>{story.stat}</strong>
              <span className="mono">{story.metric}</span>
            </div>
            <h3>{story.title}</h3>
            <blockquote>{story.quote}</blockquote>
            <details>
              <summary>Read the workflow</summary>
              <p>{story.details}</p>
            </details>
            <div className="story-foot">
              <span className="story-avatar">{story.initials}</span>
              <span>{story.role}</span>
              <button
                className="text-action"
                onClick={() => showBlueprint(story.blueprint as BlueprintKey)}
              >
                {site.stories.action}
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="stories-note">
        Illustrative workflows and fictional team identities. Each example runs
        locally on the board at the top of the page.
      </p>
    </Frame>
  );
}
