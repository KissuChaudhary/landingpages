// Showcase pages: six small Inlay pages, phone-width, 3:4. Rendered by render.cjs.
const { avatar, I, art } = require("./shots.cjs");
const { artLowTide, artNordlysTall, artGrotto, artGlyph, artRiso, artFlow, artKettle, artShapes } = art;

const PW = 300;
const PH = 400;
const PAD = 14;
const GAP = 8;
const CELL = (PW - PAD * 2 - GAP) / 2; // 132

const tile = (cols, rows, inner, extra = "") => {
  const w = cols * CELL + (cols - 1) * GAP;
  const h = rows * CELL + (rows - 1) * GAP;
  return `<div style="grid-column:span ${cols};grid-row:span ${rows};width:${w}px;height:${h}px;border-radius:14px;overflow:hidden;position:relative;box-shadow:0 0 0 1px var(--line);${extra}">${typeof inner === "function" ? inner(w, h) : inner}</div>`;
};
const label = (t, s, dark) => `<div style="position:absolute;left:8px;right:8px;bottom:8px;display:flex;align-items:center;gap:7px;padding:6px 8px;border-radius:9px;background:${dark ? "rgb(13 14 18 / .9)" : "#fff"};color:${dark ? "#fff" : "var(--ink)"}"><div style="width:20px;height:20px;border-radius:99px;background:var(--ultra);color:#fff;display:grid;place-items:center;flex:none"><svg width="8" height="8" viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;font-weight:650;white-space:nowrap">${t}</div><div style="font-size:9px;opacity:.6;white-space:nowrap">${s}</div></div></div>`;
const mini = (inner, bg = "#fff", color = "var(--ink)") => `<div style="width:100%;height:100%;background:${bg};color:${color};padding:11px;display:flex;flex-direction:column">${inner}</div>`;
const btn = (t, bg = "var(--ink)", c = "#fff") => `<div style="align-self:flex-start;margin-top:auto;height:24px;padding:0 10px;border-radius:99px;background:${bg};color:${c};font-size:10.5px;font-weight:650;display:inline-flex;align-items:center">${t}</div>`;

function page(name, role, tiles, opts = {}) {
  return `<div class="shot" style="width:${PW}px;height:${PH}px;background:${opts.bg || "#fff"};padding:${PAD}px">
    <div class="row" style="gap:9px;margin-bottom:12px">
      ${avatar(name, 34)}
      <div class="col grow"><div style="font-size:13.5px;font-weight:650;letter-spacing:-.01em">${name}</div><div style="font-size:10.5px;color:var(--muted)">${role}</div></div>
      <div style="height:24px;padding:0 10px;border-radius:99px;background:var(--ink);color:#fff;font-size:10.5px;font-weight:650;display:inline-flex;align-items:center">${opts.action || "Follow"}</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,${CELL}px);grid-auto-rows:${CELL}px;gap:${GAP}px">${tiles.join("")}</div>
  </div>`;
}

const halvor = page("Halvor", "Ambient musician · Oslo", [
  tile(1, 1, (w, h) => artLowTide(w, h) + label("Low Tide", "LP · 9 tracks")),
  tile(1, 1, mini(`<div style="font-size:9.5px;font-weight:650;color:var(--ultra);letter-spacing:.04em">LIVE</div><div style="font-size:15px;font-weight:650;line-height:1.15;margin-top:6px;letter-spacing:-.02em">Oslo, Blå</div><div style="font-size:10.5px;color:var(--muted);margin-top:2px">Thu 12 Nov · 20:00</div>${btn("Tickets")}`)),
  tile(2, 1, mini(`<div style="font-size:9.5px;opacity:.6">Now playing</div><div style="font-size:14px;font-weight:650;margin-top:2px">Undertow</div><div class="row" style="gap:2px;align-items:center;height:40px;margin-top:auto">${Array.from({ length: 46 }, (_, i) => `<div style="flex:1;height:${20 + Math.round(70 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.21)))}%;border-radius:2px;background:${i < 18 ? "#2b3bff" : "rgb(255 255 255 / .25)"}"></div>`).join("")}</div>`, "#17181e", "#fff")),
  tile(1, 1, (w, h) => artShapes(w, h, "#c3d9ff", "#0d0e12", "#ff3d2e")),
  tile(1, 1, mini(`<div style="font-size:10px;color:var(--muted)">Stems & samples</div><div style="font-size:14px;font-weight:650;margin-top:4px;line-height:1.2">Tide Kit, 120 sounds</div>${btn("€15")}`)),
]);

const riso = page("Riso Club", "Print studio · Leeds", [
  tile(2, 1, (w, h) => artRiso(w, h, "#ff3d2e", "#eceae3", "#2b3bff")),
  tile(1, 1, mini(`<div style="font-size:9.5px;font-weight:650;color:var(--ultra);letter-spacing:.04em">WORKSHOP</div><div style="font-size:14px;font-weight:650;line-height:1.2;margin-top:6px">Two-colour zines</div><div style="font-size:10.5px;color:var(--muted);margin-top:2px">Sat 11:00 · 4 spots left</div>${btn("Book · £35", "var(--ultra)")}`)),
  tile(1, 1, (w, h) => artRiso(w, h, "#2b3bff", "#f3d33c", "#ff3d2e")),
  tile(1, 1, (w, h) => artRiso(w, h, "#0d0e12", "#a9e5cb", "#2b3bff")),
  tile(1, 1, mini(`<div style="font-size:10px;color:var(--muted)">Shop</div><div style="font-size:14px;font-weight:650;margin-top:4px;line-height:1.2">Print pack, A4 × 6</div><div style="font-size:10.5px;color:var(--paid);font-weight:650;margin-top:4px">Sold out in a day</div>${btn("Notify me", "#fff", "var(--ink)").replace("align-self:flex-start", "align-self:flex-start;box-shadow:inset 0 0 0 1px var(--line-2)")}`)),
]);

const plotline = page("Plotline", "Pen-plotter artist · Berlin", [
  tile(1, 2, (w, h) => artFlow(w, h, "#0d0e12", "#eceae3")),
  tile(1, 1, mini(`<div style="font-size:9.5px;font-weight:650;color:var(--ultra);letter-spacing:.04em">EDITION 7/25</div><div style="font-size:14px;font-weight:650;line-height:1.2;margin-top:6px">Currents, A3 plot</div><div style="font-size:10.5px;color:var(--muted);margin-top:2px">Ink on cotton paper</div>${btn("Buy · €120")}`)),
  tile(1, 1, (w, h) => artFlow(w, h, "#2b3bff", "#ffffff")),
  tile(2, 1, (w, h) => artFlow(w, h, "#eceae3", "#17181e") + label("Plotting live", "Thursdays 20:00", true)),
]);

const kettle = page("Kettle", "A podcast about making things", [
  tile(1, 1, (w, h) => artKettle(w, h)),
  tile(1, 1, mini(`<div style="font-size:9.5px;font-weight:650;color:var(--ultra);letter-spacing:.04em">MEMBERS</div><div style="font-size:24px;font-weight:700;letter-spacing:-.03em;margin-top:4px">1,200</div><div style="font-size:10.5px;color:var(--muted)">Ad-free + bonus episodes</div>${btn("Join · €4/mo", "var(--ultra)")}`)),
  tile(2, 1, mini(`<div style="font-size:10px;color:var(--muted)">Latest episodes</div>${[["#84", "The printer who said no", "48 min"], ["#83", "Pricing your first edition", "52 min"], ["#82", "Why we left the platform", "41 min"]].map(([n, t, d]) => `<div class="row" style="gap:8px;margin-top:8px"><div style="width:22px;height:22px;border-radius:7px;background:var(--surface);display:grid;place-items:center;font-size:9px;font-weight:700">${n.slice(1)}</div><div style="flex:1;font-size:11.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t}</div><div style="font-size:10px;color:var(--muted)">${d}</div></div>`).join("")}`)),
  tile(1, 1, (w, h) => artShapes(w, h, "#a9e5cb", "#0d0e12", "#2b3bff")),
  tile(1, 1, mini(`<div style="font-size:10px;color:var(--muted)">Newsletter</div><div style="font-size:13.5px;font-weight:650;margin-top:4px;line-height:1.25">Show notes and links, every Friday</div>${btn("Subscribe")}`)),
]);

const ama = page("Ama Mensah", "Illustrator · Accra and London", [
  tile(2, 1, (w, h) => artShapes(w, h, "#d2cbff", "#2b3bff", "#f3d33c")),
  tile(1, 1, (w, h) => artShapes(w, h, "#a9e5cb", "#ff3d2e", "#0d0e12")),
  tile(1, 1, mini(`<div style="font-size:9.5px;font-weight:650;color:var(--paid);letter-spacing:.04em">● COMMISSIONS OPEN</div><div style="font-size:14px;font-weight:650;line-height:1.2;margin-top:6px">Book covers and editorial</div><div style="font-size:10.5px;color:var(--muted);margin-top:2px">From €300</div>${btn("Enquire")}`)),
  tile(1, 1, (w, h) => artShapes(w, h, "#f3d33c", "#0d0e12", "#ff3d2e")),
  tile(1, 1, (w, h) => artShapes(w, h, "#c3d9ff", "#ff3d2e", "#2b3bff")),
], { action: "Tip €" });

const noa = page("Noa Lindqvist", "Type designer · Copenhagen", [
  tile(1, 1, (w, h) => artNordlysTall(w, h)),
  tile(1, 2, (w, h) => artGlyph(w, h)),
  tile(1, 1, (w, h) => artGrotto(w, h) + `<div style="position:absolute;left:8px;bottom:8px;height:22px;padding:0 8px;border-radius:99px;background:var(--ink);color:#fff;font-size:10.5px;font-weight:650;display:inline-flex;align-items:center">€48</div>`),
  tile(2, 1, mini(`<div class="row" style="gap:8px"><div style="width:26px;height:26px;border-radius:8px;background:var(--ultra-tint);color:var(--ultra);display:grid;place-items:center">${I.cal.replace(/18/g, "14")}</div><div><div style="font-size:12.5px;font-weight:650">Poster critique</div><div style="font-size:10px;color:var(--muted)">30 min · €60</div></div></div><div class="row" style="gap:5px;margin-top:auto">${["Tue 10:00", "Wed 14:30", "Thu 09:00"].map((t, i) => `<div style="height:24px;padding:0 9px;border-radius:99px;font-size:10px;font-weight:650;display:inline-flex;align-items:center;${i ? "box-shadow:inset 0 0 0 1px var(--line-2)" : "background:var(--ultra);color:#fff"}">${t}</div>`).join("")}</div>`)),
], { action: "Tip €" });

const shots = {
  "page-halvor": { html: halvor },
  "page-riso": { html: riso },
  "page-plotline": { html: plotline },
  "page-kettle": { html: kettle },
  "page-ama": { html: ama },
  "page-noa": { html: noa },
};

module.exports = { shots };
