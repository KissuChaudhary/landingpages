"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Title } from "../ui/Primitives";

// A horizontal rail of outcomes. Scroll, swipe, drag with a mouse or use the arrows;
// the line underneath shows where you are.
export function Outcomes() {
  const { outcomes } = site;
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const sync = () => {
      const max = el.scrollWidth - el.clientWidth;
      bar.current?.style.setProperty("--progress", String(max > 0 ? el.scrollLeft / max : 1));
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    // Drag to scroll with a mouse; touch and trackpads scroll natively.
    let startX = 0, startLeft = 0, dragging = false, moved = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true; moved = false;
      startX = e.clientX; startLeft = el.scrollLeft;
      el.classList.add("is-dragging");
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
    };
    const click = (e: MouseEvent) => moved && e.preventDefault();
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  const nudge = (dir: number) => {
    const el = rail.current;
    const card = el?.querySelector<HTMLElement>(".outcome");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className="section outcomes" id="outcomes">
      <div className="container section-head">
        <Title lines={outcomes.heading} />
        <div className="rail-nav" data-reveal="">
          <button type="button" aria-label="Previous outcome" onClick={() => nudge(-1)}>
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>
          <button type="button" aria-label="Next outcome" onClick={() => nudge(1)}>
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      <div className="rail" ref={rail} role="list" aria-label="What you'll walk out with">
        {outcomes.items.map((item, i) => (
          <article className="outcome" role="listitem" key={item.title} data-reveal="" style={{ "--rx": "48px", "--ry": "0px", "--rd": `${i * 80}ms` } as CSSProperties}>
            <img src={asset(item.image)} width={768} height={1024} alt={item.alt} loading="lazy" decoding="async" draggable={false} />
            <span className="outcome-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="outcome-copy">
              <span className="outcome-eyebrow">{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="container">
        <span className="rail-progress" ref={bar} aria-hidden="true" />
      </div>
    </section>
  );
}
