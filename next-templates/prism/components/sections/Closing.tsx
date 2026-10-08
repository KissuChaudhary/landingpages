"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { usePrism } from "@/components/PrismProvider";

export function Closing() {
  const { start } = usePrism();
  return (
    <section
      className="closing-section container"
      aria-labelledby="closing-title"
    >
      <div className="closing-panel">
        <div className="closing-art" aria-hidden="true">
          {["ribbon", "chair", "botanical", "landscape"].map((image) => (
            <div key={image}>
              <img
                src={asset(`/images/${image}-small.webp`)}
                alt=""
                width="480"
                height="480"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="closing-copy">
          <span className="closing-star" aria-hidden="true">
            ✳
          </span>
          <h2 id="closing-title">
            {site.closing.title}
            <br />
            <span>{site.closing.accent}</span>
          </h2>
          <p>{site.closing.description}</p>
          <button className="button button-primary" onClick={() => start()}>
            {site.closing.action}
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
