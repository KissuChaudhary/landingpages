import React from 'react';

/** One band of a page: a quiet label on the left, the content on the right, a hairline above. */
export default function Row({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="mx-auto max-w-6xl scroll-mt-20 px-5 sm:px-6">
      <div className="grid gap-6 border-t border-neutral-200 py-14 sm:py-20 lg:grid-cols-[220px_1fr] lg:gap-10">
        <h2 id={`${id}-label`} className="text-sm text-neutral-500">
          {label}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
