'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ALLERGIES } from '../data';
import { useFinePointer } from '../ui/context';
import SectionHead from '../ui/SectionHead';

interface Body {
  el: HTMLSpanElement;
  cx: number;
  cy: number;
  /** spring offset */
  x: number;
  y: number;
  vx: number;
  vy: number;
  heat: number;
  /** what was actually applied last frame (offset + shiver), to recover the resting centre */
  tx: number;
  ty: number;
}

const R = 200; // reach of the reaction, px
const INK = [237, 240, 238];
const RED = [255, 59, 79];

/**
 * Things I can't stand. Every word is allergic to your cursor: it flinches away, flushes red,
 * and shivers until you leave it alone.
 */
export default function Allergies() {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = !!useReducedMotion();

  useEffect(() => {
    const section = ref.current;
    if (!section || !fine || reduced) return;
    const words = Array.from(section.querySelectorAll<HTMLSpanElement>('[data-word]'));
    const bodies: Body[] = words.map((el) => ({ el, cx: 0, cy: 0, x: 0, y: 0, vx: 0, vy: 0, heat: 0, tx: 0, ty: 0 }));
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let visible = false;
    let last = 0;

    const frame = (t: number) => {
      const dt = Math.min(32, last ? t - last : 16) / 16;
      last = t;
      // read every resting centre first (live, so scrolling and reveal animations can't desync it)...
      for (const b of bodies) {
        const r = b.el.getBoundingClientRect();
        b.cx = r.left + r.width / 2 - b.tx;
        b.cy = r.top + r.height / 2 - b.ty;
      }
      // ...then move everything
      let active = false;
      for (const b of bodies) {
        const dx = b.cx + b.x - mx;
        const dy = b.cy + b.y - my;
        const dist = Math.hypot(dx, dy) || 1;
        let fx = 0;
        let fy = 0;
        if (dist < R) {
          const f = Math.pow(1 - dist / R, 2) * 3.6;
          fx = (dx / dist) * f;
          fy = (dy / dist) * f;
          b.heat = Math.min(1, b.heat + (1 - dist / R) * 0.14 * dt);
        } else {
          b.heat = Math.max(0, b.heat - 0.018 * dt);
        }
        // spring back home, with a bit of drag
        b.vx = (b.vx + (fx - b.x * 0.08) * dt) * Math.pow(0.82, dt);
        b.vy = (b.vy + (fy - b.y * 0.08) * dt) * Math.pow(0.82, dt);
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const shiver = b.heat > 0.35 ? (Math.random() - 0.5) * b.heat * 2.4 : 0;
        const rot = b.x * 0.16;
        b.tx = b.x + shiver;
        b.ty = b.y + shiver * 0.6;
        b.el.style.transform = `translate3d(${b.tx.toFixed(2)}px, ${b.ty.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        const h = b.heat;
        if (h < 0.01) {
          // calm again: hand the colour back to the page theme
          if (b.el.style.color) {
            b.el.style.color = '';
            b.el.style.textShadow = '';
          }
        } else {
          b.el.style.color = `rgb(${Math.round(INK[0] + (RED[0] - INK[0]) * h)},${Math.round(INK[1] + (RED[1] - INK[1]) * h)},${Math.round(INK[2] + (RED[2] - INK[2]) * h)})`;
          b.el.style.textShadow = h > 0.05 ? `0 0 ${Math.round(26 * h)}px rgba(255,59,79,${(0.6 * h).toFixed(2)})` : 'none';
        }
        if (Math.abs(b.x) > 0.05 || Math.abs(b.y) > 0.05 || b.heat > 0.001) active = true;
      }
      // keep listening the whole time the list is on screen; rest only when it's gone and calm
      if (visible || active) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const kick = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (visible) kick();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(section);
    const scroll = () => visible && kick();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  return (
    <section ref={ref} id="allergies" data-theme="dark" className="hv-section overflow-hidden pb-[20vh] pt-[14vh]" aria-label="Things I can't stand">
      <SectionHead
        n="05"
        kicker="Known allergies"
        title={['Things I’m allergic to.', 'You probably are too.']}
        note={fine ? 'Two years of building alone, in one list. Get close to one and watch it react.' : 'Two years of building alone, in one list.'}
      />
      <div className="hv-wrap">
        <ol className="mt-[9vh] border-t border-[var(--line)]">
          {ALLERGIES.map((a, i) => (
            <motion.li
              key={a}
              className="flex items-baseline gap-4 border-b border-[var(--line)] py-[1.1vh] sm:gap-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hv-label w-7 shrink-0 text-[var(--mute)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[clamp(22px,3.7vw,58px)] font-[620] leading-[1.08] tracking-[-0.04em]">
                {a.split(' ').map((w, j) => (
                  <span key={j} data-word className="inline-block will-change-transform" style={{ marginRight: '0.24em' }}>
                    {w}
                  </span>
                ))}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
