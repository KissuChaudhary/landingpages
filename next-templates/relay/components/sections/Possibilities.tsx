"use client";
import { useState } from "react";
import { ArrowUpRight, Bookmark, Check } from "lucide-react";
import { site } from "@/site.config";
import { scenarios } from "@/data/scenarios";
import { useRelay } from "@/components/RelayProvider";
import { ExampleStudy } from "@/components/product/ExampleStudy";
import { GridSection } from "@/components/ui/GridSection";
export function Possibilities() {
  const { assistant: a, explore } = useRelay();
  const [onlySaved, setOnlySaved] = useState(false);
  const visible = scenarios.filter((s) => !onlySaved || a.saved.includes(s.id));
  return (
    <GridSection
      className="possibilities-section"
      id="possibilities"
      aria-labelledby="possibilities-title"
    >
        <div className="possibilities-introduction">
          <div>
            <h2 id="possibilities-title">{site.possibilities.title}</h2>
            <p>{site.possibilities.description}</p>
          </div>
          <div
            className="library-filter"
            role="group"
            aria-label="Example filter"
          >
            <button
              aria-pressed={!onlySaved}
              onClick={() => setOnlySaved(false)}
            >
              All examples
            </button>
            <button aria-pressed={onlySaved} onClick={() => setOnlySaved(true)}>
              Saved ({a.saved.length})
            </button>
          </div>
        </div>
        {visible.length ? (
          <div className="example-library">
            {visible.map((scenario) => (
              <article key={scenario.id} className="example-column">
                <ExampleStudy id={scenario.id} />
                <h3>{scenario.title}</h3>
                <p>{scenario.summary}</p>
                <div className="example-actions">
                  <button
                    className="quiet-link"
                    onClick={() => explore(scenario.id)}
                  >
                    {site.possibilities.action}
                    <ArrowUpRight size={18} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`${a.saved.includes(scenario.id) ? "Remove saved" : "Save"} ${scenario.title}`}
                    aria-pressed={a.saved.includes(scenario.id)}
                    onClick={() => a.toggleSaved(scenario.id)}
                  >
                    {a.saved.includes(scenario.id) ? (
                      <Check size={19} />
                    ) : (
                      <Bookmark size={19} />
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="library-empty">
            <h3>A little space for good ideas.</h3>
            <p>Save an example and it will be waiting here.</p>
            <button className="quiet-link" onClick={() => setOnlySaved(false)}>
              See all examples
              <ArrowUpRight size={18} />
            </button>
          </div>
        )}
    </GridSection>
  );
}
