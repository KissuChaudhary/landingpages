// Product screens for the Notch template, authored as HTML and rendered to images by render.cjs.
const people = {
  MC: ["Maya Chen", "#2342ff", "Studio lead"], TP: ["Theo Park", "#0ea5a4", "Delivery lead"], AB: ["Aisha Bello", "#6b5cff", "Finance"],
  JW: ["Jonas Weber", "#3c4152", "Developer"], PN: ["Priya Nair", "#d9488f", "Senior designer"], LM: ["Leo Martins", "#c08a1e", "Developer"],
  SL: ["Sara Lind", "#5b8def", "Designer"], OH: ["Omar Haddad", "#e0694a", "Strategist"],
};
const proj = { Kestrel: "#2342ff", Oakfold: "#8aa0ff", Lineal: "#0ea5a4", Brightwell: "#f2a93b", Parcel: "#c9cfdf" };
const av = (k, cls = "") => `<span class="av ${cls}" style="background:${people[k][1]}">${k}</span>`;
const ic = (n, cls = "") => `<i data-lucide="${n}" class="ic ${cls}"></i>`;
const mark = (s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#2342ff"/><g stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M7.5 6.5v11M11 6.5v11M14.5 6.5v11"/><path d="M5.5 15.5 18.5 8.5"/></g></svg>`;
const heatColor = (v) => (v === 0 ? "#f1f2f6" : v === 1 ? "#e3e8ff" : v === 2 ? "#b9c5ff" : v === 3 ? "#7f94ff" : v === 4 ? "#2342ff" : "#f2a93b");

function sidebar() {
  const nav = [["house", "Home", 1], ["timer", "Time"], ["calendar-range", "Schedule"], ["folder-kanban", "Projects"], ["building-2", "Clients"], ["receipt-text", "Invoices"], ["chart-no-axes-column", "Reports"]];
  const team = [["users", "People"], ["badge-check", "Approvals", 0, "4"], ["wallet", "Payouts"]];
  const item = ([i, l, a, n]) => `<div class="nv${a ? " on" : ""}">${ic(i)}<span>${l}</span>${n ? `<em>${n}</em>` : ""}</div>`;
  return `<aside class="side"><div class="row g8 brand">${mark(24)}<b>Notch</b></div>
  <div class="org row g10"><span class="orgl">M</span><div class="col"><b>Morrow Studio</b><small>18 people · Pro</small></div>${ic("chevrons-up-down", "sm faint")}</div>
  <div class="nvs">${nav.map(item).join("")}</div><div class="sec">Team</div><div class="nvs">${team.map(item).join("")}</div>
  <div class="sec">Workspace</div><div class="nvs">${[["blocks", "Integrations"], ["settings", "Settings"]].map(item).join("")}</div>
  <div class="me row g10">${av("MC")}<div class="col"><b>Maya Chen</b><small>Studio lead</small></div></div></aside>`;
}

const dashCss = `
.app{width:1360px;height:880px;display:flex;background:#fff;border-radius:18px;overflow:hidden;border:1px solid var(--line)}
.side{width:226px;flex:none;background:#fafafb;border-right:1px solid var(--line);padding:18px 14px;display:flex;flex-direction:column;position:relative}
.brand b{font-size:16px;letter-spacing:-.03em}
.org{margin:18px 0 14px;padding:9px 10px;border:1px solid var(--line);border-radius:11px;background:#fff}.org .col{flex:1}
.orgl{width:28px;height:28px;border-radius:8px;background:#0e0f14;color:#fff;display:grid;place-items:center;font-weight:600}
.nvs{display:flex;flex-direction:column;gap:2px}.nv{display:flex;align-items:center;gap:10px;height:32px;padding:0 10px;border-radius:8px;color:var(--ink2);font-weight:500}
.nv .ic{color:var(--muted)}.nv.on{background:#fff;box-shadow:0 0 0 1px var(--line);color:var(--ink)}.nv.on .ic{color:var(--blue)}
.nv em{margin-left:auto;font-style:normal;font-size:11px;font-weight:600;background:var(--blue);color:#fff;border-radius:99px;padding:1px 7px}
.sec{font-size:11px;font-weight:500;color:var(--faint);margin:18px 10px 6px;letter-spacing:.01em}
.me{position:absolute;left:14px;right:14px;bottom:16px;padding-top:14px;border-top:1px solid var(--line)}
.main{flex:1;padding:22px 26px;background:#fff;min-width:0}
.top h1{font-size:20px;font-weight:600;letter-spacing:-.03em}
.search{width:250px;height:32px;border:1px solid var(--line);border-radius:9px;display:flex;align-items:center;gap:8px;padding:0 10px;color:var(--faint)}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}
.kpi{padding:14px 16px 13px}.kpi .v{font-size:24px;font-weight:600;letter-spacing:-.035em;margin-top:9px}
.kpi .lab{display:flex;align-items:center;gap:7px;color:var(--muted);font-weight:500}
.kpi .foot{display:flex;align-items:center;justify-content:space-between;margin-top:6px}
.delta{font-size:11.5px;font-weight:600;color:var(--green);display:inline-flex;align-items:center;gap:2px}
.grid2{display:grid;grid-template-columns:1.9fr 1fr;gap:12px;margin-top:12px}
.grid3{display:grid;grid-template-columns:1.05fr 1fr 1fr;gap:12px;margin-top:12px}
.chart{display:flex;align-items:flex-end;gap:22px;height:236px;padding:0 6px 0 34px;position:relative;margin:16px 16px 0}
.gl{position:absolute;left:0;right:0;border-top:1px dashed var(--line2);font-size:10.5px;color:var(--faint)}.gl span{position:absolute;left:0;top:-7px}
.stack{flex:1;display:flex;flex-direction:column-reverse;gap:2px;position:relative;z-index:1}.stack i{display:block;border-radius:4px}
.days{display:flex;gap:22px;padding:8px 22px 14px 56px;font-size:11px;color:var(--faint)}.days span{flex:1;text-align:center}
.legend{display:flex;gap:14px;font-size:11.5px;color:var(--muted)}.legend span{display:inline-flex;align-items:center;gap:6px}
.timer{padding:16px}.tv{font-size:38px;font-weight:500;letter-spacing:-.04em;margin:8px 0 2px}.tv em{font-style:normal;color:var(--faint)}
.live{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:var(--green)}
.sug{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line2)}
.hm{display:grid;grid-template-columns:72px repeat(10,1fr);gap:4px;padding:12px 16px 14px;align-items:center}.hm i{display:block;height:18px;border-radius:4px}.hm small{font-size:11px}
.bud{padding:9px 16px}.bud+.bud{border-top:1px solid var(--line2)}
.inv{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 16px;border-top:1px solid var(--line2)}
`;

function dashboard() {
  const kpi = (icon, tint, label, v, d, note) => `<div class="card kpi"><div class="lab"><span class="tile" style="background:${tint[0]};color:${tint[1]};width:24px;height:24px;border-radius:7px">${ic(icon, "sm")}</span>${label}</div><div class="v">${v}</div><div class="foot"><small>${note}</small>${d}</div></div>`;
  const days = [[46, 30, 22, 14, 6], [44, 34, 24, 16, 6], [40, 28, 26, 12, 6], [24, 16, 14, 6, 4], null];
  const colors = Object.values(proj);
  const max = 130;
  const bars = days
    .map((d) => `<div class="stack" style="height:236px">${d ? d.map((h, j) => `<i style="height:${(h / max) * 236}px;background:${colors[j]}"></i>`).join("") : `<i style="height:${(118 / max) * 236}px;border:1.5px dashed var(--line);background:transparent"></i>`}</div>`)
    .join("");
  const hmRows = [["MC", [3, 3, 4, 3, 2, 3, 3, 4, 3, 2]], ["TP", [4, 5, 4, 4, 3, 4, 5, 5, 4, 3]], ["PN", [2, 3, 3, 2, 1, 3, 3, 2, 2, 1]], ["JW", [4, 4, 4, 3, 3, 4, 4, 3, 3, 2]], ["SL", [1, 1, 2, 2, 1, 2, 2, 3, 2, 1]], ["LM", [3, 4, 3, 4, 2, 0, 0, 0, 0, 0]]];
  const hm = hmRows.map(([k, r]) => `<div class="row g6">${av(k, "sm")}<small>${people[k][0].split(" ")[0]}</small></div>${r.map((v) => `<i style="background:${heatColor(v)}"></i>`).join("")}`).join("");
  const bud = (n, p, c, s) => `<div class="bud"><div class="row between"><div class="row g8"><span class="dot" style="background:${proj[n]}"></span><b>${n}</b><small>${c}</small></div><span class="pill ${s[0]}">${s[1]}</span></div><div class="row g10" style="margin-top:8px"><div class="bar" style="flex:1"><i style="width:${Math.min(p, 100)}%;background:${p > 100 ? "var(--red)" : p > 75 ? "var(--amber-s)" : "var(--blue)"}"></i></div><small class="num" style="width:34px;text-align:right">${p}%</small></div></div>`;
  const inv = (no, c, amt, s) => `<div class="inv"><div class="col"><b>${c}</b><small class="mono">${no}</small></div><b class="num">${amt}</b><span class="pill ${s[0]}">${s[1]}</span></div>`;
  return `<div class="app">${sidebar()}<div class="main">
  <div class="row between top"><div><h1>Good morning, Maya</h1><small>Thursday, 9 October · Week 41</small></div>
  <div class="row g8"><div class="search">${ic("search", "sm")}<span style="flex:1">Search projects, people…</span><span class="kbd">⌘K</span></div><span class="btn">${ic("calendar", "sm")}This week${ic("chevron-down", "sm")}</span><span class="btn blue">${ic("play", "sm")}Start timer</span><span class="btn" style="width:32px;padding:0;justify-content:center">${ic("bell", "sm")}</span></div></div>
  <div class="kpis">${kpi("clock-3", ["#eef1ff", "#2342ff"], "Billable hours", "418.5h", `<span class="delta">${ic("trending-up", "sm")}6.2%</span>`, "vs. 394h last week")}${kpi("gauge", ["#e6f7f6", "#0e8f8e"], "Utilization", "82%", `<span class="delta">${ic("trending-up", "sm")}3 pts</span>`, "Target 80%")}${kpi("receipt-text", ["#f0eeff", "#6b5cff"], "Ready to invoice", "$48,920", `<span class="pill p-blue" style="height:20px">4 drafts</span>`, "Approved, not billed")}${kpi("triangle-alert", ["#fff3dc", "#b86f00"], "Projects at risk", "2", `<span class="pill p-amber" style="height:20px">of 18</span>`, "Over 75% of budget")}</div>
  <div class="grid2"><div class="card"><div class="ch"><h3>Hours by project</h3><div class="legend">${Object.entries(proj).map(([n, c]) => `<span><i class="dot" style="background:${c}"></i>${n}</span>`).join("")}</div></div>
  <div class="chart">${[0, 40, 80, 120].map((v) => `<div class="gl" style="bottom:${(v / max) * 236}px"><span>${v}h</span></div>`).join("")}${bars}</div><div class="days"><span>Mon 6</span><span>Tue 7</span><span>Wed 8</span><span style="color:var(--ink);font-weight:600">Thu 9</span><span>Fri 10</span></div></div>
  <div class="card timer"><div class="row between"><span class="live"><i class="dot" style="background:var(--green)"></i>Running</span><span class="btn sm">${ic("history", "sm")}History</span></div>
  <div style="margin-top:14px" class="row g8"><span class="dot" style="background:${proj.Kestrel}"></span><b>Kestrel · Website redesign</b></div><small>Design QA, checkout flow</small>
  <div class="tv mono">02:47:<em>18</em></div><div class="row g8" style="margin-bottom:14px"><span class="btn">${ic("pause", "sm")}Pause</span><span class="btn">${ic("square", "sm")}Stop</span><span class="btn" style="margin-left:auto">${ic("arrow-left-right", "sm")}Switch</span></div>
  <small style="font-weight:500">Suggested from your calendar</small>
  <div class="sug" style="margin-top:6px">${ic("calendar", "sm muted")}<div class="col" style="flex:1"><b style="font-weight:500">Oakfold brand review</b><small>10:00–10:45 · 45m</small></div><span class="btn sm">Add</span></div>
  <div class="sug">${ic("video", "sm muted")}<div class="col" style="flex:1"><b style="font-weight:500">Lineal stand-up</b><small>09:30–09:45 · 15m</small></div><span class="btn sm">Add</span></div></div></div>
  <div class="grid3"><div class="card"><div class="ch"><h3>Team capacity</h3><small>Next 2 weeks</small></div><div class="hm">${hm}</div></div>
  <div class="card"><div class="ch" style="padding-bottom:6px"><h3>Project budgets</h3><small>18 active</small></div>${bud("Kestrel", 64, "Website", ["p-green", "On track"])}${bud("Oakfold", 81, "Brand refresh", ["p-amber", "Watch"])}${bud("Lineal", 103, "iOS app", ["p-red", "Over"])}</div>
  <div class="card"><div class="ch" style="padding-bottom:10px"><h3>Invoices</h3><small>October</small></div>${inv("INV-2043", "Kestrel Ltd", "$20,880", ["p-gray", "Draft"])}${inv("INV-2041", "Oakfold & Co", "$12,400", ["p-blue", "Sent"])}${inv("INV-2039", "Lineal", "$21,300", ["p-green", "Paid"])}</div></div>
  </div></div>`;
}

/* ---------- bento ---------- */
const bentoCss = `.wrap{padding:24px}.sh{box-shadow:0 0 0 1px rgba(14,15,20,.03),0 18px 40px -20px rgba(20,30,90,.2)}`;
function timesheet() {
  const row = (icon, tint, t, src, p, d, s) => `<div class="row g12" style="padding:11px 16px;border-top:1px solid var(--line2)"><span class="tile" style="background:${tint[0]};color:${tint[1]}">${ic(icon, "sm")}</span><div class="col" style="flex:1;min-width:0"><b style="font-weight:500">${t}</b><small>${src}</small></div><span class="row g6" style="width:110px"><span class="dot" style="background:${proj[p]}"></span><small style="color:var(--ink2)">${p}</small></span><b class="num" style="width:62px;text-align:right">${d}</b><span style="width:100px;text-align:right">${s ? `<span class="pill p-blue">${ic("sparkles", "sm")}Suggested</span>` : `<span class="pill p-green">${ic("check", "sm")}Logged</span>`}</span></div>`;
  const day = (d, h, on) => `<div class="col" style="flex:1;padding:9px 12px;border-radius:9px;${on ? "background:var(--blue-50);box-shadow:inset 0 0 0 1px var(--blue-100)" : ""}"><small style="${on ? "color:var(--blue);font-weight:600" : ""}">${d}</small><b class="num" style="font-size:14px;margin-top:2px">${h}</b></div>`;
  return `<div class="wrap"><div class="card sh" style="width:712px"><div class="row between" style="padding:16px 16px 12px"><div><h3 style="font-size:15px;font-weight:600;letter-spacing:-.02em">Your week, drafted by Notch</h3><small>31h 40m found across 5 sources · 4 entries to confirm</small></div><span class="btn blue">${ic("check-check", "sm")}Confirm all</span></div>
  <div class="row g6" style="padding:0 12px 12px">${day("Mon 6", "8h 10m")}${day("Tue 7", "7h 45m")}${day("Wed 8", "8h 05m")}${day("Thu 9", "7h 40m", 1)}${day("Fri 10", "—")}</div>
  ${row("calendar", ["#eef1ff", "#2342ff"], "Kestrel sprint review", "Calendar · 09:00–10:00", "Kestrel", "1h 00m", 1)}${row("git-commit-horizontal", ["#e6f7f6", "#0e8f8e"], "12 commits to lineal-ios", "Code · checkout-refactor branch", "Lineal", "3h 20m", 1)}${row("pen-tool", ["#f0eeff", "#6b5cff"], "Logo explorations, round 3", "Design file · 14 versions", "Oakfold", "2h 10m", 1)}${row("video", ["#fff3dc", "#b86f00"], "Brightwell kickoff call", "Video call · 6 attendees", "Brightwell", "45m", 1)}${row("list-checks", ["#f1f2f6", "#2a2c35"], "QA pass on checkout flow", "Timer · started 14:12", "Kestrel", "1h 25m", 0)}</div></div>`;
}
function timer() {
  return `<div class="wrap"><div class="card sh" style="width:452px;padding:16px"><div class="row between"><h3 style="font-size:14px;font-weight:600">Timer</h3><span class="btn sm">${ic("history", "sm")}History</span></div>
  <div style="margin-top:14px;border:1px solid var(--line);border-radius:11px;overflow:hidden"><div class="row g8" style="padding:9px 12px;background:#fafafb;border-bottom:1px solid var(--line)"><span class="dot" style="background:${proj.Kestrel}"></span><b style="font-weight:500;flex:1">Kestrel · Website redesign</b>${ic("chevron-down", "sm faint")}</div>
  <div style="padding:16px 12px 14px;text-align:center"><small style="letter-spacing:.04em;font-size:10.5px">IN PROGRESS · DESIGN QA</small><div class="mono" style="font-size:44px;font-weight:500;letter-spacing:-.045em;margin:6px 0 10px">02:47:<span style="color:var(--faint)">18</span></div>
  <div class="row g8" style="justify-content:center"><span class="btn">${ic("pause", "sm")}Pause</span><span class="btn" style="color:var(--red)">${ic("square", "sm")}Stop</span></div></div></div>
  <small style="display:block;margin:14px 0 4px;font-weight:500">Earlier today</small>
  <div class="row g10" style="padding:9px 0;border-top:1px solid var(--line2)"><span class="tile" style="background:#e6f7f6;color:#0e8f8e;width:26px;height:26px">${ic("git-commit-horizontal", "sm")}</span><div class="col" style="flex:1"><b style="font-weight:500">Checkout refactor</b><small>Lineal · iOS app</small></div><b class="num">1h 20m</b></div>
  <div class="row g10" style="padding:9px 0;border-top:1px solid var(--line2)"><span class="tile" style="background:#eef1ff;color:#2342ff;width:26px;height:26px">${ic("calendar", "sm")}</span><div class="col" style="flex:1"><b style="font-weight:500">Sprint review</b><small>Kestrel · Website</small></div><b class="num">1h 00m</b></div></div></div>`;
}
function capacity() {
  const rows = [["TP", [4, 5, 4, 4, 3, 4, 5, 5, 4, 3, 3, 4, 4, 3, 2]], ["PN", [2, 3, 3, 2, 1, 3, 3, 2, 2, 1, 2, 2, 1, 1, 1]], ["JW", [4, 4, 4, 3, 3, 4, 4, 3, 3, 2, 3, 3, 2, 2, 1]], ["SL", [1, 1, 2, 2, 1, 2, 2, 3, 2, 1, 1, 0, 0, 1, 1]], ["LM", [3, 4, 3, 4, 2, 0, 0, 0, 0, 0, 3, 3, 4, 3, 2]], ["OH", [2, 2, 3, 3, 2, 3, 2, 2, 3, 2, 2, 1, 2, 2, 1]]];
  const grid = rows.map(([k, r]) => `<div class="row g6">${av(k, "sm")}<small style="color:var(--ink2)">${people[k][0].split(" ")[0]}</small></div>${r.map((v, i) => `<i style="display:block;height:19px;border-radius:4px;background:${heatColor(v)};${k === "TP" && i === 6 ? "box-shadow:0 0 0 2px #fff,0 0 0 3.5px var(--ink)" : ""}"></i>`).join("")}`).join("");
  return `<div class="wrap"><div class="card sh" style="width:452px;padding:16px 16px 18px;position:relative"><div class="row between"><div><h3 style="font-size:14px;font-weight:600">Capacity</h3><small>Next 3 weeks · 6 people</small></div><span class="btn sm">${ic("sliders-horizontal", "sm")}Filter</span></div>
  <div style="display:grid;grid-template-columns:70px repeat(15,1fr);gap:3.5px;align-items:center;margin-top:62px">${grid}</div>
  <div class="row between" style="margin-top:14px"><div class="row g6"><small>Light</small>${[1, 2, 3, 4].map((v) => `<i style="width:12px;height:12px;border-radius:3px;background:${heatColor(v)}"></i>`).join("")}<small>Full</small><i style="width:12px;height:12px;border-radius:3px;background:#f2a93b;margin-left:6px"></i><small>Over</small></div><small>Oct 13 – 31</small></div>
  <div style="position:absolute;left:118px;top:58px;background:var(--ink);color:#fff;border-radius:9px;padding:7px 10px;font-size:11.5px;line-height:1.4;width:186px"><b>Theo · Tue 21 Oct</b><br><span style="color:#b4b8c6">9.5h booked · 119% of capacity</span></div></div></div>`;
}
function approvals() {
  const node = (k, sub, tag) => `<div class="card sh row g10" style="padding:10px 12px;width:226px;background:#fff">${av(k, "lg")}<div class="col" style="flex:1;min-width:0"><b>${people[k][0]}</b><small>${sub}</small></div>${tag || ""}</div>`;
  const leaf = (k, s) => `<div class="card row g8" style="padding:7px 10px 7px 8px;background:#fff">${av(k, "sm")}<b style="font-weight:500;font-size:12px">${people[k][0].split(" ")[0]}</b><span class="pill ${s[0]}" style="height:20px;font-size:11px">${s[1]}</span></div>`;
  const line = "#b9c5ff";
  return `<div style="width:760px;height:326px;position:relative">
  <svg width="760" height="326" style="position:absolute;inset:0" fill="none" stroke="${line}" stroke-width="1.5"><path d="M380 92v34M200 126h360M200 126v34M560 126v34"/><path d="M200 214v30M100 244h200M100 244v22M300 244v22M560 214v30M460 244h200M460 244v22M660 244v22"/><circle cx="380" cy="94" r="4" fill="#2342ff" stroke="#fff" stroke-width="2"/><circle cx="200" cy="216" r="4" fill="#2342ff" stroke="#fff" stroke-width="2"/><circle cx="560" cy="216" r="4" fill="#2342ff" stroke="#fff" stroke-width="2"/></svg>
  <div style="position:absolute;left:267px;top:34px">${node("MC", "Signs off over $10k", `<span class="pill p-blue" style="height:20px">Final</span>`)}</div>
  <div style="position:absolute;left:87px;top:160px">${node("TP", "Delivery lead", `<span class="pill p-amber" style="height:20px">3</span>`)}</div>
  <div style="position:absolute;left:447px;top:160px">${node("AB", "Finance · expenses", `<span class="pill p-amber" style="height:20px">2</span>`)}</div>
  <div style="position:absolute;left:30px;top:266px">${leaf("PN", ["p-green", "Approved"])}</div><div style="position:absolute;left:236px;top:266px">${leaf("JW", ["p-amber", "Waiting"])}</div>
  <div style="position:absolute;left:392px;top:266px">${leaf("LM", ["p-red", "Changes"])}</div><div style="position:absolute;left:592px;top:266px">${leaf("SL", ["p-green", "Approved"])}</div></div>`;
}

/* ---------- workflow overlays ---------- */
function invoiceCard() {
  const li = (t, h, r, a) => `<div class="row" style="padding:8px 0;border-top:1px solid var(--line2)"><div class="col" style="flex:1"><b style="font-weight:500">${t}</b><small class="num">${h} × ${r}</small></div><b class="num">${a}</b></div>`;
  return `<div class="wrap"><div class="card sh" style="width:340px;padding:16px"><div class="row between"><span class="pill p-gray">${ic("file-pen-line", "sm")}Draft</span><small class="mono">INV-2043</small></div>
  <div style="margin:14px 0 10px"><small>Bill to</small><div style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-top:2px">Kestrel Ltd</div><small>Website redesign · September 1–30</small></div>
  ${li("Design", "86h", "$140", "$12,040")}${li("Development", "48.5h", "$160", "$7,760")}${li("Project management", "9h", "$120", "$1,080")}
  <div class="row between" style="padding:12px 0 14px;border-top:1px solid var(--line)"><b>Total</b><b class="num" style="font-size:18px;letter-spacing:-.03em">$20,880.00</b></div><span class="btn blue" style="width:100%;justify-content:center;height:34px">Review and send${ic("arrow-right", "sm")}</span></div></div>`;
}
function budgetCard() {
  const pts = [0, 9, 17, 28, 37, 46, 58, 66, 74, 81].map((v, i) => `${i * 31},${110 - v * 1.1}`).join(" ");
  return `<div class="wrap"><div class="card sh" style="width:340px;padding:16px"><div class="row between"><div class="row g8"><span class="dot" style="background:${proj.Oakfold}"></span><b>Oakfold · Brand refresh</b></div><span class="pill p-amber">Watch</span></div>
  <div class="row between" style="margin-top:14px;align-items:flex-end"><div><small>Budget used</small><div style="font-size:30px;font-weight:600;letter-spacing:-.04em">81%</div></div><small class="num" style="padding-bottom:6px">$32,400 of $40,000</small></div>
  <div style="position:relative;margin:8px 0 6px"><div class="bar" style="height:8px"><i style="width:81%;background:var(--amber-s)"></i></div><span style="position:absolute;left:75%;top:-4px;width:2px;height:16px;background:var(--ink);border-radius:2px"></span></div><div class="row between"><small>Alert at 75%</small><small>18 days left</small></div>
  <svg width="300" height="116" style="margin-top:12px;display:block"><path d="M0 110 L279 0" stroke="#d6dbe8" stroke-dasharray="4 4" fill="none"/><polyline points="${pts}" fill="none" stroke="#2342ff" stroke-width="2" stroke-linejoin="round"/><circle cx="279" cy="${110 - 81 * 1.1}" r="4" fill="#2342ff" stroke="#fff" stroke-width="2"/></svg>
  <div class="row g8" style="margin-top:12px;padding:9px 10px;border-radius:9px;background:var(--amber-50);color:var(--amber);font-size:12px;font-weight:500">${ic("bell-ring", "sm")}Maya was notified on 2 Oct at 75%</div></div></div>`;
}
function payoutCard() {
  const r = (k, amt, cur, s) => `<div class="row g10" style="padding:9px 0;border-top:1px solid var(--line2)">${av(k)}<div class="col" style="flex:1"><b style="font-weight:500">${people[k][0]}</b><small>${cur}</small></div><b class="num">${amt}</b><span class="pill ${s[0]}" style="height:20px">${s[1]}</span></div>`;
  return `<div class="wrap"><div class="card sh" style="width:340px;padding:16px"><div class="row between"><b style="font-size:14px">October payouts</b><small>3 contractors</small></div>
  <div class="row between" style="margin:12px 0 10px"><div><small>From approved hours</small><div style="font-size:24px;font-weight:600;letter-spacing:-.035em">$13,940</div></div><span class="pill p-blue">${ic("refresh-cw", "sm")}Live FX</span></div>
  ${r("JW", "€4,320", "Euro · SEPA", ["p-green", "Paid"])}${r("PN", "£3,180", "Pound · bank transfer", ["p-blue", "Ready"])}${r("LM", "$5,600", "US dollar · ACH", ["p-blue", "Ready"])}
  <span class="btn dark" style="width:100%;justify-content:center;height:34px;margin-top:10px">Pay 2 contractors</span></div></div>`;
}

/* ---------- deck screens (1040 x 600) ---------- */
const frame = (title, sub, tools, body) => `<div style="width:1040px;height:600px;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column"><div class="row between" style="padding:16px 20px;border-bottom:1px solid var(--line)"><div class="row g12">${mark(22)}<div><b style="font-size:15px;letter-spacing:-.02em">${title}</b><small style="display:block">${sub}</small></div></div><div class="row g8">${tools}</div></div>${body}</div>`;
function planner() {
  const days = ["Mon 13", "Tue 14", "Wed 15", "Thu 16", "Fri 17", "Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24"];
  const rows = [["TP", [["Kestrel", 0, 5, "Design QA · 6h a day"], ["Lineal", 5, 4, "Sprint 14 · 5h a day"]]], ["PN", [["Oakfold", 0, 3, "Identity · 7h a day"], ["Brightwell", 4, 6, "Campaign visuals · 6h a day"]]], ["JW", [["Lineal", 0, 7, "iOS checkout · 7h a day"], ["Kestrel", 8, 2, "Launch"]]], ["SL", [["Kestrel", 1, 3, "Components · 4h a day"], ["Parcel", 5, 4, "Pitch deck · 3h a day"]]], ["LM", [["Lineal", 0, 4, "API · 7h a day"], ["Time off", 5, 5, "Annual leave"]]], ["OH", [["Brightwell", 0, 2, "Research"], ["Oakfold", 3, 5, "Positioning · 4h a day"]]]];
  const cw = 84.4;
  const body = `<div style="display:grid;grid-template-columns:194px 1fr;flex:1"><div style="border-right:1px solid var(--line)"><div style="height:40px;border-bottom:1px solid var(--line)"></div>${rows.map(([k]) => `<div class="row g10" style="height:84px;padding:0 16px;border-bottom:1px solid var(--line2)">${av(k)}<div class="col"><b>${people[k][0]}</b><small>${people[k][2]}</small></div></div>`).join("")}</div>
  <div style="position:relative;overflow:hidden"><div class="row" style="height:40px;border-bottom:1px solid var(--line)">${days.map((d, i) => `<div style="width:${cw}px;text-align:center;font-size:11.5px;${i === 2 ? "color:var(--blue);font-weight:600" : "color:var(--muted)"}">${d}</div>`).join("")}</div>
  ${days.map((_, i) => `<div style="position:absolute;top:40px;bottom:0;left:${i * cw}px;width:${cw}px;border-right:1px solid var(--line2)"></div>`).join("")}
  <div style="position:absolute;top:40px;bottom:0;left:${2 * cw + 30}px;width:2px;background:var(--blue)"></div>
  ${rows.map(([, blocks], r) => blocks.map(([p, s, l, t]) => { const off = p === "Time off"; const c = proj[p] || "#c9cfdf"; return `<div style="position:absolute;top:${40 + r * 84 + 14}px;left:${s * cw + 4}px;width:${l * cw - 8}px;height:56px;border-radius:9px;padding:9px 11px;${off ? "background:repeating-linear-gradient(135deg,#f6f7f9 0 6px,#eef0f4 6px 12px);color:var(--muted)" : `background:color-mix(in srgb,${c} 13%,#fff);box-shadow:inset 3px 0 0 ${c}`}"><b style="font-size:12px">${p}</b><small style="display:block;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t}</small></div>`; }).join("")).join("")}</div></div>`;
  return frame("Schedule", "Oct 13 – 24 · 6 people", `<span class="btn">${ic("users", "sm")}All teams</span><span class="btn">${ic("chevron-left", "sm")}</span><span class="btn">Today</span><span class="btn">${ic("chevron-right", "sm")}</span><span class="btn blue">${ic("plus", "sm")}Book time</span>`, body);
}
function portal() {
  const body = `<div style="display:grid;grid-template-columns:1.35fr 1fr;gap:16px;padding:20px;background:#fafafb;flex:1">
  <div class="col g16"><div class="card" style="padding:18px"><div class="row between"><small style="font-weight:500">Budget</small><span class="pill p-green">On track</span></div><div class="row between" style="align-items:flex-end;margin-top:8px"><div style="font-size:30px;font-weight:600;letter-spacing:-.04em">$64,200 <span style="font-size:15px;color:var(--faint);font-weight:500">of $100,000</span></div><small>64% used</small></div><div class="bar" style="height:8px;margin-top:12px"><i style="width:64%"></i></div>
  <div class="row" style="margin-top:16px;gap:28px">${[["Hours this month", "142.5h"], ["Next invoice", "Oct 31"], ["Team on project", "5 people"]].map(([a, b]) => `<div><small>${a}</small><div style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-top:2px">${b}</div></div>`).join("")}</div></div>
  <div class="card" style="padding:18px;flex:1"><b style="font-size:14px">Waiting for your approval</b>${[["Checkout designs, version 3", "Shared by Priya · 2 days ago", "Approve"], ["Content plan for launch week", "Shared by Omar · today", "Review"]].map(([a, b, c], i) => `<div class="row g12" style="padding:12px 0;border-top:1px solid var(--line2);margin-top:${i ? 0 : 12}px"><span class="tile" style="background:var(--blue-50);color:var(--blue)">${ic(i ? "file-text" : "layout-panel-top", "sm")}</span><div class="col" style="flex:1"><b style="font-weight:500">${a}</b><small>${b}</small></div><span class="btn sm ${i ? "" : "blue"}">${c}</span></div>`).join("")}</div></div>
  <div class="col g16"><div class="card" style="padding:18px"><b style="font-size:14px">Milestones</b>${[["Discovery", "Done · Sep 2", 1], ["Design system", "Done · Sep 26", 1], ["Checkout launch", "Oct 24", 0], ["Full site live", "Nov 14", 2]].map(([a, b, s]) => `<div class="row g10" style="margin-top:14px"><span style="width:16px;height:16px;border-radius:50%;flex:none;${s === 1 ? "background:var(--blue)" : s === 0 ? "box-shadow:inset 0 0 0 2px var(--blue);background:#fff" : "box-shadow:inset 0 0 0 1.5px var(--line)"}"></span><b style="flex:1;font-weight:${s === 0 ? 600 : 500}">${a}</b><small>${b}</small></div>`).join("")}</div>
  <div class="card" style="padding:18px"><b style="font-size:14px">Invoices</b>${[["INV-2041", "$12,400", ["p-blue", "Due Oct 30"]], ["INV-2031", "$18,250", ["p-green", "Paid"]]].map(([a, b, s]) => `<div class="row" style="padding:10px 0 0;margin-top:10px;border-top:1px solid var(--line2)"><small class="mono" style="flex:1;color:var(--ink2)">${a}</small><b class="num" style="margin-right:10px">${b}</b><span class="pill ${s[0]}">${s[1]}</span></div>`).join("")}</div></div></div>`;
  return frame("Kestrel Ltd · Client portal", "Shared by Morrow Studio · Website redesign", `<span class="btn">${ic("message-square", "sm")}Message studio</span><span class="btn">${ic("download", "sm")}Statement</span>`, body);
}
function rates() {
  const roles = [["Studio lead", "$180", "$170", "€165", "$190"], ["Senior designer", "$140", "$140", "€130", "$150"], ["Designer", "$110", "$105", "€100", "$115"], ["Developer", "$160", "$155", "€150", "$165"], ["Strategist", "$150", "—", "€140", "$160"], ["Project manager", "$120", "$120", "€110", "$120"]];
  const body = `<div style="display:grid;grid-template-columns:1fr 290px;flex:1"><div style="padding:20px"><div class="row g8" style="margin-bottom:14px"><span class="pill p-blue" style="height:26px;padding:0 11px">All rate cards</span><span class="pill p-gray" style="height:26px;padding:0 11px">Overrides only</span></div>
  <div class="card" style="overflow:hidden"><div style="display:grid;grid-template-columns:1.4fr repeat(4,1fr);padding:10px 16px;background:#fafafb;border-bottom:1px solid var(--line);font-size:11.5px;color:var(--muted);font-weight:500"><span>Role</span><span>Default · USD</span><span class="row g6"><i class="dot" style="background:${proj.Kestrel}"></i>Kestrel</span><span class="row g6"><i class="dot" style="background:${proj.Oakfold}"></i>Oakfold · EUR</span><span class="row g6"><i class="dot" style="background:${proj.Lineal}"></i>Lineal</span></div>
  ${roles.map((r) => `<div style="display:grid;grid-template-columns:1.4fr repeat(4,1fr);padding:12px 16px;border-top:1px solid var(--line2);align-items:center"><b style="font-weight:500">${r[0]}</b>${r.slice(1).map((v, i) => `<span class="num" style="${i && v !== r[1] && v !== "—" ? "color:var(--blue);font-weight:600" : i ? "color:var(--muted)" : ""}">${v}<span style="color:var(--faint);font-weight:400">${v === "—" ? "" : "/h"}</span></span>`).join("")}</div>`).join("")}</div></div>
  <div style="border-left:1px solid var(--line);padding:20px;background:#fafafb"><small style="font-weight:500">Effective rate · October</small><div style="font-size:30px;font-weight:600;letter-spacing:-.04em;margin-top:4px">$148<span style="font-size:15px;color:var(--faint)">/h</span></div><small>Across 418.5 billable hours</small>
  <div class="hr" style="margin:18px 0"></div>${[["Kestrel", 152], ["Oakfold", 139], ["Lineal", 158], ["Brightwell", 131]].map(([n, v]) => `<div style="margin-bottom:14px"><div class="row between"><span class="row g8"><i class="dot" style="background:${proj[n]}"></i><b style="font-weight:500">${n}</b></span><small class="num" style="color:var(--ink2)">$${v}/h</small></div><div class="bar" style="margin-top:7px"><i style="width:${(v / 180) * 100}%;background:${proj[n]}"></i></div></div>`).join("")}
  <div class="row g8" style="margin-top:6px;padding:10px;border-radius:9px;background:#fff;border:1px solid var(--line);font-size:12px;color:var(--muted)">${ic("lock", "sm")}Visible to finance and leads only</div></div></div>`;
  return frame("Rate cards", "6 roles · 3 client overrides", `<span class="btn">${ic("history", "sm")}Changes</span><span class="btn blue">${ic("plus", "sm")}New rate card</span>`, body);
}
function reports() {
  const ps = [["Kestrel", 128, 74, 42], ["Lineal", 112, 92, 18], ["Oakfold", 76, 44, 42], ["Brightwell", 58, 31, 47], ["Parcel", 38, 24, 37]];
  const body = `<div style="padding:20px;flex:1;display:flex;flex-direction:column;gap:16px;background:#fafafb"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">${[["Revenue", "$412,600", "+12%"], ["Delivery cost", "$265,000", "+8%"], ["Gross margin", "35.8%", "+2.4 pts"], ["Write-offs", "$3,120", "−41%"]].map(([a, b, c]) => `<div class="card" style="padding:14px 16px"><small style="font-weight:500">${a}</small><div style="font-size:22px;font-weight:600;letter-spacing:-.035em;margin-top:6px">${b}</div><span class="delta" style="margin-top:2px">${c}</span></div>`).join("")}</div>
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:12px;flex:1"><div class="card" style="padding:16px"><div class="row between"><b style="font-size:14px">Revenue and cost by project</b><div class="legend"><span><i class="dot" style="background:var(--blue)"></i>Revenue</span><span><i class="dot" style="background:#c9cfdf"></i>Cost</span></div></div>
  <div class="row" style="align-items:flex-end;gap:26px;height:220px;margin-top:20px;padding:0 10px;border-bottom:1px solid var(--line)">${ps.map(([, r, c]) => `<div class="col" style="flex:1;align-items:center"><div class="row" style="align-items:flex-end;gap:5px;height:200px"><i style="display:block;width:22px;height:${(r / 130) * 200}px;background:var(--blue);border-radius:5px 5px 0 0"></i><i style="display:block;width:22px;height:${(c / 130) * 200}px;background:#c9cfdf;border-radius:5px 5px 0 0"></i></div></div>`).join("")}</div><div class="row" style="gap:26px;padding:8px 10px 0">${ps.map(([n]) => `<small style="flex:1;text-align:center">${n}</small>`).join("")}</div></div>
  <div class="card" style="overflow:hidden"><div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;padding:12px 16px;font-size:11.5px;color:var(--muted);font-weight:500;border-bottom:1px solid var(--line)"><span>Project</span><span>Revenue</span><span>Margin</span></div>${ps.map(([n, r, , m]) => `<div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;padding:13px 16px;border-top:1px solid var(--line2);align-items:center"><span class="row g8"><i class="dot" style="background:${proj[n]}"></i><b style="font-weight:500">${n}</b></span><span class="num">$${r}k</span><span class="pill ${m < 25 ? "p-red" : m < 40 ? "p-amber" : "p-green"}" style="justify-self:start">${m}%</span></div>`).join("")}</div></div></div>`;
  return frame("Profitability", "Q3 2026 · 18 projects · Morrow Studio", `<span class="btn">${ic("calendar", "sm")}Jul – Sep${ic("chevron-down", "sm")}</span><span class="btn">${ic("download", "sm")}Export</span>`, body);
}
function mobile() {
  const phone = (inner) => `<div style="width:300px;height:560px;border-radius:44px;background:#0e0f14;padding:9px"><div style="width:100%;height:100%;border-radius:36px;background:#fff;overflow:hidden;position:relative"><div class="row between" style="padding:14px 24px 0;font-size:12px;font-weight:600"><span>9:41</span><span style="width:84px;height:24px;background:#0e0f14;border-radius:99px;position:absolute;left:50%;top:9px;transform:translateX(-50%)"></span><span class="row g4">${ic("signal", "sm")}${ic("battery-full", "sm")}</span></div>${inner}</div></div>`;
  const ap = (k, h, p) => `<div style="padding:12px;border:1px solid var(--line);border-radius:14px;margin-bottom:10px"><div class="row g10">${av(k)}<div class="col" style="flex:1"><b>${people[k][0]}</b><small>${h} · ${p}</small></div></div><div class="row g6" style="margin-top:10px"><span class="btn sm" style="flex:1;justify-content:center">Ask</span><span class="btn sm blue" style="flex:1;justify-content:center">${ic("check", "sm")}Approve</span></div></div>`;
  const a = phone(`<div style="padding:24px 16px 0"><small>Thursday 9 Oct</small><div style="font-size:22px;font-weight:600;letter-spacing:-.035em;margin:2px 0 14px">Approvals</div><div class="row g6" style="margin-bottom:14px"><span class="pill p-blue">Hours · 3</span><span class="pill p-gray">Expenses · 2</span></div>${ap("JW", "38h 20m", "Lineal")}${ap("SL", "36h 05m", "Kestrel")}${ap("OH", "24h 40m", "Brightwell")}</div>`);
  const b = phone(`<div style="padding:24px 16px 0;text-align:center"><small style="font-size:11px;letter-spacing:.04em">IN PROGRESS</small><div class="row g8" style="justify-content:center;margin-top:10px"><span class="dot" style="background:${proj.Kestrel}"></span><b>Kestrel · Website</b></div><small>Design QA, checkout flow</small>
  <div style="margin:30px auto 28px;width:208px;height:208px;border-radius:50%;background:conic-gradient(#2342ff 0 78%,#eef1ff 78% 100%);display:grid;place-items:center"><div style="width:186px;height:186px;border-radius:50%;background:#fff;display:grid;place-items:center"><div><div class="mono" style="font-size:34px;font-weight:500;letter-spacing:-.04em">02:47</div><small>of 3h 30m planned</small></div></div></div>
  <div class="row g8" style="justify-content:center"><span style="width:56px;height:56px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center">${ic("pause")}</span><span style="width:56px;height:56px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center">${ic("square")}</span></div>
  <div class="row g10" style="margin-top:24px;text-align:left;padding:10px 12px;border-radius:12px;background:#fafafb">${ic("sparkles", "sm")}<small style="color:var(--ink2)">Notch logs this to Kestrel when you stop.</small></div></div>`);
  return `<div style="width:1040px;height:600px;display:flex;align-items:flex-start;justify-content:center;gap:40px;padding-top:36px;border-radius:16px;border:1px solid var(--line);background:linear-gradient(180deg,#f5f7ff,#e6ebff);overflow:hidden">${a}<div style="transform:translateY(28px)">${b}</div></div>`;
}

function phoneDash() {
  // Short phone version of the hero dashboard for narrow screens.
  return `<div style="width:390px;padding:16px;background:#fff;border-radius:22px;border:1px solid var(--line)"><div class="row between"><div class="row g8">${mark(22)}<b style="font-size:15px">Morrow Studio</b></div>${av("MC")}</div>
  <div style="margin:16px 0 12px"><div style="font-size:19px;font-weight:600;letter-spacing:-.03em">Good morning, Maya</div><small>Thursday, 9 October · Week 41</small></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${[["Billable hours", "418.5h", "+6.2%"], ["Utilization", "82%", "+3 pts"]].map(([a, b, c]) => `<div class="card" style="padding:12px"><small>${a}</small><div style="font-size:21px;font-weight:600;letter-spacing:-.035em;margin-top:4px">${b}</div><span class="delta">${c}</span></div>`).join("")}</div>
  <div class="card" style="padding:14px;margin-top:8px"><div class="row between"><span class="live"><i class="dot" style="background:var(--green)"></i>Running</span><small>Kestrel · Website</small></div><div class="mono" style="font-size:34px;font-weight:500;letter-spacing:-.04em;margin:6px 0 10px">02:47:<span style="color:var(--faint)">18</span></div><div class="row g8"><span class="btn" style="flex:1;justify-content:center">${ic("pause", "sm")}Pause</span><span class="btn dark" style="flex:1;justify-content:center">${ic("square", "sm")}Stop</span></div></div>
  <div class="card" style="margin-top:8px;padding-bottom:4px"><div class="ch" style="padding-bottom:6px"><h3>Project budgets</h3><small>18 active</small></div>${[["Kestrel", 64, "p-green", "On track"], ["Oakfold", 81, "p-amber", "Watch"]].map(([n, p, c, s]) => `<div class="bud" style="padding:9px 14px"><div class="row between"><div class="row g8"><span class="dot" style="background:${proj[n]}"></span><b>${n}</b></div><span class="pill ${c}">${s}</span></div><div class="bar" style="margin-top:8px"><i style="width:${p}%;background:${p > 75 ? "var(--amber-s)" : "var(--blue)"}"></i></div></div>`).join("")}</div></div>`;
}

module.exports = {
  css: { dashboard: dashCss, bento: bentoCss },
  screens: [
    { name: "dashboard", css: "dashboard", html: dashboard },
    { name: "dashboard-phone", css: "dashboard", html: phoneDash },
    { name: "timesheet", css: "bento", html: timesheet },
    { name: "timer", css: "bento", html: timer },
    { name: "capacity", css: "bento", html: capacity },
    { name: "approvals", css: "bento", html: approvals },
    { name: "card-invoice", css: "bento", html: invoiceCard },
    { name: "card-budget", css: "bento", html: budgetCard },
    { name: "card-payout", css: "bento", html: payoutCard },
    { name: "planner", css: "dashboard", html: planner },
    { name: "portal", css: "dashboard", html: portal },
    { name: "rates", css: "dashboard", html: rates },
    { name: "reports", css: "dashboard", html: reports },
    { name: "mobile", css: "dashboard", html: mobile },
  ],
};
