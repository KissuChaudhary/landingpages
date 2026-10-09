"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { topics, type Source, type Topic } from "@/data/topics";
import { Dialog } from "@/components/ui/Dialog";
import { Mark } from "@/components/ui/Mark";
const ResearchContext = createContext<{
  topic: Topic;
  select: (id: string) => void;
  openSource: (source: Source) => void;
}>({ topic: topics[0], select: () => {}, openSource: () => {} });
export const useResearch = () => useContext(ResearchContext);
export function ResearchProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState(topics[0]);
  const [source, setSource] = useState<Source | null>(null);
  const select = (id: string) => {
    const next = topics.find((item) => item.id === id);
    if (next) setTopic(next);
  };
  const close = useCallback(() => setSource(null), []);
  return (
    <ResearchContext.Provider value={{ topic, select, openSource: setSource }}>
      {children}
      <Dialog open={!!source} onClose={close} title="Source passage">
        {source && (
          <article className="source-reader">
            <Mark />
            <p className="meta">{source.publisher}</p>
            <h2>{source.title}</h2>
            <p className="source-reader__passage">{source.passage}</p>
            <p className="source-reader__note">
              Original sample content, prepared for this preview.
            </p>
          </article>
        )}
      </Dialog>
    </ResearchContext.Provider>
  );
}
