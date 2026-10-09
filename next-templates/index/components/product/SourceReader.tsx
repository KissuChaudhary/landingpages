"use client";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import type { Source } from "@/data/topics";
import { Mark } from "@/components/ui/Mark";

// The full passage for one source, shown in place of the card's own content.
// The card underneath stays mounted, so closing returns to exactly where the
// visitor was.
export function SourceReader({
  source,
  onClose,
  tone = "light",
}: {
  source: Source;
  onClose: () => void;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    const bounds = element.getBoundingClientRect();
    if (bounds.top < 72 || bounds.bottom > window.innerHeight)
      element.scrollIntoView({ block: "center" });
  }, [source]);
  return (
    <section
      ref={ref}
      className={`source-reader source-reader--${tone}`}
      tabIndex={-1}
      aria-label={`Source: ${source.title}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="source-reader__top">
        <button type="button" className="source-reader__back" onClick={onClose}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>
        <span className="meta">
          {source.kind} · {source.tag}
        </span>
      </div>
      <article>
        <Mark />
        <p className="meta">{source.publisher}</p>
        <h2>{source.title}</h2>
        <p className="source-reader__passage">{source.passage}</p>
        <p className="source-reader__note">
          Original sample content, prepared for this preview.
        </p>
      </article>
    </section>
  );
}
