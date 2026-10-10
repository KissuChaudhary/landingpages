"use client";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/site.config";
import { AgentSculpture } from "@/components/motion/AgentSculpture";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { AgentIcon } from "@/components/ui/AgentIcon";

export function Hero() {
  const h = site.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span />
              {h.eyebrow}
            </p>
          </Reveal>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line">{h.line1}</span>
            <span className="hero-line">{h.line2}</span>
            <span className="hero-word">
              <span className="sr-only">{h.words[0]}</span>
              <RotatingWord words={h.words} interval={3600} />
            </span>
          </h1>
          <Reveal delay={250}>
            <p className="hero-description">{h.description}</p>
          </Reveal>
          <Reveal delay={350}>
            <div className="hero-buttons">
              <Button href="#start">{h.cta}</Button>
              <a className="text-link" href="#workspace">
                {h.secondary}
                <ArrowDown size={15} />
              </a>
            </div>
            <p className="hero-note">{h.note}</p>
          </Reveal>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <AgentSculpture />
          <div className="sculpture-caption">
            <span className="status-dot" />
            MANY MINDS. ONE DIRECTION.
          </div>
          {h.agents.map((a, i) => (
            <div
              key={a.position}
              className={`floating-agent agent-${a.position}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="agent-symbol">
                <AgentIcon name={a.icon} />
              </span>
              <div>
                <strong>{a.label}</strong>
                <span>{a.detail}</span>
              </div>
              <span className="agent-ready">
                <Check size={12} />
              </span>
            </div>
          ))}
          <div className="art-coordinate coord-one">01—06 / IN SYNC</div>
          <div className="art-coordinate coord-two">∞ POSSIBILITIES</div>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>A NEW KIND OF TEAMMATE</span>
        <div className="hero-prompt">
          <span className="prompt-spark">✳</span>
          <span>{h.prompt}</span>
          <a href="#workflow" aria-label="Explore the launch workflow">
            <ArrowUpRight size={17} />
          </a>
        </div>
        <a href="#manifesto" className="scroll-cue">
          A LITTLE FURTHER
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
