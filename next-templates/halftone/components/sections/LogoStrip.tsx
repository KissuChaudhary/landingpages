import type { ReactNode } from "react";

import { site } from "@/site.config";
import { Reveal } from "@/components/ui/Reveal";

/*
 * Placeholder wordmarks drawn in markup. Replace each with your customers' SVG logos (monochrome, about 24px tall).
 * The marks cycle through these six shapes in order.
 */
const MARKS: ReactNode[] = [
  <rect key="square" x="3" y="3" width="18" height="18" rx="5" />,
  <circle key="circle" cx="12" cy="12" r="9" />,
  <path key="triangle" d="M12 3.5 21 20H3L12 3.5Z" />,
  <path key="arc" d="M3 20a9 9 0 0 1 18 0h-5a4 4 0 0 0-8 0H3Z" />,
  <path key="diamond" d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5Z" />,
  <path key="bars" d="M3 5h18v4H3zM3 11h12v4H3zM3 17h7v4H3z" />,
];

function Wordmark({ name, index }: { name: string; index: number }) {
  return (
    <span className="flex items-center justify-center gap-2 text-neutral-400 transition-colors duration-300 hover:text-neutral-700">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
        {MARKS[index % MARKS.length]}
      </svg>
      <span className="text-[17px] font-semibold tracking-tight">{name}</span>
    </span>
  );
}

export function LogoStrip() {
  const { logos } = site;
  return (
    <section aria-label="Customers" className="bg-white pb-6 sm:pb-10">
      <Reveal y={16} className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-7 text-center text-[13px] font-medium text-neutral-500">{logos.label}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.names.map((name, index) => (
            <li key={name}>
              <Wordmark name={name} index={index} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
