'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const LABELS: Record<string, string> = {
  hold: 'Hold',
  open: 'Open',
  top: 'Top',
  go: 'Go',
  close: 'Close',
  next: 'Next',
  visit: 'Visit',
};

/**
 * A phosphor dot exactly where your hand is, and a ring that lags behind it.
 * Anything with data-cursor="open" (etc.) swells the ring into a green label.
 */
export default function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.7 });
  const ry = useSpring(y, { stiffness: 380, damping: 34, mass: 0.7 });
  const [label, setLabel] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null;
      const key = t?.dataset.cursor ?? null;
      setLabel(key && key in LABELS ? LABELS[key] : null);
      setKind(key);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    const dn = () => ringRef.current?.animate([{ transform: 'scale(1)' }, { transform: 'scale(0.8)' }], { duration: 160, fill: 'forwards' });
    const up = () => ringRef.current?.animate([{ transform: 'scale(0.8)' }, { transform: 'scale(1)' }], { duration: 260, fill: 'forwards' });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', dn, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, [x, y]);

  const mode = hidden ? 'hidden' : label ? 'label' : 'idle';
  return (
    <>
      <motion.div className="hv-cursor" style={{ x: rx, y: ry }} data-mode={mode} data-kind={kind ?? undefined} aria-hidden>
        <div ref={ringRef} className="hv-cursor-ring" />
        <span className="hv-cursor-label">{label}</span>
      </motion.div>
      <motion.div className="hv-cursor" style={{ x, y }} data-mode={mode} data-kind={kind ?? undefined} aria-hidden>
        <div className="hv-cursor-dot" />
      </motion.div>
    </>
  );
}
