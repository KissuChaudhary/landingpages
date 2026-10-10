import React from 'react';

/* Behind the hero: a soft blue wash from the top and concentric hairline squircles (the logo's own shape) that open out
 * from the headline and fade, breathing slowly. CSS only; still with reduced motion. */
const RINGS = [340, 500, 660, 820, 980, 1140, 1300];

export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[920px] overflow-hidden">
      <div className="hero-wash absolute inset-0" />
      <div className="hero-rings absolute inset-0">
        {RINGS.map((size, i) => (
          <span
            key={size}
            className="hero-ring"
            style={{ width: size, height: size * 0.62, borderRadius: size * 0.2, '--i': i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
