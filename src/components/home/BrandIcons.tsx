import React from 'react';

/* The stack's own marks, drawn inline so they stay crisp at 16px. They rest in ink and take their brand colour on hover
 * (see .stack-item in StackStrip). */

type IconProps = { className?: string };

export function NextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M9.4 7.6v8.8H8V7.6h1.4Zm0 0 7.3 10.1a10 10 0 0 1-1.1.8L9.4 9.9V7.6Z" fill="var(--icon-on, #fff)" />
      <path d="M15.9 7.6v6.8h-1.4V7.6h1.4Z" fill="var(--icon-on, #fff)" />
    </svg>
  );
}

export function ReactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      <ellipse cx="12" cy="12" rx="10.4" ry="4.05" />
      <ellipse cx="12" cy="12" rx="10.4" ry="4.05" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10.4" ry="4.05" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TailwindIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.48 6 12 6Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.48 12 7 12Z" />
    </svg>
  );
}

export function TypeScriptIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="3" fill="currentColor" />
      <path
        d="M13.4 12.6h-2.6v7.4H8.9v-7.4H6.3V11h7.1v1.6Zm.6 6.6v-2c.36.3.76.53 1.2.68.44.15.88.23 1.33.23.27 0 .5-.02.69-.07.2-.05.36-.11.49-.2a.84.84 0 0 0 .4-.7.8.8 0 0 0-.16-.48 1.7 1.7 0 0 0-.43-.4 4.6 4.6 0 0 0-.65-.35l-.81-.35c-.74-.31-1.29-.69-1.65-1.13a2.47 2.47 0 0 1-.55-1.6c0-.49.1-.9.29-1.25.2-.35.46-.64.8-.86.33-.23.72-.39 1.16-.5a5.8 5.8 0 0 1 2.48-.05c.33.06.63.14.9.25v1.87a2.8 2.8 0 0 0-.44-.25 3.5 3.5 0 0 0-1-.29 3.3 3.3 0 0 0-.5-.04c-.23 0-.44.02-.62.07-.19.04-.35.1-.48.19a.93.93 0 0 0-.3.29.71.71 0 0 0-.11.39c0 .16.04.3.13.42.08.13.2.25.36.36.15.11.34.22.57.33l.77.34c.39.17.75.34 1.06.53.31.19.58.4.8.64.23.23.4.5.51.8.12.3.18.65.18 1.05 0 .55-.1 1.01-.31 1.38-.2.37-.48.67-.83.9-.35.22-.75.38-1.21.48a7.05 7.05 0 0 1-2.69.03 4.4 4.4 0 0 1-1.09-.34Z"
        fill="var(--icon-on, #fff)"
      />
    </svg>
  );
}

export function ShadcnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round">
      <line x1="208" y1="128" x2="128" y2="208" />
      <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
  );
}
