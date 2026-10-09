"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  MessagesSquare,
  ChartNoAxesColumn,
  LayoutDashboard,
  GitBranch,
} from "lucide-react";
import { site } from "@/site.config";
import { ReadingText } from "../Motion";
import { Frame } from "../ui/Primitives";
import { FeatureScene } from "../product/FeatureScenes";
export function Product({ standalone = false }: { standalone?: boolean }) {
  const [selected, setSelected] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const icons = [MessagesSquare, ChartNoAxesColumn, LayoutDashboard, GitBranch];
  function key(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % 4
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i + 3) % 4
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 3
              : -1;
    if (next < 0) return;
    e.preventDefault();
    setSelected(next);
    refs.current[next]?.focus();
  }
  return (
    <Frame
      id="product"
      className={`product-section ${standalone ? "product-standalone" : ""}`}
    >
      <div className="section-inner">
        <div className="product-intro">
          <p className="eyebrow">{site.product.label}</p>
          <ReadingText text={site.product.statement} />
        </div>
        <div className="feature-layout">
          <div
            className="feature-stage"
            role="tabpanel"
            id={`feature-panel-${selected}`}
            aria-labelledby={`feature-tab-${selected}`}
            key={selected}
          >
            <FeatureScene selected={selected} />
          </div>
          <div
            className="feature-tabs"
            role="tablist"
            aria-label="Explore the product"
            aria-orientation="vertical"
          >
            {site.product.features.map((feature, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={feature.id}
                  id={`feature-tab-${i}`}
                  role="tab"
                  aria-selected={i === selected}
                  aria-controls={`feature-panel-${i}`}
                  tabIndex={i === selected ? 0 : -1}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  onKeyDown={(e) => key(e, i)}
                  onClick={() => setSelected(i)}
                >
                  <span>
                    <Icon size={21} />
                    <strong>{feature.title}</strong>
                  </span>
                  {selected === i && <p>{feature.text}</p>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Frame>
  );
}
