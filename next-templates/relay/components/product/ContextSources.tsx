"use client";
import { BookOpen, CalendarDays, FileText } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
const icons = { notes: FileText, calendar: CalendarDays, reading: BookOpen };
export function ContextSources() {
  const { assistant: a } = useRelay();
  return (
    <aside className="context-sources">
      <h3>{site.workspace.contextTitle}</h3>
      <p>{site.workspace.contextDescription}</p>
      <div className="source-list">
        {site.workspace.sources.map((source) => {
          const Icon = icons[source.id];
          return (
            <label className="source-row" key={source.id}>
              <Icon size={21} />
              <span>
                <strong>{source.label}</strong>
                <span className="supporting">{source.detail}</span>
              </span>
              <input
                type="checkbox"
                checked={a.sources.includes(source.id)}
                disabled={a.phase > 0 && a.phase < 3}
                onChange={() => a.toggleSource(source.id)}
              />
            </label>
          );
        })}
      </div>
      <p className="context-note">
        {a.sources.length
          ? `${a.sources.length} ${a.sources.length === 1 ? "source" : "sources"} selected for this example.`
          : "Choose a source to begin."}
      </p>
    </aside>
  );
}
