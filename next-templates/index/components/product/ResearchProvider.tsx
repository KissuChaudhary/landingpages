"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { topics, type Source, type Topic } from "@/data/topics";

// A source passage opens inside the card it was chosen from, so each card
// that lists sources has its own surface name.
export type Surface = string;
const ResearchContext = createContext<{
  topic: Topic;
  select: (id: string) => void;
  open: { source: Source; surface: Surface } | null;
  openSource: (source: Source, surface: Surface) => void;
  closeSource: () => void;
  dismiss: (surface: Surface) => void;
}>({
  topic: topics[0],
  select: () => {},
  open: null,
  openSource: () => {},
  closeSource: () => {},
  dismiss: () => {},
});
export const useResearch = () => useContext(ResearchContext);
export function useSurfaceSource(surface: Surface) {
  const { open, closeSource } = useResearch();
  return {
    source: open?.surface === surface ? open.source : null,
    closeSource,
  };
}
export function ResearchProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState(topics[0]);
  const [open, setOpen] = useState<{ source: Source; surface: Surface } | null>(
    null,
  );
  const opener = useRef<HTMLElement | null>(null);
  const select = useCallback((id: string) => {
    const next = topics.find((item) => item.id === id);
    if (!next) return;
    setTopic(next);
    setOpen(null);
    opener.current = null;
  }, []);
  const openSource = useCallback((source: Source, surface: Surface) => {
    const active = document.activeElement;
    opener.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    setOpen({ source, surface });
  }, []);
  const closeSource = useCallback(() => {
    setOpen(null);
    const element = opener.current;
    opener.current = null;
    if (element)
      requestAnimationFrame(() => {
        if (element.isConnected) element.focus({ preventScroll: true });
      });
  }, []);
  // Closes a passage without moving focus, for when its card changes.
  const dismiss = useCallback((surface: Surface) => {
    setOpen((current) => (current?.surface === surface ? null : current));
  }, []);
  const value = useMemo(
    () => ({ topic, select, open, openSource, closeSource, dismiss }),
    [topic, select, open, openSource, closeSource, dismiss],
  );
  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}
