"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useHandle } from "@/lib/handle";
import { signupHref } from "@/lib/links";
import { useScrollProgress } from "@/components/Motion";
import { TileWords } from "@/components/ui/TileWords";
import { Button } from "@/components/ui/Action";
import { Bag, Check } from "@/components/ui/Icons";

// One surface that changes shape as you scroll: the product tile on the page grows into
// the checkout, a payment bar sweeps across it, the sheet reshapes into the receipt and
// the sale rises out as a line on the balance. All positions are percentages of the page
// picture (public/images/sell-page.webp); see SHEET below if you change the pictures.

// Where the product tile sits in the page picture, and the two shapes it grows into.
const SHEET = {
  tile: { x: 35.28, y: 17.14, w: 29.17, h: 37.5 },
  checkout: { x: 29, y: 8.15, w: 42, h: 83.7 },
  paid: { x: 29, y: 16.4, w: 42, h: 67.2 },
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const STEPS = ["Tap the tile", "Pay on the page", "The file arrives"];

export function Sell() {
  const { sell } = site;
  const handle = useHandle();
  const sheet = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const veil = useRef<HTMLSpanElement>(null);
  const chip = useRef<HTMLSpanElement>(null);
  const steps = useRef<HTMLOListElement>(null);

  const track = useScrollProgress<HTMLDivElement>(
    (p) => {
      const s = sheet.current;
      if (!s) return;
      const grow = ease(span(p, 0.12, 0.42));
      const reshape = ease(span(p, 0.62, 0.78));
      const { tile, checkout, paid } = SHEET;
      const box = {
        x: mix(mix(tile.x, checkout.x, grow), paid.x, reshape),
        y: mix(mix(tile.y, checkout.y, grow), paid.y, reshape),
        w: mix(mix(tile.w, checkout.w, grow), paid.w, reshape),
        h: mix(mix(tile.h, checkout.h, grow), paid.h, reshape),
      };
      s.style.left = `${box.x}%`;
      s.style.top = `${box.y}%`;
      s.style.width = `${box.w}%`;
      s.style.height = `${box.h}%`;
      const [tileImg, checkoutImg, paidImg] = layers.current;
      if (tileImg) tileImg.style.opacity = String(1 - span(p, 0.2, 0.34));
      if (checkoutImg) checkoutImg.style.opacity = String(span(p, 0.2, 0.34) * (1 - span(p, 0.64, 0.74)));
      if (paidImg) paidImg.style.opacity = String(span(p, 0.64, 0.74));
      if (bar.current) {
        bar.current.style.transform = `scaleX(${span(p, 0.46, 0.6)})`;
        bar.current.style.opacity = String(span(p, 0.44, 0.46) * (1 - span(p, 0.62, 0.66)));
      }
      if (veil.current) veil.current.style.opacity = String(grow * 0.62);
      if (chip.current) {
        const c = ease(span(p, 0.8, 0.92));
        chip.current.style.opacity = String(c);
        chip.current.style.transform = `translate(-50%, ${(1 - c) * 24}px) scale(${0.9 + 0.1 * c})`;
      }
      const step = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      if (steps.current && steps.current.dataset.step !== String(step)) steps.current.dataset.step = String(step);
    },
    (el, vh) => ({ start: vh * 0.12, distance: Math.max(1, el.offsetHeight - vh * 0.9) }),
  );

  return (
    <section className="section sell" id="sell" aria-labelledby="sell-title">
      <div className="container sell-grid">
        <div className="sell-copy">
          <span className="chip" data-reveal="fade">
            <Bag size={15} />
            {sell.label}
          </span>
          <TileWords id="sell-title" text={sell.title} className="h2" tone="citrine" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {sell.description}
          </p>
          <ul className="points js-draw" data-reveal style={{ "--d": "200ms" } as CSSProperties}>
            {sell.points.map((point, j) => (
              <li key={point} style={{ "--dd": `${300 + j * 140}ms` } as CSSProperties}>
                <span className="tick">
                  <Check size={12} draw />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div data-reveal style={{ "--d": "280ms" } as CSSProperties}>
            <Button to={signupHref(handle)} label="Open your shop" tone="ink" />
          </div>
        </div>

        <div className="sell-track" ref={track}>
          <div className="sell-sticky">
            <figure className="sell-stage">
              <img className="sell-page" src={asset(sell.frames.page)} alt={sell.alt} loading="lazy" decoding="async" width={720} height={560} />
              <span className="sell-veil" ref={veil} aria-hidden="true" />
              <div className="sell-sheet" ref={sheet} aria-hidden="true">
                <img
                  ref={(el) => {
                    layers.current[0] = el;
                  }}
                  src={asset("/images/tile-font.webp")}
                  alt=""
                  loading="lazy"
                />
                <img
                  ref={(el) => {
                    layers.current[1] = el;
                  }}
                  src={asset(sell.frames.checkout)}
                  alt=""
                  loading="lazy"
                />
                <img
                  ref={(el) => {
                    layers.current[2] = el;
                  }}
                  src={asset(sell.frames.paid)}
                  alt=""
                  loading="lazy"
                />
                <span className="sell-bar" ref={bar} />
              </div>
              <span className="sell-chip" ref={chip} aria-hidden="true">
                <Check size={12} />
                {sell.receipt}
              </span>
            </figure>
            <ol className="sell-steps" ref={steps} data-step="0" aria-hidden="true">
              {STEPS.map((s, i) => (
                <li key={s} data-i={i}>
                  <span>{i + 1}</span>
                  <em>{s}</em>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
