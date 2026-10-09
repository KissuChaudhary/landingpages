"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { topics } from "@/data/topics";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Action } from "@/components/ui/Action";
import { useResearch } from "@/components/product/ResearchProvider";
import { BriefActions } from "@/components/product/BriefActions";
import { Citation } from "@/components/product/Citation";
export function Examples() {
  const { topic, select } = useResearch();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <section
      id="examples"
      className="examples container section"
      aria-labelledby="examples-heading"
    >
      <div className="section-heading">
        <SectionBadge>{site.examples.badge}</SectionBadge>
        <h2 id="examples-heading">
          {site.examples.heading.split("\n").map((line, i) => (
            <span className="heading-line" key={i}>
              {line}
            </span>
          ))}
        </h2>
        <p>{site.examples.description}</p>
      </div>
      <div className="examples-layout">
        <div
          className="example-list"
          role="tablist"
          aria-label="Example collections"
          aria-orientation="vertical"
        >
          {topics.map((item, i) => (
            <button
              key={item.id}
              ref={(element) => {
                refs.current[i] = element;
              }}
              id={`example-tab-${item.id}`}
              role="tab"
              aria-controls="example-panel"
              aria-selected={topic.id === item.id}
              tabIndex={topic.id === item.id ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={(event) => {
                let next = i;
                if (event.key === "ArrowDown") next = (i + 1) % topics.length;
                else if (event.key === "ArrowUp")
                  next = (i - 1 + topics.length) % topics.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = topics.length - 1;
                else return;
                event.preventDefault();
                select(topics[next].id);
                refs.current[next]?.focus();
              }}
            >
              <span className="meta">
                0{i + 1} / {item.category}
              </span>
              <span>
                {item.label}
                <ArrowUpRight size={24} />
              </span>
              <p>{item.description}</p>
            </button>
          ))}
        </div>
        <article
          className="example-preview"
          id="example-panel"
          role="tabpanel"
          aria-labelledby={`example-tab-${topic.id}`}
          tabIndex={0}
        >
          <div className="example-preview__top">
            <span className="meta">Your question</span>
            <span className="meta">Sample collection</span>
          </div>
          <h3>{topic.question}</h3>
          <p>{topic.takeaway}</p>
          <div className="example-preview__findings">
            {topic.findings.map((finding, i) => (
              <p key={`${topic.id}-${i}`}>
                <span>0{i + 1}</span>
                {finding.text}
                <span className="citations">
                  {finding.sources.map((id) => {
                    const n = topic.sources.findIndex((s) => s.id === id);
                    return (
                      <Citation
                        key={id}
                        source={topic.sources[n]}
                        number={n + 1}
                      />
                    );
                  })}
                </span>
              </p>
            ))}
          </div>
          <BriefActions topic={topic} />
          <Action href={site.links.app || "#research"} variant="text">
            Explore this collection
          </Action>
        </article>
      </div>
    </section>
  );
}
