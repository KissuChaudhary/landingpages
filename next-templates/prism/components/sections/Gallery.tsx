"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { artworks, site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryDetail } from "@/components/product/GalleryDetail";

export function Gallery() {
  const [filter, setFilter] = useState("All ideas");
  const [selected, setSelected] = useState<string | null>(null);
  const visible = artworks.filter(
    (artwork) => filter === "All ideas" || artwork.category === filter,
  );
  const open = visible.find((artwork) => artwork.id === selected);
  return (
    <section
      id="explore"
      className="section gallery-section container"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-heading">
        <SectionHeading {...site.gallery} id="gallery-title" />
        <span className="gallery-count mono">
          THE POSSIBILITY INDEX / {String(artworks.length).padStart(2, "0")}
        </span>
      </div>
      <div className="gallery-filters" role="group" aria-label="Filter artwork">
        {site.gallery.filters.map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={value === filter}
            onClick={() => {
              setFilter(value);
              setSelected(null);
            }}
          >
            {value}
            {value === "All ideas" && <span>{artworks.length}</span>}
          </button>
        ))}
      </div>
      {open && (
        <GalleryDetail
          artwork={open}
          onClose={() => {
            setSelected(null);
            document.getElementById(`gallery-card-${open.id}`)?.focus();
          }}
        />
      )}
      <div className="gallery-grid">
        {visible.map((artwork) => (
          <button
            className="gallery-card"
            key={artwork.id}
            id={`gallery-card-${artwork.id}`}
            onClick={() => setSelected(artwork.id)}
            aria-expanded={open?.id === artwork.id}
            aria-controls="gallery-detail"
            aria-label={`Explore ${artwork.title}`}
          >
            <div
              className="gallery-image"
              style={{ background: artwork.background }}
            >
              <img
                src={asset(`/images/${artwork.image}-small.webp`)}
                alt={artwork.alt}
                width="480"
                height="480"
                loading="lazy"
              />
              <span className="gallery-category">{artwork.category}</span>
              <span className="gallery-open">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="gallery-caption">
              <span>{artwork.title}</span>
              <span className="mono">
                {String(artworks.indexOf(artwork) + 1).padStart(2, "0")}
                <span aria-hidden="true"> ↗</span>
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="gallery-footer">
        <p>{site.gallery.note}</p>
        <span className="mono" role="status">
          {visible.length} {visible.length === 1 ? "idea" : "ideas"} to explore
        </span>
      </div>
    </section>
  );
}
