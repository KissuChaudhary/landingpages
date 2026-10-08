"use client";
import { ArrowUpRight, Braces, Check, PanelTop, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridCell, GridRow } from "@/components/ui/Grid";
import { Workspace } from "@/components/product/Workspace";
import { useExample } from "@/lib/useExample";
import { assetPath } from "@/lib/files";
import { examples } from "@/data/examples";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
const icons = [PanelTop, Braces, Search];
export function WorkspaceSection() {
  const state = useExample("signup", false, "review");
  const { start } = usePatch();
  const content = site.workspace;
  return (
    <section
      id="workspace"
      className="grid-section workspace-section"
      aria-label="Explore the workspace"
    >
      <SectionHeading {...content} />
      <GridRow className="workspace-section-row">
        <GridCell className="workspace-intro">
          <span className="eyebrow">{content.presetsLabel}</span>
          {content.screenshot ? (
            <button className="text-link" onClick={start}>
              {site.actions.start}
              <ArrowUpRight size={16} />
            </button>
          ) : (
            <div
              className="example-presets"
              role="group"
              aria-label="Component examples"
            >
              {examples.map((example, index) => {
                const Icon = icons[index];
                return (
                  <button
                    key={example.id}
                    onClick={() => state.choose(example.id)}
                    aria-pressed={state.id === example.id}
                  >
                    <Icon size={17} />
                    <div>
                      <strong>{example.label}</strong>
                      <span>{example.file}</span>
                    </div>
                    {state.id === example.id ? (
                      <Check size={15} />
                    ) : (
                      <ArrowUpRight size={15} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          <p className="workspace-intro-description">{content.description}</p>
          <div className="workspace-footnote">
            <span className="tiny-square" />
            <p>{content.note}</p>
          </div>
        </GridCell>
        <GridCell className="workspace-main">
          {content.screenshot ? (
            <img
              className="product-screenshot"
              src={assetPath(content.screenshot.src)}
              alt={content.screenshot.alt}
            />
          ) : (
            <Workspace state={state} />
          )}
        </GridCell>
      </GridRow>
    </section>
  );
}
