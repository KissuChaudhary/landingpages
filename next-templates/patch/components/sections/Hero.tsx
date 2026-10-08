"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { usePatch } from "@/components/PatchProvider";
import { Workspace } from "@/components/product/Workspace";
export function Hero() {
  const { start, hero } = usePatch();
  return (
    <section className="hero-section grid-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {site.hero.eyebrow}
        </p>
        <h1 id="hero-title">
          {site.hero.title}
          <br />
          <span className="hero-emphasis">{site.hero.emphasis}</span>
        </h1>
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
        <p className="hero-note">
          <span className="note-cross">+</span>
          {site.hero.note}
        </p>
        <span className="hero-margin-note">
          {site.hero.annotation}
          <span>↓</span>
        </span>
      </div>
      <div className="hero-stage">
        <div className="stage-caption">
          <span>YOUR NEXT GOOD IDEA</span>
          <span>WORKSPACE / 001</span>
        </div>
        <div className="hero-workspace" id="hero-workspace" tabIndex={-1}>
          <Workspace state={hero} compact />
        </div>
        <div className="stage-foot">
          <span>
            <span className="tiny-square" /> THREE WORKING EXAMPLES
          </span>
          <span className="hand-note">
            a small beginning.
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </section>
  );
}
