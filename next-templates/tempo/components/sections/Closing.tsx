"use client";
import { ArrowUpRight } from "lucide-react";
import { TempoMark } from "@/components/ui/Brand";
import { useTempo } from "@/components/TempoProvider";

export function Closing() {
  const { openApp } = useTempo();
  return (
    <section
      className="closing-section container"
      aria-labelledby="closing-title"
    >
      <div className="closing-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="closing-app-icon">
        <TempoMark />
      </div>
      <p className="eyebrow">A LITTLE SPACE FOR YOURSELF</p>
      <h2 id="closing-title">
        Good things take
        <br />
        <em>a little time.</em>
      </h2>
      <p className="closing-description">Give yourself a little of it.</p>
      <button className="button button-forest" onClick={openApp}>
        Find your rhythm
        <ArrowUpRight size={16} />
      </button>
      <span className="closing-foot">
        Plan a little. Focus a little. Keep the good.
      </span>
    </section>
  );
}
