"use client";
import { useRef, useState } from "react";
import { stories } from "@/data/stories";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { SampleLogo } from "../ui/Brand";
import { Button, Frame, SectionHead } from "../ui/Primitives";
export function Stories() {
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const story = stories[active];
  return (
    <Frame className="section stories dark" id="stories">
      <div className="stories-heading">
        <SectionHead label={site.stories.label} title={site.stories.title} />
        <Button
          variant="outline"
          onClick={() => {
            setDetails(true);
            document.getElementById("story-panel")?.scrollIntoView({ block: "center" });
          }}
        >
          {site.stories.action}
        </Button>
      </div>
      <div className="story-tabs" role="tablist" aria-label="Workflow stories">
        {stories.map((item, i) => (
          <button
            key={item.id}
            id={`story-tab-${i}`}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            aria-selected={i === active}
            aria-controls="story-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => {
              setActive(i);
              setDetails(false);
            }}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight") next = (i + 1) % stories.length;
              else if (e.key === "ArrowLeft")
                next = (i + stories.length - 1) % stories.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = stories.length - 1;
              else return;
              e.preventDefault();
              setActive(next);
              setDetails(false);
              tabs.current[next]?.focus();
            }}
          >
            <SampleLogo name={item.name} variant={i} />
          </button>
        ))}
      </div>
      <div
        className="story-panel"
        id="story-panel"
        role="tabpanel"
        aria-labelledby={`story-tab-${active}`}
        tabIndex={0}
      >
        <div className="story-art">
          <img src={asset("/images/glass.webp")} alt="" loading="lazy" />
          <SampleLogo name={story.name} variant={active} />
          <span>{story.category}</span>
        </div>
        <div className="story-result">
          <h3>{story.title}</h3>
          <div>
            <strong>{story.stat}</strong>
            <p>{story.metric}</p>
          </div>
          {details && <p className="story-details">{story.details}</p>}
          <button
            className="text-action"
            aria-expanded={details}
            onClick={() => setDetails(!details)}
          >
            {details ? "Hide the workflow" : "Read the workflow"}
            <span aria-hidden="true">{details ? "↑" : "↓"}</span>
          </button>
        </div>
        <div className="story-quote">
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{story.quote}</blockquote>
          <div className="story-person">
            <span className="story-avatar">{story.initials}</span>
            <div>
              <strong>{story.name}</strong>
              <span>{story.role}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="stories-note">
        Illustrative workflows and fictional team identities. Explore the
        examples to see what happens at each step.
      </p>
    </Frame>
  );
}
