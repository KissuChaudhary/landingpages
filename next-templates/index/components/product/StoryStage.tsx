"use client";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { useResearch } from "./ResearchProvider";
import { Citation } from "./Citation";
import { BriefActions } from "./BriefActions";
import { AmbientField } from "@/components/motion/AmbientField";
import { ConnectionMap } from "./ConnectionMap";
export function StoryStage({ step }: { step: number }) {
  const { topic, openSource } = useResearch();
  return (
    <div
      className={`story-stage story-stage--${step}`}
      aria-label={
        [
          "Collect sources preview",
          "Connect ideas preview",
          "Understand findings preview",
        ][step]
      }
    >
      <AmbientField />
      <div className="stage-header">
        <span className="meta">{topic.category}</span>
        <span className="meta">0{step + 1} / 03</span>
      </div>
      {step === 0 && (
        <div className="collection-view">
          <div className="collection-view__heading">
            <h3>Your useful pieces.</h3>
          </div>
          {topic.sources.map((source) => (
            <button
              key={source.id}
              className="collection-row"
              onClick={() => openSource(source)}
            >
              <FileText size={22} />
              <span>
                <strong>{source.title}</strong>
                <small>
                  {source.kind} · {source.tag}
                </small>
              </span>
              <ArrowUpRight size={18} />
            </button>
          ))}
          <p className="collection-view__footer">
            <Check size={16} />
            Three sources, ready to explore.
          </p>
        </div>
      )}
      {step === 1 && (
        <div className="connections-view">
          <ConnectionMap />
          <div className="connection-insight">
            <p className="meta">The thread between them</p>
            <h3>{topic.connections[0]}</h3>
            <p>{topic.takeaway}</p>
          </div>
        </div>
      )}
      {step === 2 && (
        <article className="understand-view">
          <p className="meta">Your research brief</p>
          <h3>{topic.title}</h3>
          <p className="understand-view__question">{topic.question}</p>
          {topic.findings.map((finding, i) => (
            <p key={i} className="understand-finding">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {finding.text}
              <span className="citations">
                {finding.sources.map((id) => {
                  const index = topic.sources.findIndex((s) => s.id === id);
                  return (
                    <Citation
                      key={id}
                      source={topic.sources[index]}
                      number={index + 1}
                    />
                  );
                })}
              </span>
            </p>
          ))}
          <BriefActions topic={topic} />
        </article>
      )}
    </div>
  );
}
