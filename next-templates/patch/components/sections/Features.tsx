"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridCell, GridRow, GridIntersections } from "@/components/ui/Grid";
import { ResponsivePreview } from "@/components/product/ResponsivePreview";
import { FileContext } from "@/components/product/FileContext";
import { AppearancePreview } from "@/components/product/AppearancePreview";
import { ExportPreview } from "@/components/product/ExportPreview";
import { usePatch } from "@/components/PatchProvider";
import { CommandMenu } from "@/components/CommandMenu";
function FeatureCopy({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="feature-copy">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
export function Features() {
  const { command, openCommand, closeCommand } = usePatch();
  const content = site.features;
  return (
    <section
      className="grid-section features-section"
      aria-label="Thoughtful product details"
    >
      <GridIntersections />
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
          <div id="command-menu" className="command-slot">
            {command ? (
              <CommandMenu />
            ) : (
              <div className="key-art" aria-hidden="true">
                <span className="keycap keycap-command">⌘</span>
                <span className="key-plus">+</span>
                <span className="keycap">K</span>
              </div>
            )}
          </div>
          <button
            className="text-link"
            aria-expanded={command}
            aria-controls="command-menu"
            onClick={command ? closeCommand : openCommand}
          >
            {command ? content.keyboard.close : content.keyboard.action}
            <ArrowUpRight size={14} />
          </button>
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
