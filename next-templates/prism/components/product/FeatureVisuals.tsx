"use client";
import { useEffect, useId, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  ImageIcon,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { artworks } from "@/site.config";
import { asset } from "@/lib/assets";
import { saveExample } from "@/lib/download";

export function CreateVisual() {
  return (
    <div className="feature-visual create-visual">
      <div className="mini-app-bar">
        <span>
          <Sparkles size={14} />A thought, taking shape
        </span>
        <span className="mono">CREATE / 01</span>
      </div>
      <div className="create-prompt">
        <span className="mono">YOUR IDEA</span>
        <p>
          A different kind of still life.
          <br />
          Citrus, glass, a little sunshine.
        </p>
        <div className="visual-tags">
          <span>Editorial</span>
          <span>Hard daylight</span>
          <span>1:1</span>
        </div>
        <span className="create-prompt-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="create-results">
        {[artworks[4], artworks[0], artworks[1]].map((artwork) => (
          <div key={artwork.id}>
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
      <div className="mini-app-foot">
        <span className="status-dot" />
        One thought can lead somewhere new.
        <Sparkles size={14} />
      </div>
    </div>
  );
}

export function RefineVisual() {
  const id = useId();
  const [position, setPosition] = useState(52);
  return (
    <div className="feature-visual refine-visual">
      <div className="mini-app-bar">
        <span>
          <SlidersIcon />A fresh perspective
        </span>
        <span className="mono">REFINE / 02</span>
      </div>
      <div className="compare-image">
        <img
          src={asset("/images/chair.webp")}
          alt="Coral chair and stone arch with the original warm colour treatment"
          width="1200"
          height="1200"
          loading="lazy"
        />
        <div
          className="compare-original"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={asset("/images/chair.webp")}
            alt=""
            width="1200"
            height="1200"
            loading="lazy"
          />
        </div>
        <span className="compare-line" style={{ left: `${position}%` }}>
          <span>↔</span>
        </span>
        <span className="compare-label before">Muted</span>
        <span className="compare-label after">Warm</span>
      </div>
      <div className="compare-control">
        <label htmlFor={`${id}-compare`}>Compare colour treatments</label>
        <input
          id={`${id}-compare`}
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${position}% muted, ${100 - position}% warm`}
        />
        <span className="mono">{position}%</span>
      </div>
      <p className="visual-note">
        A live colour comparison of the same example image.
      </p>
    </div>
  );
}

function SlidersIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M1 4h12M1 10h12" />
      <circle cx="5" cy="4" r="2" fill="var(--surface)" />
      <circle cx="9" cy="10" r="2" fill="var(--surface)" />
    </svg>
  );
}

export function ExportVisual() {
  const id = useId();
  const [ratio, setRatio] = useState("1:1");
  const [format, setFormat] = useState("PNG");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [embedded, setEmbedded] = useState(false);
  useEffect(() => {
    setEmbedded(window.self !== window.top);
    const params = new URLSearchParams(window.location.search);
    const requestedRatio = params.get("ratio");
    const requestedFormat = params.get("format");
    if (requestedRatio && ["1:1", "4:5", "16:9"].includes(requestedRatio)) {
      setRatio(requestedRatio);
    }
    if (requestedFormat && ["PNG", "JPEG"].includes(requestedFormat)) {
      setFormat(requestedFormat);
    }
  }, []);
  const exportPage = asset(
    process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? "/index.html" : "/",
  );
  const exportQuery = new URLSearchParams({
    "demo-export": "1",
    ratio,
    format,
  });
  const [x, y] = ratio.split(":").map(Number);
  async function save() {
    setBusy(true);
    setMessage("");
    try {
      await saveExample("landscape", ratio, format);
      setMessage("Example prepared. Your browser handles the download.");
    } catch {
      setMessage(
        "The download could not start. Try opening the demo directly in your browser.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="feature-visual export-visual">
      <div className="mini-app-bar">
        <span>
          <Download size={14} />
          Out into the world
        </span>
        <span className="mono">EXPORT / 03</span>
      </div>
      <div className="export-body">
        <div className="export-preview">
          <div style={{ aspectRatio: `${x} / ${y}` }}>
            <img
              src={asset("/images/landscape-small.webp")}
              alt="An alpine sunset cropped to the selected export ratio"
              width="480"
              height="480"
              loading="lazy"
            />
            <span>{ratio}</span>
          </div>
        </div>
        <div className="export-options">
          <span className="mono">MAKE IT FIT</span>
          <div
            className="ratio-options"
            role="group"
            aria-label="Export aspect ratio"
          >
            {["1:1", "4:5", "16:9"].map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={ratio === value}
                onClick={() => {
                  setRatio(value);
                  setMessage("");
                }}
              >
                {value}
              </button>
            ))}
          </div>
          <label htmlFor={`${id}-format`}>File format</label>
          <div className="select-wrap">
            <ImageIcon size={14} />
            <select
              id={`${id}-format`}
              value={format}
              onChange={(event) => {
                setFormat(event.target.value);
                setMessage("");
              }}
            >
              <option>PNG</option>
              <option>JPEG</option>
            </select>
            <ChevronDown size={14} />
          </div>
          <div className="export-details">
            <span>Dimensions</span>
            <span className="mono">1200 × {Math.round((1200 * y) / x)}</span>
          </div>
          <p className="export-ready">
            <Check size={13} />
            Original example artwork
          </p>
          {embedded ? (
            <a
              className="button button-primary button-small"
              href={`${exportPage}?${exportQuery}#product`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open export preview
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <button
              className="button button-primary button-small"
              onClick={save}
              disabled={busy}
            >
              {busy ? (
                <LoaderCircle size={15} className="spin" />
              ) : (
                <Download size={15} />
              )}
              Save example
            </button>
          )}
        </div>
      </div>
      <p className="visual-note" role="status">
        {message ||
          (embedded
            ? "Choose a crop, then open the full preview to save it."
            : "Try a crop and save this example to your device.")}
      </p>
    </div>
  );
}
