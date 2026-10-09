"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, X } from "lucide-react";
import type { Artwork } from "@/site.config";
import { asset } from "@/lib/assets";
import { usePrism } from "@/components/PrismProvider";

// The selected idea opens above the grid it came from. Closing it returns
// focus to the card, so keyboard users keep their place.
export function GalleryDetail({
  artwork,
  onClose,
}: {
  artwork: Artwork;
  onClose: () => void;
}) {
  const { start } = usePrism();
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setCopied(false);
    setError("");
    const element = root.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    const bounds = element.getBoundingClientRect();
    if (bounds.top < 80 || bounds.bottom > window.innerHeight)
      element.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }, [artwork]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(artwork.prompt);
      setCopied(true);
      setError("");
    } catch {
      setError("Select the visible prompt to copy it manually.");
    }
  }
  return (
    <section
      ref={root}
      id="gallery-detail"
      className="gallery-detail"
      tabIndex={-1}
      aria-label={`${artwork.title}, in detail`}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <img
        className="detail-art"
        src={asset(`/images/${artwork.image}.webp`)}
        alt={artwork.alt}
        width="1200"
        height="1200"
      />
      <div className="detail-copy">
        <div className="detail-top">
          <span className="eyebrow">{artwork.category}</span>
          <button
            type="button"
            className="icon-button"
            aria-label="Close detail"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <h3>{artwork.title}</h3>
        <div className="detail-tags">
          <span>{artwork.style}</span>
          <span>1:1</span>
          <span>Example art</span>
        </div>
        <p className="mono prompt-heading">THE IDEA</p>
        <p className="detail-prompt">{artwork.prompt}</p>
        <div className="detail-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => start(artwork)}
          >
            Use this idea
            <ArrowUpRight size={16} />
          </button>
          <button
            type="button"
            className="button button-outline"
            onClick={copy}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <p className="detail-note" role="status">
          {error ||
            "Original demo artwork. Explore this preset in the workspace."}
        </p>
      </div>
    </section>
  );
}
