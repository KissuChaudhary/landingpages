// Renders the Bounce course-platform screens to WebP for next-templates/bounce/public/images.
// Usage: node work/bounce-shots/render.cjs
const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require(path.join(process.env.USERPROFILE, "AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright-core"));
const sharp = require("../../next-templates/conduit/node_modules/sharp");

const images = path.resolve(__dirname, "../../next-templates/bounce/public/images");
const out = path.join(__dirname, "out");
fs.mkdirSync(out, { recursive: true });
const photo = (name) => `data:image/webp;base64,${fs.readFileSync(path.join(images, `${name}.webp`)).toString("base64")}`;

const C = { pink: "#ff3d8b", violet: "#7b5cff", blue: "#2f6bff", lime: "#b8f24a", cyan: "#19c4d8", amber: "#ffb020" };
const css = `
*{box-sizing:border-box;margin:0;padding:0}html,body{background:transparent}
body{font-family:Figtree,sans-serif;font-size:13px;color:#121216;-webkit-font-smoothing:antialiased;font-feature-settings:"tnum" 1}
.d{font-family:"Bricolage Grotesque",sans-serif;letter-spacing:-.03em}
.mono{font-family:"Geist Mono",monospace;letter-spacing:-.02em}
.row{display:flex;align-items:center}.col{display:flex;flex-direction:column}.g6{gap:6px}.g8{gap:8px}.g10{gap:10px}.g12{gap:12px}.between{justify-content:space-between}
small{font-size:11.5px;color:#6b6d7b}
.av{width:28px;height:28px;border-radius:50%;object-fit:cover;flex:none}
.pill{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:99px;font-size:11.5px;font-weight:600}
.btn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 13px;border-radius:99px;font-size:12.5px;font-weight:600;background:#f1f1f5;color:#121216}
.card{background:#fff;border-radius:18px;box-shadow:0 0 0 1px #ececf1}
`;

// Deterministic waveform: louder in choruses, quieter in the intro and outro.
function wave(n, seed = 7) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const sections = [[0, 0.1, 0.35], [0.1, 0.32, 0.62], [0.32, 0.5, 0.95], [0.5, 0.68, 0.6], [0.68, 0.88, 1], [0.88, 1, 0.3]];
  return Array.from({ length: n }, (_, i) => {
    const t = i / n;
    const sec = sections.find(([a, b]) => t >= a && t < b) || sections[5];
    return Math.max(0.12, Math.min(1, sec[2] * (0.55 + rnd() * 0.5)));
  });
}
const sectionColor = (t) => (t < 0.1 ? "#9aa0c8" : t < 0.32 ? C.cyan : t < 0.5 ? C.pink : t < 0.68 ? C.cyan : t < 0.88 ? C.pink : "#9aa0c8");

function player(width, bars, opts = {}) {
  const amps = wave(bars);
  const head = 1.7 / 3.3; // 1:42 of 3:18
  const barW = (width - 40) / bars;
  const marks = opts.marks ?? [[0.515, "teacher", C.pink], [0.64, "kenji", C.cyan], [0.85, "teacher", C.pink], [0.22, "ruth", C.lime]];
  return `<div style="background:#14141b;border-radius:20px;padding:18px 20px 16px;color:#fff;position:relative">
  <div class="row between"><div class="row g12"><span style="width:38px;height:38px;border-radius:50%;background:#fff;display:grid;place-items:center"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="#14141b"/></svg></span>
  <div class="col"><b style="font-size:14px">night-bus_v4.wav</b><span style="font-size:11.5px;color:#9a9cb0">Kenji Mori · uploaded Tuesday</span></div></div>
  <span class="mono" style="font-size:13px;color:#cfd0dc">1:42 <span style="color:#6d6f82">/ 3:18</span></span></div>
  <div style="position:relative;height:${opts.h ?? 120}px;margin-top:${opts.mt ?? 34}px">
   ${marks.map(([t, who, c]) => `<div style="position:absolute;left:${t * 100}%;top:-30px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center"><img class="av" src="${photo(who)}" style="width:24px;height:24px;box-shadow:0 0 0 2px ${c}"><span style="width:2px;height:10px;background:${c};border-radius:2px;margin-top:2px"></span></div>`).join("")}
   <div style="position:absolute;inset:0;display:flex;align-items:center;gap:${Math.max(1, barW * 0.32).toFixed(1)}px">
   ${amps.map((a, i) => { const t = i / bars; return `<i style="display:block;flex:1;height:${(a * 100).toFixed(1)}%;border-radius:3px;background:${sectionColor(t)};opacity:${t < head ? 1 : 0.38}"></i>`; }).join("")}
   </div>
   <div style="position:absolute;left:${head * 100}%;top:-6px;bottom:-6px;width:2px;background:#fff;border-radius:2px"></div>
  </div>
  <div class="row" style="margin-top:12px;font-size:11px;color:#7d7f94">${["Intro", "Verse", "Chorus", "Verse 2", "Chorus", "Outro"].map((l, i) => `<span style="flex:${[10, 22, 18, 18, 20, 12][i]}">${l}</span>`).join("")}</div>
  </div>`;
}

const comment = (who, name, time, color, text, tag) => `<div class="row g12" style="align-items:flex-start;padding:14px 0;border-top:1px solid #f0f0f4">
  <img class="av" src="${photo(who)}" style="width:34px;height:34px"><div class="col" style="flex:1;gap:4px">
  <div class="row g8"><b style="font-size:13px">${name}</b><span class="pill mono" style="height:20px;background:${color}22;color:${color === C.lime ? "#4d6b00" : color}">${time}</span>${tag ? `<span class="pill" style="height:20px;background:#f1f1f5;color:#6b6d7b">${tag}</span>` : ""}</div>
  <span style="font-size:13px;line-height:1.45;color:#2c2d38">${text}</span></div></div>`;

function desktop() {
  const lessons = [["Gain staging and balance", "12 min", 1], ["EQ for space, not shine", "18 min", 1], ["Compression without fear", "16 min", 2], ["Depth with reverb and delay", "14 min", 0], ["Mixing on headphones", "11 min", 0]];
  return `<div style="width:1360px;height:860px;background:#f6f6f9;border-radius:24px;overflow:hidden;box-shadow:0 0 0 1px #e6e6ee;display:flex;flex-direction:column">
  <div class="row between" style="height:62px;padding:0 24px;background:#fff;border-bottom:1px solid #ececf1">
   <div class="row g12"><span style="width:28px;height:28px;border-radius:8px;background:#121216;display:grid;grid-template-columns:1fr 1fr;gap:3px;padding:6px">${[0, 1, 2, 3].map((i) => `<i style="border-radius:2px;background:${i === 1 ? C.pink : "#fff"}"></i>`).join("")}</span><b class="d" style="font-size:18px">bounce</b>
   <span style="color:#c4c5d0;margin:0 4px">/</span><span style="color:#6b6d7b;font-weight:500">Cohort 07</span><span style="color:#c4c5d0">/</span><b style="font-weight:600">Week 5 · Mix</b></div>
   <div class="row g12"><span class="pill" style="background:#ffe8f1;color:${C.pink}"><i style="width:7px;height:7px;border-radius:50%;background:${C.pink}"></i>Live Thursday 18:00</span><span class="btn">Crew</span><img class="av" src="${photo("kenji")}" style="width:32px;height:32px"></div></div>
  <div style="flex:1;display:grid;grid-template-columns:1fr 330px;gap:18px;padding:20px 24px">
   <div class="col g12">
    <div class="row between"><div><div class="d" style="font-size:24px;font-weight:700">Night Bus</div><small>Your project · version 4 of 4</small></div>
    <div class="row g8"><span style="display:inline-flex;padding:3px;border-radius:99px;background:#ececf2"><span class="btn" style="height:28px;background:transparent;color:#6b6d7b">v3</span><span class="btn" style="height:28px;background:#121216;color:#fff">v4</span></span><span class="btn" style="background:${C.pink};color:#fff">Upload v5</span></div></div>
    ${player(946, 150)}
    <div class="card" style="padding:4px 20px 6px;flex:1">
     <div class="row between" style="padding:14px 0 10px"><b class="d" style="font-size:16px">Feedback on v4</b><small>4 notes · 1 resolved</small></div>
     ${comment("teacher", "Theo Vance", "1:42", C.pink, "Kick and bass fight here. Sidechain the bass 3 to 4 dB, or move the bass note up an octave for these two bars.", "Teacher")}
     ${comment("kenji", "Kenji Mori", "2:10", C.cyan, "Trying the octave move first. The filter sweep into the chorus finally works, thanks!")}
     ${comment("teacher", "Theo Vance", "2:48", C.pink, "Lead hides behind the pads in the last chorus. Bring it up 1 dB or cut the pads around 2 kHz.", "Teacher")}
     ${comment("ruth", "Ruth Ellison", "0:44", C.lime, "That vinyl texture under the intro is gorgeous. How did you get the crackle to sit so low?", "Resolved")}
     <div class="row g10" style="margin:6px 0 14px;padding:8px 8px 8px 14px;border-radius:99px;background:#f4f4f8"><span class="pill mono" style="background:#ffe8f1;color:#ff3d8b">1:42</span><span style="flex:1;color:#8a8c9c">Reply to Theo at 1:42…</span><span class="btn" style="background:#121216;color:#fff">Send</span></div>
    </div>
   </div>
   <div class="col g12">
    <div class="card" style="padding:18px"><div class="row g10"><span style="width:10px;height:36px;border-radius:4px;background:${C.cyan}"></span><div><small>Week 5 of 6</small><div class="d" style="font-size:20px;font-weight:700">Mix</div></div></div>
     <div style="margin-top:14px">${lessons.map(([t, d, s], i) => `<div class="row g10" style="padding:10px 0;border-top:1px solid #f0f0f4"><span style="width:22px;height:22px;border-radius:50%;display:grid;place-items:center;flex:none;${s === 1 ? `background:${C.cyan};color:#fff` : s === 2 ? `box-shadow:inset 0 0 0 2px ${C.cyan}` : "box-shadow:inset 0 0 0 1.5px #dcdce4"}">${s === 1 ? '<svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ""}</span><span style="flex:1;font-weight:${s === 2 ? 700 : 500}">${t}</span><small>${d}</small></div>`).join("")}</div></div>
    <div class="card" style="padding:18px;background:#121216;color:#fff;box-shadow:none"><small style="color:#9a9cb0">This week's assignment</small><div class="d" style="font-size:18px;font-weight:700;margin-top:4px">A mix checked on three systems</div>
     <div class="row g8" style="margin-top:14px">${["Headphones", "Phone", "Car"].map((x, i) => `<span class="pill" style="background:${i < 2 ? C.lime : "#2a2a35"};color:${i < 2 ? "#121216" : "#cfd0dc"}">${i < 2 ? "✓ " : ""}${x}</span>`).join("")}</div><small style="display:block;margin-top:12px;color:#9a9cb0">Due Sunday 9 Nov</small></div>
    <div class="card" style="padding:18px"><div class="row between"><b>Crew this week</b><small>14 of 60 in</small></div>
     <div class="row" style="margin-top:12px">${["ama", "ruth", "arjun", "valeria", "karim"].map((n, i) => `<img class="av" src="${photo(n)}" style="width:34px;height:34px;box-shadow:0 0 0 2px #fff;margin-left:${i ? -8 : 0}px">`).join("")}<span style="margin-left:8px;font-size:12px;color:#6b6d7b;font-weight:600">+9</span></div>
     <div style="height:8px;border-radius:99px;background:#f0f0f4;margin-top:14px;overflow:hidden"><i style="display:block;height:100%;width:23%;background:${C.violet};border-radius:99px"></i></div></div>
   </div>
  </div></div>`;
}

function phone() {
  return `<div style="width:390px;background:#f6f6f9;border-radius:26px;overflow:hidden;box-shadow:0 0 0 1px #e6e6ee;padding:16px">
  <div class="row between" style="margin-bottom:12px"><div><small>Week 5 · Mix</small><div class="d" style="font-size:21px;font-weight:700">Night Bus</div></div><span class="btn" style="background:${C.pink};color:#fff">Upload v5</span></div>
  ${player(358, 46, { h: 84, mt: 32, marks: [[0.515, "teacher", C.pink], [0.85, "teacher", C.pink], [0.22, "ruth", C.lime]] })}
  <div class="card" style="padding:2px 16px;margin-top:12px">
   ${comment("teacher", "Theo Vance", "1:42", C.pink, "Kick and bass fight here. Sidechain the bass 3 to 4 dB, or move the bass note up an octave.", "Teacher")}
   ${comment("kenji", "Kenji Mori", "2:10", C.cyan, "Trying the octave move first. The filter sweep finally works!")}
  </div></div>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 2 });
  for (const [name, html] of [["platform", desktop()], ["platform-phone", phone()]]) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&family=Geist+Mono:wght@500&display=block" rel="stylesheet"><style>${css}</style></head><body><div id="root" style="display:inline-block">${html}</div></body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const png = path.join(out, `${name}.png`);
    await page.locator("#root").screenshot({ path: png, omitBackground: true });
    const file = path.join(images, `${name}.webp`);
    await sharp(png).webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(file);
    const m = await sharp(png).metadata();
    console.log(name, `${m.width}x${m.height}`, Math.round(fs.statSync(file).size / 1024) + "KB");
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exitCode = 1; });
