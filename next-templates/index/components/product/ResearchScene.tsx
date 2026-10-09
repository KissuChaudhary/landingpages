"use client";
import { ArrowUpRight, FileText, StickyNote, BookOpen } from "lucide-react";
import { useResearch } from "./ResearchProvider";
import { TopicSelector } from "./TopicSelector";
import { Citation } from "./Citation";
import { Mark } from "@/components/ui/Mark";
import { AmbientField } from "@/components/motion/AmbientField";
import { SourceConnections } from "./SourceConnections";
const icons = { Article: BookOpen, Note: StickyNote, Document: FileText };
export function ResearchScene() {
  const { topic, openSource } = useResearch();
  return (
    <div className="research-scene" aria-label="Interactive research preview">
      <div className="scene-toolbar">
        <span>
          <Mark />
          Your research, in focus
        </span>
        <span className="meta">Local example</span>
      </div>
      <div className="scene-canvas" key={topic.id}>
        <AmbientField />
        <div className="source-stack">
          {topic.sources.map((source, i) => {
            const Icon = icons[source.kind];
            return (
              <button
                key={source.id}
                className={`source-fragment source-fragment--${i}`}
                onClick={() => openSource(source)}
              >
                <span className="source-fragment__type">
                  <Icon size={16} />
                  {source.kind}
                  <ArrowUpRight size={16} />
                </span>
                <strong>{source.title}</strong>
                <p>{source.excerpt}</p>
              </button>
            );
          })}
        </div>
        <SourceConnections />
        <article className="synthesis-paper">
          <p className="meta">A clearer picture</p>
          <h2>{topic.title}</h2>
          <div className="synthesis-findings">
            {topic.findings.map((finding, i) => (
              <p key={i}>
                {finding.text}
                <span className="citations">
                  {finding.sources.map((id) => {
                    const number = topic.sources.findIndex((s) => s.id === id);
                    return (
                      <Citation
                        key={id}
                        source={topic.sources[number]}
                        number={number + 1}
                      />
                    );
                  })}
                </span>
              </p>
            ))}
          </div>
          <div className="synthesis-takeaway">{topic.takeaway}</div>
        </article>
      </div>
      <div className="scene-bottom">
        <TopicSelector />
        <span className="scene-hint">Three sources. One new perspective.</span>
      </div>
    </div>
  );
}
