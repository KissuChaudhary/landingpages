"use client";
import { ArrowDown, ArrowUpRight, Check, Sun } from "lucide-react";
import { site } from "@/site.config";
import { useTempo } from "@/components/TempoProvider";
import { FocusDial } from "@/components/app/FocusDial";
import { Phone } from "@/components/app/Phone";

export function Hero() {
  const { openApp } = useTempo();
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <Sun size={15} />
          {site.hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          aria-label={`${site.hero.title} ${site.hero.emphasis}`}
        >
          {site.hero.title} <em>{site.hero.emphasis}</em>
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <button className="button button-forest" onClick={openApp}>
            {site.hero.primary}
            <ArrowUpRight size={15} />
          </button>
          <a className="button button-text" href="#rhythm">
            {site.hero.secondary}
            <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="stage-caption">
          <span className="mono">A LITTLE TIME, WELL SPENT.</span>
          <span className="mono">TEMPO / EVERYDAY</span>
        </div>
        <div className="stage-instrument">
          <FocusDial />
        </div>
        <div className="stage-bridge">
          <span className="bridge-line" />
          <span className="bridge-note">
            your time,
            <br />
            <em>beautifully kept.</em>
          </span>
          <span className="bridge-arrow">↗</span>
        </div>
        <div className="stage-phone">
          <Phone label="Hero app preview" />
        </div>
        <div className="stage-note">
          <span className="note-pin" />
          <Check size={14} />
          <span>
            A little less hurry.
            <br />
            <strong>A little more you.</strong>
          </span>
        </div>
        <div className="stage-bottom">
          <span>
            <span className="status-dot" />
            AN INTERACTIVE LITTLE PREVIEW
          </span>
          <span>
            Made for your everyday<span aria-hidden="true">✳</span>
          </span>
        </div>
      </div>
      <div className="hero-foot">
        <span>Good days begin with little things.</span>
        <span className="availability">
          Plan. Focus. Reflect.<span className="foot-dot">·</span>A fictional
          app, a real little preview.
        </span>
      </div>
    </section>
  );
}
