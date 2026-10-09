"use client";
import { ArrowUpRight } from "lucide-react";
import { usePatch } from "@/components/PatchProvider";
import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Mark } from "@/components/ui/Brand";
import { GridIntersections } from "@/components/ui/Grid";
export function Closing() {
  const { start } = usePatch();
  const content = site.closing;
  return (
    <section
      className="grid-section closing-section"
      aria-labelledby="closing-title"
    >
      <GridIntersections />
      <div className="closing-art" aria-hidden="true">
        <Mark />
      </div>
      <div className="closing-copy">
        <SectionBadge label={content.badge} />
        <h2 id="closing-title">
          {content.title} <span>{content.emphasis}</span>
        </h2>
        <p className="closing-description">{content.description}</p>
        <div className="closing-actions">
          <button className="button button-accent" onClick={start}>
            {site.actions.try}
            <ArrowUpRight size={17} />
          </button>
          <a className="button closing-secondary" href="#workspace">
            {content.secondary}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
