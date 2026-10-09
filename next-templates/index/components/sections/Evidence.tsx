"use client";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AccentReveal } from "@/components/motion/AccentReveal";
import { AmbientField } from "@/components/motion/AmbientField";
import { useResearch } from "@/components/product/ResearchProvider";
import { Citation } from "@/components/product/Citation";
export function Evidence() {
  const { topic, openSource } = useResearch();
  const source = topic.sources[0];
  return (
    <section className="evidence section" aria-labelledby="evidence-heading">
      <div className="container">
        <div className="evidence__heading">
          <div>
            <SectionBadge>{site.evidence.badge}</SectionBadge>
            <h2 id="evidence-heading">
              {site.evidence.first}
              <br />
              <AccentReveal dark>{site.evidence.accent}</AccentReveal>
            </h2>
          </div>
          <p>{site.evidence.description}</p>
        </div>
        <div className="evidence__visual">
          <AmbientField variant="dark" />
          <div className="evidence-source">
            <button
              onClick={() => openSource(source)}
              className="evidence-source__label"
            >
              <span className="source-number">01</span>
              {source.title}
              <ArrowRight size={16} />
            </button>
            <blockquote>“{source.excerpt}”</blockquote>
            <p>{source.publisher}</p>
          </div>
          <div className="evidence-connection" aria-hidden="true">
            <span />
            <ArrowRight size={18} />
          </div>
          <div className="evidence-answer">
            <p className="meta">From the source to the idea</p>
            <p>
              {topic.findings[0].text} <Citation source={source} number={1} />
            </p>
            <span className="evidence-hint">
              Open the reference. Follow the thought.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
