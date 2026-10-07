'use client';

import { motion } from 'framer-motion';

/**
 * The one header every section uses (modelled on "Twenty-four months, / on a heart monitor."):
 * a numbered kicker, a two-line title where the second line is quieter, and an optional note.
 */
export default function SectionHead({
  n,
  kicker,
  title,
  note,
  meta,
  className = '',
}: {
  n: string;
  kicker: string;
  title: [string, string];
  note?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`hv-wrap ${className}`}>
      <div className="flex items-center justify-between gap-6">
        <div className="hv-label hv-kicker">
          <b>{n}</b>
          <i />
          <span>{kicker}</span>
        </div>
        {meta && <div className="hv-label hidden text-right text-[var(--mute)] sm:block">{meta}</div>}
      </div>
      <div className="mt-5 grid gap-6 md:grid-cols-12 md:items-end">
        <motion.h2
          className="hv-head-title md:col-span-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>{title[0]}</span>
          <span>{title[1]}</span>
        </motion.h2>
        {note && <p className="hv-body max-w-[40ch] text-[15px] md:col-span-4 md:justify-self-end">{note}</p>}
      </div>
    </header>
  );
}
