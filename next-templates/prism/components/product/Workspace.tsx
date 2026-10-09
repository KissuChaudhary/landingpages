"use client";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ImageIcon,
  LoaderCircle,
  Plus,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { artworks, site, type Artwork } from "@/site.config";
import { asset } from "@/lib/assets";
import { BrandMark } from "@/components/ui/Brand";
import { usePrism } from "@/components/PrismProvider";

export function Workspace({ initial = artworks[0] }: { initial?: Artwork }) {
  const id = useId();
  const { request } = usePrism();
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(initial);
  const [result, setResult] = useState(initial);
  const [prompt, setPrompt] = useState(initial.prompt);
  const [style, setStyle] = useState(initial.style);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  // A primary action elsewhere on the page loads its example here and brings
  // the workspace into view.
  useEffect(() => {
    if (!request) return;
    choose(request.artwork);
    const element = root.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    element.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
  function choose(artwork: Artwork) {
    if (timeout.current) clearTimeout(timeout.current);
    setBusy(false);
    setSelected(artwork);
    setResult(artwork);
    setPrompt(artwork.prompt);
    setStyle(artwork.style);
    setStatus(`Example selected: ${artwork.title}`);
  }
  function preview(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus("Preparing the selected example…");
    timeout.current = setTimeout(() => {
      setResult(selected);
      setBusy(false);
      setStatus(
        "Example ready. Your prompt is saved in this preview; no new image was generated.",
      );
    }, 850);
  }
  return (
    <div
      ref={root}
      id="workspace"
      className="workspace"
      tabIndex={-1}
      aria-label={site.workspace.title}
      role="region"
    >
      <div className="workspace-bar">
        <div className="workspace-identity">
          <BrandMark />
          <span>{site.workspace.project}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </div>
        <span className="workspace-mode">
          <span />
          {site.workspace.note}
        </span>
      </div>
      <div className="workspace-body">
        <form className="workspace-controls" onSubmit={preview}>
          <div className="tool-label">
            <Sparkles size={15} aria-hidden="true" />
            <span>Imagine</span>
            <span className="micro-tag">v.01</span>
          </div>
          <label htmlFor={`${id}-prompt`}>{site.workspace.promptLabel}</label>
          <div className="prompt-field">
            <textarea
              id={`${id}-prompt`}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              maxLength={600}
              required
              rows={5}
            />
            <span className="prompt-count">{prompt.length}/600</span>
          </div>
          <label htmlFor={`${id}-style`}>Visual direction</label>
          <div className="select-wrap">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <select
              id={`${id}-style`}
              disabled={busy}
              value={style}
              onChange={(event) => {
                const value = event.target.value;
                setStyle(value);
                const next = artworks.find(
                  (artwork) => artwork.style === value,
                );
                if (next) {
                  setSelected(next);
                  setResult(next);
                }
                setStatus(
                  "Visual direction changed to a matching example. Your prompt is unchanged.",
                );
              }}
            >
              {site.workspace.styles.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
          <div className="preset-label">
            <span>Start somewhere</span>
            <span className="mono">↗</span>
          </div>
          <div className="workspace-presets" aria-label="Example ideas">
            {artworks.slice(0, 3).map((artwork) => (
              <button
                type="button"
                key={artwork.id}
                onClick={() => choose(artwork)}
                aria-label={`Try ${artwork.title}`}
                aria-pressed={selected.id === artwork.id}
                disabled={busy}
              >
                <img
                  src={asset(`/images/${artwork.image}-small.webp`)}
                  alt=""
                  width="480"
                  height="480"
                  loading="lazy"
                />
                {selected.id === artwork.id && (
                  <span>
                    <Check size={12} />
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="button button-primary preview-button"
            aria-disabled={busy}
          >
            {busy ? (
              <LoaderCircle className="spin" size={16} />
            ) : (
              <Sparkles size={16} />
            )}
            {busy ? "Preparing example" : site.workspace.action}
            <span className="key-hint" aria-hidden="true">
              ↵
            </span>
          </button>
        </form>
        <div className="workspace-canvas">
          <div className="canvas-meta">
            <span>
              <ImageIcon size={13} aria-hidden="true" />
              {result.title}
            </span>
            <span className="mono">01 / 01</span>
          </div>
          <div
            className={`canvas-art${busy ? " is-preparing" : ""}`}
            aria-busy={busy}
          >
            <img
              key={result.id}
              src={asset(`/images/${result.image}.webp`)}
              alt={result.alt}
              width="1200"
              height="1200"
              fetchPriority="high"
            />
            <span className="canvas-format">
              {result.style} <span>·</span> 1:1
            </span>
            <span className="canvas-corner corner-tl" />
            <span className="canvas-corner corner-tr" />
            <span className="canvas-corner corner-bl" />
            <span className="canvas-corner corner-br" />
            {busy && (
              <div className="canvas-pending">
                <LoaderCircle className="spin" size={24} />
                <span>Bringing the example into focus</span>
              </div>
            )}
          </div>
          <div className="canvas-bottom">
            <span>
              <span className="status-dot" />
              {busy
                ? "Preparing preview"
                : "A little imagination, made visible"}
            </span>
            <span className="canvas-stamp">
              <Plus size={13} />
              <span>Yours to explore</span>
              <ArrowUpRight size={13} />
            </span>
          </div>
          <div className="workspace-quick">
            <span>Follow a different idea</span>
            <div role="group" aria-label="Hero example ideas">
              {artworks.slice(0, 3).map((artwork) => (
                <button
                  type="button"
                  key={artwork.id}
                  aria-label={`Preview ${artwork.title}`}
                  aria-pressed={selected.id === artwork.id}
                  onClick={() => choose(artwork)}
                >
                  <img
                    src={asset(`/images/${artwork.image}-small.webp`)}
                    alt=""
                    width="480"
                    height="480"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
