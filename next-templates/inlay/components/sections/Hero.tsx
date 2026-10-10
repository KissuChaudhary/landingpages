"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useHandle } from "@/lib/handle";
import { loginHref, signupHref } from "@/lib/links";
import { useMotion } from "@/components/Motion";
import { Claim } from "@/components/sections/Claim";
import { SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";
import { split } from "@/components/ui/TileWords";
import { ArrowRight, Bag, Calendar, Image, Link, Lock, Plus, Video } from "@/components/ui/Icons";

// The tiles start scattered around the headline, drifting and leaning toward the pointer.
// As you scroll they fly down into their places on the example page and settle there.
// Every tile lives in its slot in the markup, so without JavaScript (or with reduced
// motion) the page below is simply complete.

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const toolIcons = [Image, Video, Link, Bag, Calendar];

type Flight = { dx: number; dy: number; r: number; s: number; fade: boolean; depth: number; seed: number };

export function Hero() {
  const { hero, page } = site;
  const { reduced } = useMotion();
  const handle = useHandle();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const fan = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const slots = useRef<(HTMLElement | null)[]>([]);
  const login = loginHref();

  useEffect(() => {
    const root = section.current;
    const st = stage.current;
    const fr = frame.current;
    if (!root || !st || !fr) return;
    if (reduced) {
      root.dataset.landed = "all";
      return;
    }

    let flights: Flight[] = [];
    let land = 1;
    let target = 0;
    let progress = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;
    let started = 0;
    let frameId = 0;
    let visible = true;
    let allLanded = false;
    const last: string[] = [];

    const measure = () => {
      const phone = window.innerWidth < 760;
      // Desktop tiles wait around the headline, placed against the full width of the hero;
      // on phones they're fanned out in their own band under the claim field.
      const box = phone && fan.current ? fan.current.getBoundingClientRect() : st.getBoundingClientRect();
      const s = { left: phone ? box.left : root.getBoundingClientRect().left, top: box.top, width: phone ? box.width : root.clientWidth, height: box.height };
      const sx = s.left + window.scrollX;
      const sy = s.top + window.scrollY;
      flights = page.tiles.map((tile, i) => {
        const slot = slots.current[i];
        if (!slot) return { dx: 0, dy: 0, r: 0, s: 1, fade: true, depth: 1, seed: i };
        const r = slot.getBoundingClientRect();
        const w = r.width;
        const h = r.height;
        const at = phone ? tile.phone : tile.scatter;
        if (!at || r.width === 0) return { dx: 0, dy: 0, r: 0, s: 1, fade: true, depth: 1, seed: i };
        // Wide and tall tiles wait a little smaller so they don't crowd the headline.
        const scale = (phone ? 0.6 : 0.78) * (w > h * 1.4 || h > w * 1.4 ? 0.86 : 1);
        const cx = sx + at.x * s.width + (w * scale) / 2;
        const cy = sy + at.y * s.height + (h * scale) / 2;
        return {
          dx: cx - (r.left + window.scrollX + w / 2),
          dy: cy - (r.top + window.scrollY + h / 2),
          r: at.r,
          s: scale,
          fade: false,
          depth: 0.5 + ((i * 37) % 10) / 10,
          seed: i * 1.7,
        };
      });
      const f = fr.getBoundingClientRect();
      land = Math.max(1, f.top + window.scrollY - window.innerHeight * (phone ? 0.08 : 0.14));
      target = clamp(window.scrollY / land);
    };

    const tick = (now: number) => {
      frameId = 0;
      if (!started) started = now;
      const t = now - started;
      progress += (target - progress) * 0.14;
      if (Math.abs(target - progress) < 0.0005) progress = target;
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;

      let landed = 0;
      flights.forEach((f, i) => {
        const el = tiles.current[i];
        if (!el) return;
        const intro = ease(clamp((t - 150 - i * 85) / 750));
        const local = clamp((progress - i * 0.04) / 0.72);
        const e = ease(local);
        let transform: string;
        let opacity: number;
        if (f.fade) {
          opacity = clamp((progress - 0.55) / 0.35);
          transform = `scale(${0.94 + 0.06 * opacity})`;
        } else {
          const free = 1 - e;
          const bob = Math.sin(t / 1000 * 0.9 + f.seed) * 7 * free;
          const tilt = Math.sin(t / 1000 * 0.6 + f.seed) * 0.9 * free;
          const px = tx * 18 * f.depth * free;
          const py = ty * 12 * f.depth * free;
          const scale = (f.s + (1 - f.s) * e) * (0.72 + 0.28 * intro);
          const rot = f.r * free + tilt + (1 - intro) * -10;
          transform = `translate3d(${(f.dx * free + px).toFixed(1)}px, ${(f.dy * free + bob + py + (1 - intro) * 40).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          opacity = intro;
        }
        const key = `${transform}|${opacity.toFixed(3)}`;
        if (last[i] !== key) {
          el.style.transform = transform;
          el.style.opacity = String(opacity);
          last[i] = key;
        }
        const isLanded = local >= 0.995;
        const slot = slots.current[i];
        if (slot && (slot.dataset.landed === "true") !== isLanded) slot.dataset.landed = String(isLanded);
        if (isLanded) landed++;
      });
      const nowAll = landed === flights.length;
      if (nowAll !== allLanded) {
        allLanded = nowAll;
        root.dataset.landed = nowAll ? "all" : "";
      }
      root.dataset.flying = progress > 0.01 && !nowAll ? "true" : "false";
      if (visible) frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frameId && visible) frameId = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = clamp(window.scrollY / land);
      start();
    };
    const onResize = () => {
      measure();
      start();
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    watch.observe(root);

    measure();
    root.dataset.ready = "true";
    start();
    // Images and fonts can shift the layout after the first paint.
    const remeasure = window.setTimeout(measure, 600);
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(remeasure);
      watch.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced, page.tiles]);

  const address = handle || page.handle;

  return (
    <section className="hero" ref={section} aria-labelledby="hero-title">
      <div className="hero-stage container" ref={stage}>
        <div className="hero-copy">
          <SmartLink to={hero.announcement.href} className="chip hero-chip" data-reveal="fade">
            <span className="chip-tag">{hero.announcement.label}</span>
            {hero.announcement.text}
            <ArrowRight size={14} />
          </SmartLink>
          <h1 id="hero-title" className="h1 hero-title lines tw-host" data-reveal="none" style={{ "--tw-d": "620ms" } as CSSProperties}>
            {hero.title.map((line, i) => (
              <span className="line" key={i} style={{ "--i": i } as CSSProperties}>
                <span>{split(line)}</span>
              </span>
            ))}
          </h1>
          <p className="lead hero-lead" data-reveal style={{ "--d": "260ms" } as CSSProperties}>
            {hero.description}
          </p>
          <div className="hero-claim" id="claim" data-reveal style={{ "--d": "380ms" } as CSSProperties}>
            <Claim />
          </div>
          <div className="hero-fan" ref={fan} aria-hidden="true" />
          {login && (
            <p className="hero-login small" data-reveal="fade" style={{ "--d": "520ms" } as CSSProperties}>
              {hero.login}{" "}
              <SmartLink to={login} className="text-link">
                {site.login}
              </SmartLink>
            </p>
          )}
        </div>
      </div>

      <div className="pf-wrap container">
        <div className="pf" ref={frame}>
          <div className="pf-address" aria-hidden="true">
            <Lock size={12} />
            <span>{site.handleDomain}/</span>
            <TextMorph className="pf-handle">{address}</TextMorph>
          </div>
          <header className="pf-head">
            <img className="pf-avatar" src={asset(page.avatar)} alt="" width={64} height={64} />
            <div className="pf-who">
              <p className="pf-name">{page.name}</p>
              <p className="pf-bio">{page.bio}</p>
            </div>
            <div className="pf-actions" aria-hidden="true">
              {page.actions.map((a, i) => (
                <span key={a} className={i ? "pf-act pf-act-ink" : "pf-act"}>
                  {a}
                </span>
              ))}
            </div>
          </header>
          <div className="pf-grid">
            {page.tiles.map((tile, i) => (
              <figure
                key={tile.slot}
                className={`pf-slot pf-${tile.slot}`}
                ref={(el) => {
                  slots.current[i] = el;
                }}
              >
                <div
                  className="pf-tile"
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                >
                  <img src={asset(tile.image)} alt={tile.alt} loading={i < 4 ? "eager" : "lazy"} decoding="async" />
                </div>
              </figure>
            ))}
            {["x", "y", "z"].map((s) => (
              <span key={s} className={`pf-slot pf-empty pf-${s}`} aria-hidden="true">
                <Plus size={18} />
              </span>
            ))}
          </div>
          <SmartLink to={signupHref(handle)} className="pf-tools" data-dock-hide>
            <span className="pf-tools-add">
              <Plus size={14} /> Add a tile
            </span>
            {page.toolbar.map((label, i) => {
              const Icon = toolIcons[i % toolIcons.length];
              return (
                <span key={label} className="pf-tool" style={{ "--i": i } as CSSProperties}>
                  <Icon size={15} />
                  <span>{label}</span>
                </span>
              );
            })}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
