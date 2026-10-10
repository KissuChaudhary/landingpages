export function ServiceArt({ type }: { type: string }) {
  if (type === "strategy")
    return (
      <svg viewBox="0 0 360 270" fill="none" aria-hidden="true">
        <path d="M45 43h242v158H45V43Z" stroke="currentColor" strokeWidth="2" />
        <path
          d="m111 200-32 35v-35M85 92h162M85 128h110"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="268" cy="172" r="59" fill="var(--accent)" />
        <path d="m244 177 16 16 36-40" stroke="var(--bg)" strokeWidth="3" />
      </svg>
    );
  if (type === "creative")
    return (
      <svg viewBox="0 0 360 270" fill="none" aria-hidden="true">
        <g transform="rotate(-12 110 140)">
          <rect
            x="45"
            y="55"
            width="147"
            height="171"
            rx="9"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M66 187 99 148l28 29 29-54 17 64H66Z" fill="currentColor" />
          <circle cx="90" cy="103" r="14" fill="currentColor" />
        </g>
        <g transform="rotate(11 246 129)">
          <rect
            x="183"
            y="29"
            width="130"
            height="174"
            rx="9"
            fill="var(--accent)"
          />
          <path
            d="m227 89 43 26-43 26V89Z"
            stroke="var(--bg)"
            strokeWidth="2"
          />
          <path d="M201 179h94" stroke="var(--bg)" strokeWidth="2" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 360 270" fill="none" aria-hidden="true">
      <circle
        cx="180"
        cy="130"
        r="88"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 9"
      />
      <ellipse
        cx="180"
        cy="130"
        rx="135"
        ry="45"
        transform="rotate(-28 180 130)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="180" cy="130" r="36" fill="var(--accent)" />
      <path d="m167 132 9 9 18-22" stroke="var(--bg)" strokeWidth="2" />
      <circle cx="299" cy="72" r="13" fill="currentColor" />
      <circle cx="74" cy="188" r="7" fill="var(--accent)" />
    </svg>
  );
}
