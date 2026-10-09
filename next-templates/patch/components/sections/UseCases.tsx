"use client";
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridIntersections } from "@/components/ui/Grid";
import { UseCaseArtwork } from "@/components/product/UseCaseArtwork";
import { usePatch } from "@/components/PatchProvider";
import { assetPath } from "@/lib/files";
import { moveTab } from "@/lib/tabs";
export function UseCases() {
  const [selected, setSelected] = useState(0);
  const uid = useId();
  const content = site.useCases;
  const item = content.items[selected];
  const { explore } = usePatch();
  return (
    <section
      className="grid-section use-cases-section"
      aria-label="A few good starting points"
    >
      <GridIntersections />
      <SectionHeading {...content} />
      <div className="use-case-body">
        <div className="use-case-copy">
          <div
            className="use-case-tabs"
            role="tablist"
            aria-label="Product starting points"
            aria-orientation="vertical"
          >
            {content.items.map((entry, index) => (
              <button
                key={entry.id}
                role="tab"
                id={`${uid}-${index}`}
                tabIndex={selected === index ? 0 : -1}
                aria-selected={selected === index}
                aria-controls={`${uid}-panel`}
                onClick={() => setSelected(index)}
                onKeyDown={(event) =>
                  moveTab(event, index, content.items.length, setSelected, true)
                }
              >
                {entry.label}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <div className="use-case-description">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="text-link" onClick={() => explore(item.example)}>
              {content.action}
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div
          className="use-case-stage"
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-${selected}`}
        >
          {item.screenshot ? (
            <img
              className="product-screenshot"
              src={assetPath(item.screenshot.src)}
              alt={item.screenshot.alt}
            />
          ) : (
            <UseCaseArtwork id={item.id} />
          )}
        </div>
      </div>
    </section>
  );
}
