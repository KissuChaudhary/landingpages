"use client";
import { useId, useState } from "react";
import { Check, Folder, Heart, Plus } from "lucide-react";
import { artworks } from "@/site.config";
import { asset } from "@/lib/assets";

export function StylesVisual() {
  return (
    <div
      className="styles-visual"
      aria-label="Examples of three visual directions"
    >
      {[artworks[0], artworks[2], artworks[3]].map((artwork, i) => (
        <div className={`style-tile style-tile-${i}`} key={artwork.id}>
          <img
            src={asset(`/images/${artwork.image}-small.webp`)}
            alt={artwork.alt}
            width="480"
            height="480"
            loading="lazy"
          />
          <span>{artwork.style}</span>
        </div>
      ))}
    </div>
  );
}
export function CollectionVisual() {
  const [saved, setSaved] = useState(["ribbon", "portrait"]);
  return (
    <div className="collection-visual">
      <div className="collection-bar">
        <Folder size={14} />
        <span>The good ones</span>
        <span className="mono" role="status">
          {saved.length} saved
        </span>
      </div>
      <div className="collection-images">
        {artworks.slice(0, 3).map((artwork) => (
          <div key={artwork.id}>
            <img
              src={asset(`/images/${artwork.image}-small.webp`)}
              alt={artwork.alt}
              width="480"
              height="480"
              loading="lazy"
            />
            <button
              type="button"
              aria-label={`Save ${artwork.title}`}
              aria-pressed={saved.includes(artwork.id)}
              onClick={() =>
                setSaved((current) =>
                  current.includes(artwork.id)
                    ? current.filter((item) => item !== artwork.id)
                    : [...current, artwork.id],
                )
              }
            >
              <Heart
                size={14}
                fill={saved.includes(artwork.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="collection-status">
        <Check size={12} />A little inspiration, kept close.
        <Plus size={13} />
      </div>
    </div>
  );
}
export function CanvasVisual() {
  const [ratio, setRatio] = useState("16:9");
  return (
    <div className="canvas-visual">
      <div
        className="canvas-shape"
        style={{ aspectRatio: ratio.replace(":", "/") }}
      >
        <img
          src={asset("/images/landscape-small.webp")}
          alt="A cinematic mountain landscape in the selected aspect ratio"
          width="480"
          height="480"
          loading="lazy"
        />
        <span className="crop-corner crop-tl" />
        <span className="crop-corner crop-tr" />
        <span className="crop-corner crop-bl" />
        <span className="crop-corner crop-br" />
      </div>
      <div
        className="ratio-options"
        role="group"
        aria-label="Canvas aspect ratio"
      >
        {["1:1", "4:5", "16:9"].map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={ratio === value}
            onClick={() => setRatio(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
export function ToneVisual() {
  const id = useId();
  const [warmth, setWarmth] = useState(40);
  return (
    <div className="tone-visual">
      <div
        className="tone-preview"
        style={{
          filter: `sepia(${warmth / 180}) saturate(${0.7 + warmth / 70})`,
        }}
      >
        <img
          src={asset("/images/headphones-small.webp")}
          alt="Headphones with an adjustable colour treatment"
          width="480"
          height="480"
          loading="lazy"
        />
      </div>
      <div className="tone-controls">
        <div>
          <label htmlFor={`${id}-warmth`}>Warmth</label>
          <span className="mono">{warmth}</span>
        </div>
        <input
          type="range"
          id={`${id}-warmth`}
          min="0"
          max="100"
          value={warmth}
          onChange={(event) => setWarmth(Number(event.target.value))}
        />
        <span className="tone-swatches" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
