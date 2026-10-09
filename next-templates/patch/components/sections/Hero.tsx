"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
import { Workspace } from "@/components/product/Workspace";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { GridIntersections } from "@/components/ui/Grid";
export function Hero() {
  const { start, hero } = usePatch();
  return (
    <section className="hero-section grid-section" aria-labelledby="hero-title">
      <GridIntersections />
      <div className="hero-copy">
        <div className="hero-heading">
          <SectionBadge label={site.hero.badge} />
          <h1 id="hero-title">
            {site.hero.title}
            <br />
            <span className="hero-emphasis">{site.hero.emphasis}</span>
          </h1>
        </div>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <button className="button button-accent" onClick={start}>
            {site.actions.try}
            <ArrowUpRight size={17} />
          </button>
          <a className="text-link" href="#workflow">
            {site.hero.secondary}
            <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="hero-workspace" id="hero-workspace" tabIndex={-1}>
          <Workspace state={hero} compact />
        </div>
      </div>
    </section>
  );
}
