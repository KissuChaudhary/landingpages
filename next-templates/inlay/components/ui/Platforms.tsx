// Simplified, single-colour marks for the platforms in the Connect section, drawn on a
// 24px grid. They're trademarks of their owners and shown to say "you can embed this".

import type { ReactNode } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const platforms: { name: string; glyph: ReactNode }[] = [
  {
    name: "Instagram",
    glyph: (
      <g {...S}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" />
      </g>
    ),
  },
  {
    name: "YouTube",
    glyph: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4.5" fill="currentColor" />
        <path d="M10 9v6l5.2-3z" fill="#fff" />
      </>
    ),
  },
  {
    name: "Spotify",
    glyph: (
      <>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M6.6 9.3c3.8-1.1 7.9-.8 11 1" strokeWidth="1.9" />
          <path d="M7.2 12.4c3.1-.8 6.3-.5 8.9.9" strokeWidth="1.6" />
          <path d="M7.7 15.3c2.4-.6 4.8-.4 6.8.7" strokeWidth="1.4" />
        </g>
      </>
    ),
  },
  {
    name: "Figma",
    glyph: (
      <g fill="currentColor">
        <path d="M9 2.5h3v6H9a3 3 0 0 1 0-6z" />
        <path d="M12 2.5h3a3 3 0 0 1 0 6h-3z" opacity="0.75" />
        <path d="M9 8.5h3v6H9a3 3 0 0 1 0-6z" opacity="0.85" />
        <circle cx="15" cy="11.5" r="3" opacity="0.6" />
        <path d="M9 14.5h3v3a3 3 0 1 1-3-3z" opacity="0.7" />
      </g>
    ),
  },
  {
    name: "Substack",
    glyph: (
      <g fill="currentColor">
        <path d="M5 3.5h14v2.4H5zM5 7.6h14V10H5zM5 11.7h14v9l-7-3.9-7 3.9z" />
      </g>
    ),
  },
  {
    name: "X",
    glyph: <path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />,
  },
  {
    name: "Twitch",
    glyph: (
      <g {...S}>
        <path d="M5 3h15.5v10.5L16 18h-4l-3 3v-3H5z" />
        <path d="M11 7.5v4M15.5 7.5v4" />
      </g>
    ),
  },
  { name: "Bandcamp", glyph: <path fill="currentColor" d="M2.5 18L8.6 6h12.9l-6.1 12z" /> },
  {
    name: "Patreon",
    glyph: (
      <g fill="currentColor">
        <circle cx="14.5" cy="9.5" r="6.5" />
        <rect x="3" y="3" width="3.6" height="18" rx="0.6" />
      </g>
    ),
  },
  {
    name: "Medium",
    glyph: (
      <g fill="currentColor">
        <ellipse cx="7.2" cy="12" rx="5.2" ry="5.6" />
        <ellipse cx="16" cy="12" rx="2.6" ry="5.1" />
        <ellipse cx="20.6" cy="12" rx="1" ry="4.6" />
      </g>
    ),
  },
  {
    name: "LinkedIn",
    glyph: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="currentColor" />
        <circle cx="7.6" cy="7.6" r="1.6" fill="#fff" />
        <path fill="#fff" d="M6.2 10.2h2.8v7.6H6.2zM10.8 10.2h2.7v1.1c.5-.8 1.4-1.3 2.6-1.3 2.1 0 3 1.3 3 3.6v4.2h-2.8v-3.8c0-1-.4-1.6-1.3-1.6s-1.5.7-1.5 1.6v3.8h-2.7z" />
      </>
    ),
  },
  {
    name: "Dribbble",
    glyph: (
      <g {...S} strokeWidth={1.6}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9.6c4.6.6 10.2.1 14.6-4M8 3.8c3.2 3.7 6.4 9.2 7.4 15.6M3.4 14c3.8-1.8 9.6-2.4 17.1.2" />
      </g>
    ),
  },
  {
    name: "Behance",
    glyph: (
      <g fill="currentColor">
        <path d="M2.5 6h5.2c2 0 3.3 1 3.3 2.7 0 1.1-.6 1.9-1.6 2.3 1.4.3 2.2 1.3 2.2 2.7 0 2-1.5 3.3-3.8 3.3H2.5zm2.6 2.1v2.4h2.2c.8 0 1.3-.5 1.3-1.2s-.5-1.2-1.3-1.2zm0 4.4v2.6h2.4c.9 0 1.5-.5 1.5-1.3s-.6-1.3-1.5-1.3z" />
        <path d="M17.3 9.6c2.5 0 4 1.7 4 4.2v.6h-5.6c.1 1.2.8 1.8 1.8 1.8.7 0 1.2-.3 1.5-.8h2.2c-.5 1.6-1.9 2.6-3.7 2.6-2.4 0-4.1-1.7-4.1-4.2s1.6-4.2 3.9-4.2zm-1.6 3.4h3.2c-.1-1-.7-1.6-1.6-1.6s-1.5.6-1.6 1.6zM15.3 6.6h4.4v1.3h-4.4z" />
      </g>
    ),
  },
  {
    name: "SoundCloud",
    glyph: (
      <g fill="currentColor">
        <path d="M10 17.5V9.6a5.2 5.2 0 0 1 9.9 1.8 3.1 3.1 0 1 1 .4 6.1z" />
        <rect x="7.4" y="10.5" width="1.4" height="7" rx="0.7" />
        <rect x="4.8" y="12" width="1.4" height="5.5" rx="0.7" />
        <rect x="2.2" y="13.6" width="1.4" height="3.9" rx="0.7" />
      </g>
    ),
  },
];
