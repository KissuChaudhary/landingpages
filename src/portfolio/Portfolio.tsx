'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { HvProvider, useFinePointer, useHv } from './ui/context';
import Cursor from './ui/Cursor';
import Nav from './ui/Nav';
import Hero from './scenes/Hero';
import Day from './scenes/Day';
import Lifelines from './scenes/Lifelines';
import Work from './scenes/Work';
import Vitals from './scenes/Vitals';
import Allergies from './scenes/Allergies';
import Question from './scenes/Question';
import Outro from './scenes/Outro';
import Chart from './ui/Chart';
import Strip from './ui/Strip';
import { excite } from './lib/heart';

function Site() {
  const fine = useFinePointer();
  const { attachLenis, bootKey } = useHv();
  const rootRef = useRef<HTMLDivElement>(null);

  // always start at the flatline, never mid-story
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const body = document.body.style;
    const prev = { bg: body.backgroundColor, ov: body.overflow };
    body.backgroundColor = '#050606';
    // the hub gives <body> overflow-x:hidden; the moment <html> is locked that turns body into its
    // own scroll container and every position:sticky scene stops sticking. .hv clips instead.
    body.overflow = 'visible';
    return () => {
      body.backgroundColor = prev.bg;
      body.overflow = prev.ov;
    };
  }, []);

  // buttery wheel scrolling; the heart speeds up when you scroll fast
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
    attachLenis(lenis);
    lenis.on('scroll', (l: Lenis) => excite(l.velocity));
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      attachLenis(null);
    };
  }, [attachLenis]);

  // which theme is under the nav? (the logo and nav turn to ink on the daylight sections)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const top = 34;
      const mid = window.innerHeight * 0.5;
      const bottom = window.innerHeight - 20;
      let nav = 'dark';
      let foot = 'dark';
      let page = root.dataset.theme ?? 'dark';
      const sections = root.querySelectorAll<HTMLElement>('main > section[data-theme]');
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= top && r.bottom > top) nav = s.dataset.theme ?? 'dark';
        if (r.top <= bottom && r.bottom > bottom) foot = s.dataset.theme ?? 'dark';
        // the whole page takes the mood of whatever holds the middle of the screen, and fades there
        if (r.top <= mid && r.bottom > mid) page = s.dataset.theme ?? 'dark';
      }
      if (root.dataset.theme !== page) root.dataset.theme = page;
      // the chrome follows the page's fade, except over the scenes that paint their own sky
      if (!isSelfLit(root, top)) nav = page;
      if (!isSelfLit(root, bottom)) foot = page;
      if (root.dataset.nav !== nav) root.dataset.nav = nav;
      if (root.dataset.foot !== foot) root.dataset.foot = foot;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    // sections can re-theme themselves while scrolling (the day scene); poll lightly too
    const id = window.setInterval(check, 400);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      clearInterval(id);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="hv" data-cursor={fine ? 'on' : 'off'} data-theme="dark" data-nav="dark" data-foot="dark">
      {fine && <Cursor />}
      <Nav />
      <main>
        <Hero key={bootKey} />
        <Day />
        <Lifelines />
        <Work />
        <Vitals />
        <Allergies />
        <Question />
        <Outro />
      </main>
      <Strip />
      <Chart />
      <div className="hv-grain" aria-hidden />
    </div>
  );
}

/** sections that paint their own sky (the hero, the day) keep deciding the nav colour themselves */
function isSelfLit(root: HTMLElement, y: number) {
  for (const id of ['top', 'day']) {
    const el = root.querySelector<HTMLElement>(`#${id}`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) return true;
  }
  return false;
}

export default function Portfolio() {
  return (
    <HvProvider>
      <Site />
    </HvProvider>
  );
}
