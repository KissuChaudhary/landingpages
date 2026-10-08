"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridCell, GridRow } from "@/components/ui/Grid";
import { ResponsivePreview } from "@/components/product/ResponsivePreview";
import { FileContext } from "@/components/product/FileContext";
import { AppearancePreview } from "@/components/product/AppearancePreview";
import { ExportPreview } from "@/components/product/ExportPreview";
import { usePatch } from "@/components/PatchProvider";
function FeatureCopy({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-copy">
      <span className="eyebrow">{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function Features() {
  const { openCommand } = usePatch();
  const content = site.features;
  return (
    <section
      className="grid-section features-section"
      aria-label="Thoughtful product details"
    >
      <SectionHeading {...content} />
      <GridRow className="feature-row-primary">
        <GridCell className="feature-responsive">
          <FeatureCopy {...content.preview} />
          <ResponsivePreview />
        </GridCell>
        <GridCell className="feature-context">
          <FeatureCopy {...content.context} />
          <FileContext />
        </GridCell>
      </GridRow>
      <GridRow className="feature-row-secondary">
        <GridCell className="feature-keyboard">
          <FeatureCopy {...content.keyboard} />
          <div className="key-art" aria-hidden="true">
            <span className="keycap keycap-command">⌘</span>
            <span className="key-plus">+</span>
            <span className="keycap">K</span>
          </div>
          <button className="text-link" onClick={openCommand}>
            {content.keyboard.action}
            <ArrowUpRight size={14} />
          </button>
          <span className="keyboard-note">⌘ / CTRL + K</span>
        </GridCell>
        <GridCell className="feature-appearance">
          <FeatureCopy {...content.appearance} />
          <AppearancePreview />
        </GridCell>
        <GridCell className="feature-export">
          <FeatureCopy {...content.export} />
          <ExportPreview />
        </GridCell>
      </GridRow>
    </section>
  );
}
