"use client";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { site } from "@/site.config";
import { usePrism } from "@/components/PrismProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CreateVisual,
  ExportVisual,
  RefineVisual,
} from "@/components/product/FeatureVisuals";

const icons = [Sparkles, SlidersHorizontal, Download];
export function Product() {
  const id = useId();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("demo-export") === "1"
    ) {
      setActive(2);
    }
  }, []);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { start } = usePrism();
  const content = site.product.tabs[active];
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className="section product-section container"
      id="product"
      aria-labelledby="product-title"
    >
      <SectionHeading {...site.product} centered id="product-title" />
      <div
        className="product-tabs"
        role="tablist"
        aria-label="Creative workflow"
      >
        {site.product.tabs.map((tab, index) => {
          const Icon = icons[index];
          return (
            <button
              type="button"
              key={tab.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              id={`${id}-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls={`${id}-panel`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <Icon size={16} />
              {tab.label}
              <span className="mono">{tab.number}</span>
            </button>
          );
        })}
      </div>
      <div
        className="product-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className="product-copy" key={content.id}>
          <span className="product-step mono">
            {content.number} / THE {content.label.toUpperCase()} SPACE
          </span>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
          <ul>
            {content.points.map((point) => (
              <li key={point}>
                <Check size={14} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <button className="text-link" onClick={() => start()}>
            Explore the workspace
            <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="product-visual">
          {active === 0 ? (
            <CreateVisual />
          ) : active === 1 ? (
            <RefineVisual />
          ) : (
            <ExportVisual />
          )}
        </div>
      </div>
    </section>
  );
}
