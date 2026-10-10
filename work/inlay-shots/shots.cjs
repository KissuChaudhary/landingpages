// Every non-photographic image Inlay ships, authored as HTML/SVG.
// render.cjs renders each entry at 2x in headless Chromium and writes WebP into the template.
// Sizes are CSS pixels at 1x. Tile cells on the desktop page are 254px square with 16px gaps.

const C = 254; // one grid cell
const G = 16; // gap
const W2 = C * 2 + G; // two cells wide

// ── Geometric avatars ─────────────────────────────────────────────────────
// Deterministic Bauhaus-style marks: a colour field, a big shape and a small one.
const PAL = ["#2b3bff", "#ff3d2e", "#f3d33c", "#a9e5cb", "#d2cbff", "#0d0e12", "#c3d9ff", "#eceae3"];
function avatar(seed, size = 40) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const pick = (n) => {
    h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    return (h >>> 8) % n;
  };
  const bg = PAL[pick(PAL.length)];
  let fg = PAL[pick(PAL.length)];
  if (fg === bg) fg = PAL[(PAL.indexOf(bg) + 3) % PAL.length];
  let ac = PAL[pick(PAL.length)];
  if (ac === bg || ac === fg) ac = bg === "#0d0e12" ? "#eceae3" : "#0d0e12";
  const kind = pick(4);
  const shapes = [
    `<circle cx="50" cy="100" r="50" fill="${fg}"/><circle cx="72" cy="30" r="12" fill="${ac}"/>`,
    `<path d="M0 100 A100 100 0 0 1 100 0 L100 100Z" fill="${fg}"/><rect x="14" y="14" width="26" height="26" fill="${ac}"/>`,
    `<rect x="0" y="50" width="100" height="50" fill="${fg}"/><circle cx="50" cy="50" r="22" fill="${ac}"/>`,
    `<path d="M0 0 L100 100 L0 100Z" fill="${fg}"/><circle cx="70" cy="34" r="16" fill="${ac}"/>`,
  ][kind];
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" class="av" style="border-radius:99px"><rect width="100" height="100" fill="${bg}"/>${shapes}</svg>`;
}

// ── Icons (1.6px strokes, 20px box) ─────────────────────────────────────────
const I = {
  play: `<svg width="14" height="14" viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>`,
  cal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>`,
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  up: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>`,
  bank: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9.5L12 4l8.5 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20h17"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5z"/></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>`,
  clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  shield: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.5l7.5 3v5.2c0 4.3-3.1 7.6-7.5 8.8-4.4-1.2-7.5-4.5-7.5-8.8V6.5z"/></svg>`,
  card: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18"/></svg>`,
  dl: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>`,
  pen: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z"/></svg>`,
  qr: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/></svg>`,
  apple: `<svg width="14" height="16" viewBox="0 0 17 20"><path fill="currentColor" d="M14.2 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.7 2 5.8 1.1 7.4c-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 1.9 2.7 3.2 2.6 1.3 0 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.6-1-2.6-4.3zM11.6 3c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z"/></svg>`,
};

// ── Artworks ──────────────────────────────────────────────────────────────
// "Low Tide": a bone sun sinking into ultramarine tide lines.
function artLowTide(w, h) {
  const cx = w / 2;
  const cy = h * 0.47;
  const r = Math.min(w, h) * 0.3;
  let bands = "";
  let y = cy;
  let t = 3;
  for (let i = 0; i < 14 && y < h; i++) {
    bands += `<rect x="0" y="${y}" width="${w}" height="${t}" fill="#2b3bff"/>`;
    y += t + Math.max(2, 9 - i * 0.6);
    t += 1.6;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#2b3bff"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eceae3"/>
    <rect x="0" y="${cy}" width="${w}" height="${h - cy}" fill="#eceae3" opacity="0"/>
    ${bands}
    <text x="${w * 0.08}" y="${h * 0.12}" font-family="Mona Sans" font-weight="700" font-size="${w * 0.045}" letter-spacing="${w * 0.012}" fill="#eceae3" style="font-stretch:125%">HALVOR</text>
    <text x="${w * 0.92}" y="${h * 0.12}" text-anchor="end" font-family="Mona Sans" font-weight="500" font-size="${w * 0.04}" fill="#eceae3" opacity="0.8">LP · 2026</text>
  </svg>`;
}

// "Nordlys" poster series, wide: heavy type, a red disc, piano-key bands.
function artNordlys(w, h) {
  const keys = Array.from({ length: 9 }, (_, i) => `<rect x="${w * 0.56 + i * w * 0.045}" y="${h * (0.16 + (i % 3) * 0.06)}" width="${w * 0.028}" height="${h * (0.62 - (i % 4) * 0.07)}" fill="#2b3bff"/>`).join("");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#eceae3"/>
    ${keys}
    <circle cx="${w * 0.47}" cy="${h * 0.58}" r="${h * 0.3}" fill="#ff3d2e"/>
    <text x="${w * 0.045}" y="${h * 0.44}" font-family="Anybody" font-weight="900" font-size="${h * 0.34}" style="font-stretch:150%" letter-spacing="-${h * 0.01}" fill="#0d0e12">NORD</text>
    <text x="${w * 0.045}" y="${h * 0.8}" font-family="Anybody" font-weight="900" font-size="${h * 0.34}" style="font-stretch:150%" letter-spacing="-${h * 0.01}" fill="#0d0e12">LYS</text>
    <g font-family="Mona Sans" font-size="${h * 0.045}" fill="#0d0e12" font-weight="600">
      <text x="${w * 0.045}" y="${h * 0.93}">JAZZ FESTIVAL</text>
      <text x="${w * 0.36}" y="${h * 0.93}">14—17.08.2026</text>
      <text x="${w * 0.955}" y="${h * 0.93}" text-anchor="end">HAVNEHALLEN · KBH</text>
    </g>
    <text x="${w * 0.955}" y="${h * 0.12}" text-anchor="end" font-family="Anybody" font-weight="800" font-size="${h * 0.12}" style="font-stretch:60%" fill="#0d0e12">’26</text>
  </svg>`;
}

// A single tall Nordlys poster (for showcase pages and the build board).
function artNordlysTall(w, h) {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#2b3bff"/>
    <circle cx="${w * 0.62}" cy="${h * 0.36}" r="${w * 0.34}" fill="#ff3d2e"/>
    <rect x="${w * 0.12}" y="${h * 0.12}" width="${w * 0.08}" height="${h * 0.5}" fill="#eceae3"/>
    <rect x="${w * 0.26}" y="${h * 0.2}" width="${w * 0.08}" height="${h * 0.42}" fill="#eceae3"/>
    <text x="${w * 0.08}" y="${h * 0.8}" font-family="Anybody" font-weight="900" font-size="${w * 0.25}" style="font-stretch:120%" fill="#eceae3">NORD</text>
    <text x="${w * 0.08}" y="${h * 0.93}" font-family="Mona Sans" font-weight="600" font-size="${w * 0.06}" fill="#eceae3">14—17.08 · KBH</text>
  </svg>`;
}

// Grotto Display: "Ag" with construction lines.
function artGrotto(w, h, bg = "#f3d33c") {
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${bg}"/>
    <g stroke="#0d0e12" stroke-width="1" opacity="0.28">
      <line x1="0" y1="${h * 0.66}" x2="${w}" y2="${h * 0.66}"/>
      <line x1="0" y1="${h * 0.3}" x2="${w}" y2="${h * 0.3}"/>
      <line x1="0" y1="${h * 0.45}" x2="${w}" y2="${h * 0.45}" stroke-dasharray="3 4"/>
    </g>
    <text x="${w * 0.5}" y="${h * 0.66}" text-anchor="middle" font-family="Anybody" font-weight="800" font-size="${h * 0.5}" style="font-stretch:68%" letter-spacing="-${h * 0.01}" fill="#0d0e12">Ag</text>
  </svg>`;
}

// The "g" being drawn: a bowl and loop with bezier handles.
function artGlyph(w, h) {
  const s = w / 254;
  return `<svg width="${w}" height="${h}" viewBox="0 0 254 ${(254 * h) / w}">
    <rect width="254" height="${(254 * h) / w}" fill="#0d0e12"/>
    <g transform="translate(0 ${((254 * h) / w - 524) / 2})">
    <g stroke="#eceae3" stroke-opacity="0.12" stroke-width="1">
      ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${40 + i * 44}" x2="254" y2="${40 + i * 44}"/>`).join("")}
      <line x1="127" y1="0" x2="127" y2="524"/>
    </g>
    <path d="M127 120 C 72 120 52 160 52 205 C 52 252 84 286 127 286 C 170 286 200 252 200 205 C 200 160 182 120 127 120 Z
             M200 128 C 204 116 214 110 230 112
             M118 286 C 84 292 70 306 70 322 C 70 340 92 346 130 346 C 186 346 214 362 214 398 C 214 440 172 462 124 462 C 74 462 44 440 44 410 C 44 386 66 372 96 368"
          fill="none" stroke="#eceae3" stroke-width="22" stroke-linecap="round"/>
    <g stroke="#2b3bff" stroke-width="1.5" fill="none">
      <line x1="52" y1="160" x2="52" y2="250"/><line x1="72" y1="120" x2="182" y2="120"/>
      <line x1="214" y1="360" x2="214" y2="436"/><line x1="84" y1="462" x2="164" y2="462"/>
    </g>
    <g fill="#0d0e12" stroke="#2b3bff" stroke-width="1.6">
      <rect x="47" y="200" width="10" height="10"/><rect x="122" y="115" width="10" height="10"/><rect x="195" y="200" width="10" height="10"/>
      <rect x="122" y="281" width="10" height="10"/><rect x="209" y="393" width="10" height="10"/><rect x="119" y="457" width="10" height="10"/>
      <circle cx="52" cy="160" r="4"/><circle cx="52" cy="250" r="4"/><circle cx="72" cy="120" r="4"/><circle cx="182" cy="120" r="4"/>
      <circle cx="214" cy="360" r="4"/><circle cx="214" cy="436" r="4"/><circle cx="84" cy="462" r="4"/><circle cx="164" cy="462" r="4"/>
    </g>
    </g>
  </svg>`;
}

// Halftone riso print: dots on a grid fading across.
function artRiso(w, h, ink = "#ff3d2e", paper = "#eceae3", ink2 = "#2b3bff") {
  let dots = "";
  const step = Math.max(8, w / 26);
  for (let y = step / 2; y < h; y += step)
    for (let x = step / 2; x < w; x += step) {
      const d = Math.hypot(x - w * 0.38, y - h * 0.42) / Math.max(w, h);
      const r = Math.max(0, step * 0.5 * (1 - d * 1.6));
      if (r > 0.6) dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="${ink}"/>`;
      const d2 = Math.hypot(x - w * 0.7, y - h * 0.7) / Math.max(w, h);
      const r2 = Math.max(0, step * 0.42 * (1 - d2 * 2.2));
      if (r2 > 0.6) dots += `<circle cx="${x + step * 0.25}" cy="${y + step * 0.25}" r="${r2}" fill="${ink2}" style="mix-blend-mode:multiply"/>`;
    }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${paper}"/>${dots}</svg>`;
}

// Pen-plotter flow field.
function artFlow(w, h, stroke = "#0d0e12", bg = "#eceae3") {
  let paths = "";
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const angle = (x, y) => Math.sin(x / w * 3.2) * 1.6 + Math.cos(y / h * 2.6) * 1.4;
  for (let i = 0; i < 90; i++) {
    let x = rnd() * w;
    let y = rnd() * h;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    for (let k = 0; k < 40; k++) {
      const a = angle(x, y);
      x += Math.cos(a) * (w / 90);
      y += Math.sin(a) * (w / 90);
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${(w / 300).toFixed(2)}" stroke-linecap="round" opacity="0.85"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${paths}</svg>`;
}

// Podcast cover: concentric rings.
function artKettle(w, h) {
  const rings = Array.from({ length: 7 }, (_, i) => `<circle cx="${w / 2}" cy="${h * 0.44}" r="${w * (0.4 - i * 0.052)}" fill="${i % 2 ? "#a9e5cb" : "#0d0e12"}"/>`).join("");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#a9e5cb"/>${rings}
    <text x="${w / 2}" y="${h * 0.93}" text-anchor="middle" font-family="Anybody" font-weight="900" font-size="${w * 0.15}" style="font-stretch:130%" fill="#0d0e12">KETTLE</text></svg>`;
}

// Bold geometric illustration.
function artShapes(w, h, a = "#d2cbff", b = "#2b3bff", c = "#f3d33c") {
  return `<svg width="${w}" height="${h}" viewBox="0 0 100 ${(100 * h) / w}" preserveAspectRatio="xMidYMid slice"><rect width="100" height="${(100 * h) / w}" fill="${a}"/>
    <path d="M0 ${(100 * h) / w} L0 ${(60 * h) / w} A40 40 0 0 1 80 ${(60 * h) / w} L80 ${(100 * h) / w}Z" fill="${b}"/>
    <circle cx="72" cy="${(28 * h) / w}" r="14" fill="${c}"/>
    <rect x="10" y="${(16 * h) / w}" width="22" height="22" fill="#0d0e12"/></svg>`;
}

// ── Tile shots (hero page grid) ─────────────────────────────────────────────
const tiles = {
  // Album with a player bar.
  "tile-album": {
    w: C,
    h: C,
    html: `<div class="shot" style="width:${C}px;height:${C}px">${artLowTide(C, C)}
      <div class="row" style="position:absolute;left:10px;right:10px;bottom:10px;height:52px;padding:0 12px 0 8px;gap:10px;background:#fff;border-radius:14px">
        <div style="width:36px;height:36px;border-radius:99px;background:var(--ultra);color:#fff;display:grid;place-items:center">${I.play}</div>
        <div class="col grow" style="gap:1px"><div class="t-m w6">Low Tide</div><div class="t-xs mut">Halvor · cover by Noa</div></div>
        <svg width="40" height="22" viewBox="0 0 40 22">${[6, 12, 18, 9, 15, 20, 11, 7, 14, 10].map((v, i) => `<rect x="${i * 4}" y="${11 - v / 2}" width="2" height="${v}" rx="1" fill="${i < 4 ? "#2b3bff" : "#c7c9d1"}"/>`).join("")}</svg>
      </div></div>`,
  },
  "tile-nordlys": {
    w: W2,
    h: C,
    html: `<div class="shot" style="width:${W2}px;height:${C}px">${artNordlys(W2, C)}</div>`,
  },
  "tile-glyph": {
    w: C,
    h: W2,
    html: `<div class="shot" style="width:${C}px;height:${W2}px">${artGlyph(C, W2)}
      <div style="position:absolute;left:50%;top:50%;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:99px;background:#fff;color:var(--ink);display:grid;place-items:center">${I.play}</div>
      <div class="pill" style="position:absolute;right:12px;top:12px;background:rgb(255 255 255 / .14);color:#fff;height:24px">4:12</div>
      <div class="col" style="position:absolute;left:16px;right:16px;bottom:16px;gap:3px;color:#fff">
        <div class="t-m w6">Drawing the Grotto g</div><div class="t-xs" style="opacity:.62">Process · 18k views</div></div></div>`,
  },
  "tile-booking": {
    w: C,
    h: C,
    html: `<div class="shot" style="width:${C}px;height:${C}px;background:#fff;padding:18px;display:flex;flex-direction:column">
      <div class="row" style="gap:10px"><div style="width:36px;height:36px;border-radius:11px;background:var(--ultra-tint);color:var(--ultra);display:grid;place-items:center">${I.cal}</div>
        <div class="col"><div class="t-m w6">Poster critique</div><div class="t-xs mut">30 min · video call</div></div></div>
      <div class="t-xs mut w6" style="margin-top:16px;letter-spacing:.02em">NEXT FREE</div>
      <div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">
        <div class="pill" style="background:var(--ultra);color:#fff">Tue 10:00</div>
        <div class="pill" style="box-shadow:inset 0 0 0 1px var(--line-2)">Wed 14:30</div>
        <div class="pill" style="box-shadow:inset 0 0 0 1px var(--line-2)">Thu 09:00</div>
      </div>
      <div class="row" style="margin-top:auto;justify-content:space-between"><div class="t-xl w7" style="letter-spacing:-.02em">€60</div><div class="btn btn-ink" style="height:36px">Book</div></div>
    </div>`,
  },
  "tile-font": {
    w: C,
    h: C,
    html: `<div class="shot" style="width:${C}px;height:${C}px">${artGrotto(C, C)}
      <div class="row" style="position:absolute;left:14px;right:14px;bottom:14px;justify-content:space-between;align-items:flex-end">
        <div class="col"><div class="t-m w7">Grotto Display</div><div class="t-xs" style="opacity:.7">6 weights · OTF + web</div></div>
        <div class="pill" style="background:var(--ink);color:#fff;height:30px;padding:0 12px;font-size:13px">€48</div></div></div>`,
  },
  "tile-letter": {
    w: C,
    h: C,
    html: `<div class="shot" style="width:${C}px;height:${C}px;background:#fff;padding:18px;display:flex;flex-direction:column">
      <div class="row" style="gap:10px"><div style="width:36px;height:36px;border-radius:11px;background:var(--ink);color:#eceae3;display:grid;place-items:center;font-weight:800;font-size:13px;font-stretch:125%">KC</div>
        <div class="col"><div class="t-m w6">Kerning Club</div><div class="t-xs mut">Every Sunday</div></div></div>
      <div style="margin-top:14px;font-size:15px;line-height:1.35;font-weight:500">A short letter about letters: one typeface, one poster, one thing I got wrong.</div>
      <div class="row" style="margin-top:auto;gap:6px"><div class="field grow" style="height:36px;font-size:12.5px">you@email.com</div><div class="btn btn-ultra" style="height:36px;padding:0 14px">Join</div></div>
      <div class="t-xs mut" style="margin-top:8px">4,280 readers</div>
    </div>`,
  },
};

// Stand-ins for the photographs until they're generated (replaced by real photos).
// The open-studio poster: a halftone disc behind condensed type, with an RSVP pill.
tiles["tile-noa"] = {
  w: C,
  h: C,
  html: `<div class="shot" style="width:${C}px;height:${C}px">${artRiso(C, C, "#2b3bff", "#eceae3", "#ff3d2e")}
    <svg width="${C}" height="${C}" viewBox="0 0 ${C} ${C}" style="position:absolute;inset:0">
      <text x="14" y="${C * 0.3}" font-family="Anybody" font-weight="900" font-size="${C * 0.25}" style="font-stretch:62%" letter-spacing="-1" fill="#0d0e12">OPEN</text>
      <text x="14" y="${C * 0.53}" font-family="Anybody" font-weight="900" font-size="${C * 0.25}" style="font-stretch:62%" letter-spacing="-1" fill="#0d0e12">STUDIO</text>
      <text x="${C - 14}" y="24" text-anchor="end" font-family="Mona Sans" font-weight="650" font-size="11" fill="#0d0e12">SAT 18.10</text>
      <text x="${C - 14}" y="38" text-anchor="end" font-family="Mona Sans" font-weight="500" font-size="11" fill="#0d0e12">12—18 · NØRREBRO</text>
    </svg>
    <div class="row" style="position:absolute;left:12px;right:12px;bottom:12px;justify-content:space-between">
      <div class="pill" style="background:#fff;color:var(--ink);height:30px;padding:0 12px">${I.cal.replace(/18/g, "14")} Prints, tea, talks</div>
      <div class="pill" style="background:var(--ink);color:#fff;height:30px;padding:0 12px">RSVP</div>
    </div></div>`,
};
tiles["noa-avatar"] = { w: 64, h: 64, html: `<div class="shot" style="width:64px;height:64px">${avatar("Noa Lindqvist", 64)}</div>` };

module.exports = { tiles, avatar, I, art: { artLowTide, artNordlys, artNordlysTall, artGrotto, artGlyph, artRiso, artFlow, artKettle, artShapes }, C, G, W2 };
