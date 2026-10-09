"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { Workspace } from "@/components/product/Workspace";
import { usePrism } from "@/components/PrismProvider";

export function Hero() {
  const { start, workspaceOpen } = usePrism();
  return (
    <section
      className={`hero container${workspaceOpen ? " hero-workspace-open" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="hero-badge">
          <span className="badge-dot" />
          {site.hero.badge}
          <ArrowUpRight size={13} aria-hidden="true" />
        </p>
        <h1 id="hero-title">
          {site.hero.title}
          <br />
          <span>{site.hero.accent}</span>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => start()}>
            {site.hero.primary}
            <ArrowUpRight size={17} />
          </button>
          <a className="button button-quiet" href="#explore">
            {site.hero.secondary}
            <ArrowRight size={16} />
          </a>
        </div>
        <p className="hero-note">{site.hero.note}</p>
      </div>
      <div className="hero-workspace">
        <div className="workspace-halo" aria-hidden="true" />
        <Workspace />
        <span className="orbit-label orbit-left" aria-hidden="true">
          a thought, taking shape <span>↗</span>
        </span>
        <span className="orbit-label orbit-right" aria-hidden="true">
          a little more possible <span>✳</span>
        </span>
      </div>
      <div className="hero-proof">
        <span className="mono">A SPACE FOR</span>
        {site.hero.proof.map((item) => (
          <span key={item}>
            {item}
            <span className="proof-star" aria-hidden="true">
              ✳
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
