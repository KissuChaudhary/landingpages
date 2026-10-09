'use client';

import React from 'react';

/* The page's sections down a hairline; a short dark segment of the line glides to the one you're reading. */

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const GLIDE = 'cubic-bezier(0.34,1.36,0.64,1)';

export default function OnThisPage({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = React.useState(sections[0]?.id);
  const [mark, setMark] = React.useState({ top: 0, height: 0, glide: false });
  const refs = React.useRef(new Map<string, HTMLAnchorElement>());

  // The section you're reading is the last one whose heading has passed a line a little under the header.
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      // At the very bottom, the last section counts even if its heading never reaches the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1]?.id;
      setActive((a) => (a === current ? a : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  React.useLayoutEffect(() => {
    const el = active ? refs.current.get(active) : null;
    if (!el) return;
    setMark((m) => (m.top === el.offsetTop && m.height === el.offsetHeight ? m : { top: el.offsetTop, height: el.offsetHeight, glide: m.height > 0 }));
  }, [active]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-[12.5px] font-medium text-[#181925]">On this page</p>
      <ul className="relative border-l border-black/[0.08]">
        <span
          aria-hidden="true"
          className="absolute -left-px top-0 w-px bg-[#181925]"
          style={{ height: mark.height, transform: `translateY(${mark.top}px)`, transition: mark.glide ? `transform 420ms ${GLIDE}, height 320ms ${EASE}` : 'none' }}
        />
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              ref={(el) => {
                if (el) refs.current.set(s.id, el);
                else refs.current.delete(s.id);
              }}
              aria-current={active === s.id ? 'location' : undefined}
              className={`block py-1.5 pl-4 text-[13px] leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                active === s.id ? 'text-[#181925]' : 'text-[#888] hover:text-[#181925]'
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
