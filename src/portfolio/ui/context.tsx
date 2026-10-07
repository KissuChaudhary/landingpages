'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { readStoredSound, setSound as setSoundEngine, onSoundChange, isSoundOn } from '../lib/sfx';

/** boot: flatlined, waiting for the shock · writing: the heart is back and signing · alive: go */
export type Phase = 'boot' | 'writing' | 'alive';

interface Ctx {
  phase: Phase;
  setPhase: (p: Phase) => void;
  sound: boolean;
  toggleSound: () => void;
  lenis: React.MutableRefObject<Lenis | null>;
  /** Hand the Lenis instance over; it starts stopped if something already holds a lock. */
  attachLenis: (l: Lenis | null) => void;
  /** Stop / resume page scrolling (boot, modals). Counted, so nested locks are safe. */
  lockScroll: (on: boolean) => void;
  scrollTo: (target: string | number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
  /** The product chart (modal) that is open, and where the click came from (for the reveal). */
  chart: { id: string; x: number; y: number } | null;
  openChart: (id: string, origin?: { x: number; y: number }) => void;
  closeChart: () => void;
  /** Bumped to remount the hero: flatline the site again from the top. */
  bootKey: number;
  replay: () => void;
}

const HvContext = createContext<Ctx | null>(null);

export function HvProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('boot');
  const [sound, setSoundState] = useState(true);
  const lenis = useRef<Lenis | null>(null);
  const locks = useRef(0);
  const [chart, setChart] = useState<Ctx['chart']>(null);
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const on = (e: PointerEvent) => {
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointerdown', on, { passive: true, capture: true });
    return () => window.removeEventListener('pointerdown', on, { capture: true });
  }, []);

  const openChart = useCallback((id: string, origin?: { x: number; y: number }) => {
    const o = origin ?? (lastPointer.current.x || lastPointer.current.y ? lastPointer.current : { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setChart({ id, x: o.x, y: o.y });
  }, []);
  const closeChart = useCallback(() => setChart(null), []);

  const [bootKey, setBootKey] = useState(0);
  const replay = useCallback(() => {
    setChart(null);
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setPhase('boot');
    setBootKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const stored = readStoredSound();
    setSoundEngine(stored, false);
    setSoundState(stored);
    return onSoundChange(setSoundState);
  }, []);

  const toggleSound = useCallback(() => setSoundEngine(!isSoundOn()), []);

  const lockScroll = useCallback((on: boolean) => {
    locks.current = Math.max(0, locks.current + (on ? 1 : -1));
    const locked = locks.current > 0;
    const root = document.documentElement;
    root.style.overflow = locked ? 'hidden' : '';
    if (locked) lenis.current?.stop();
    else lenis.current?.start();
  }, []);

  const attachLenis = useCallback((l: Lenis | null) => {
    lenis.current = l;
    if (l && locks.current > 0) l.stop();
  }, []);

  const scrollTo = useCallback<Ctx['scrollTo']>((target, opts) => {
    const l = lenis.current;
    if (l) {
      l.scrollTo(target as never, { immediate: opts?.immediate, offset: opts?.offset ?? 0, duration: 1.6, force: true });
      return;
    }
    let y = 0;
    if (typeof target === 'number') y = target;
    else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
    }
    window.scrollTo({ top: y, behavior: opts?.immediate ? 'auto' : 'smooth' });
  }, []);

  const value = useMemo(
    () => ({ phase, setPhase, sound, toggleSound, lenis, attachLenis, lockScroll, scrollTo, chart, openChart, closeChart, bootKey, replay }),
    [phase, sound, toggleSound, attachLenis, lockScroll, scrollTo, chart, openChart, closeChart, bootKey, replay],
  );
  return <HvContext.Provider value={value}>{children}</HvContext.Provider>;
}

export function useHv() {
  const c = useContext(HvContext);
  if (!c) throw new Error('useHv must be used inside <HvProvider>');
  return c;
}

/** true once we know the primary pointer is a mouse/trackpad. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
}
