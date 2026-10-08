"use client";
import { ArrowUpRight } from "lucide-react";
import { Mark } from "@/components/ui/Brand";
import { usePatch } from "@/components/PatchProvider";
import { site } from "@/site.config";
export function Closing() {
  const { start } = usePatch();
  const content = site.closing;
  return (
    <section
      className="grid-section closing-section"
      aria-labelledby="closing-title"
    >
      <div className="closing-copy">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="closing-title">
          {content.title}
          <br />
          <span>{content.emphasis}</span>
        </h2>
        <p className="closing-description">{content.description}</p>
        <button className="button button-accent" onClick={start}>
          {site.actions.try}
          <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="closing-art" aria-hidden="true">
        <div className="closing-art-grid">
          <span className="closing-coordinate">
            X: POSSIBILITY / Y: A BEGINNING
          </span>
          <div className="closing-square">
            <Mark />
            <span className="closing-square-corner">+</span>
          </div>
          <span className="closing-art-caption">
            {content.small}
            <span>↗</span>
          </span>
        </div>
      </div>
    </section>
  );
}
