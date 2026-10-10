// Product pictures: the story chapters, the "built in" carousel and the checkout sequence.
// Transparent backgrounds (the site puts each on a coloured panel).
const { avatar, I, art } = require("./shots.cjs");
const { artLowTide, artNordlys, artNordlysTall, artGrotto, artGlyph, artRiso, artFlow } = art;

const card = (w, inner, extra = "") => `<div class="shot" style="width:${w}px;border-radius:26px;background:#fff;padding:22px;${extra}">${inner}</div>`;
const darkCard = (w, inner) => `<div class="shot" style="width:${w}px;border-radius:26px;background:#17181e;color:#fff;padding:22px;box-shadow:inset 0 0 0 1px rgb(255 255 255 / .08)">${inner}</div>`;
const money = (n) => "€" + n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Story ───────────────────────────────────────────────────────────────────
const feedRow = (who, verb, note, amt, time, neg) => `
  <div class="row" style="gap:12px;padding:12px 0;border-bottom:1px solid var(--line)">
    ${avatar(who, 38)}
    <div class="col grow" style="gap:2px"><div class="t-m"><b class="w6">${who}</b> ${verb}</div><div class="t-s mut">${note}</div></div>
    <div class="col" style="align-items:flex-end;gap:2px"><div class="t-m w6" style="color:${neg ? "var(--ink)" : "var(--paid)"}">${amt}</div><div class="t-xs mut">${time}</div></div>
  </div>`;

const storyTips = card(
  430,
  `<div class="row" style="justify-content:space-between"><div class="t-l w6">Activity</div><div class="pill" style="background:var(--paid-tint);color:var(--paid)"><span class="dot" style="background:var(--paid)"></span>Live</div></div>
   <div style="margin-top:8px">
   ${feedRow("@mika", "tipped you", "“For the Low Tide cover”", "+€5.00", "Just now")}
   ${feedRow("@aiko", "bought a licence", "Grotto Display · Desktop", "+€48.00", "4 min")}
   ${feedRow("@jonas", "booked you", "Poster critique · Tue 10:00", "+€60.00", "1 hr")}
   ${feedRow("@halvor", "got paid by you", "Split for the riso run", "−€25.00", "Yesterday", true)}
   </div>
   <div class="t-s mut w6" style="margin-top:18px">Pay someone</div>
   <div class="row" style="gap:8px;margin-top:8px">
     <div class="field grow" style="color:var(--ink);font-weight:600">@ines<span style="width:1.5px;height:16px;background:var(--ultra);margin-left:1px"></span><span class="mut" style="margin-left:auto;font-weight:500">€12.00</span></div>
     <div class="btn btn-ultra" style="height:42px">Pay</div>
   </div>
   <div class="row" style="gap:8px;margin-top:12px">${["@ines", "@sam", "@lea", "@kai", "@ola"].map((n) => avatar(n, 30)).join("")}<span class="t-s mut" style="margin-left:4px">Recent</span></div>`,
);

const days = Array.from({ length: 35 }, (_, i) => i - 3); // 1 October 2026 is a Thursday
const storyBooking = card(
  430,
  `<div class="row" style="gap:12px">${avatar("Noa Lindqvist", 42)}<div class="col grow"><div class="t-l w6">Poster critique</div><div class="t-s mut">with Noa · 30 min · video call</div></div><div class="t-xl w7">€60</div></div>
   <div class="hair" style="margin:18px 0"></div>
   <div class="row" style="justify-content:space-between"><div class="t-m w6">October 2026</div><div class="row mut" style="gap:14px;font-size:15px">‹ <span>›</span></div></div>
   <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:12px;text-align:center">
     ${["M", "T", "W", "T", "F", "S", "S"].map((d) => `<div class="t-xs mut w6" style="padding:4px 0">${d}</div>`).join("")}
     ${days
       .map((d) => {
         const n = d + 1;
         if (n < 1 || n > 31) return `<div></div>`;
         const free = [13, 14, 15, 20, 21, 22, 27, 28].includes(n);
         const sel = n === 13;
         return `<div style="height:36px;display:grid;place-items:center;border-radius:11px;font-size:13.5px;font-weight:${free ? 650 : 450};${sel ? "background:var(--ultra);color:#fff" : free ? "background:var(--ultra-tint);color:var(--ultra-deep)" : "color:#b7b9c1"}">${n}</div>`;
       })
       .join("")}
   </div>
   <div class="t-s mut w6" style="margin-top:18px">Tuesday 13 October</div>
   <div class="row" style="gap:8px;margin-top:8px">
     <div class="pill" style="height:36px;padding:0 14px;background:var(--ink);color:#fff;font-size:13px">10:00</div>
     <div class="pill" style="height:36px;padding:0 14px;box-shadow:inset 0 0 0 1px var(--line-2);font-size:13px">11:30</div>
     <div class="pill" style="height:36px;padding:0 14px;box-shadow:inset 0 0 0 1px var(--line-2);font-size:13px">14:00</div>
     <div class="pill" style="height:36px;padding:0 14px;box-shadow:inset 0 0 0 1px var(--line-2);font-size:13px">16:30</div>
   </div>
   <div class="btn btn-ultra" style="width:100%;height:50px;margin-top:20px;font-size:15px">Book &amp; pay €60</div>
   <div class="t-xs mut" style="text-align:center;margin-top:10px">Free to reschedule up to 24 hours before</div>`,
);

const storyPayout = card(
  430,
  `<div class="row" style="justify-content:space-between"><div class="t-l w6">Pay out</div><div class="pill" style="background:var(--surface);color:var(--body)">${I.clock} Instant</div></div>
   <div class="t-s mut" style="margin-top:18px">Available</div>
   <div style="font-size:48px;font-weight:700;letter-spacing:-.045em;font-stretch:108%;line-height:1.05">€2,486<span class="mut">.40</span></div>
   <div class="t-s mut w6" style="margin-top:20px">To</div>
   <div class="row" style="gap:12px;margin-top:8px;padding:14px;border-radius:16px;box-shadow:inset 0 0 0 1px var(--line-2)">
     <div style="width:38px;height:38px;border-radius:11px;background:var(--surface);display:grid;place-items:center">${I.bank}</div>
     <div class="col grow"><div class="t-m w6">Nordea · Business</div><div class="t-s mut">DK •••• 4021</div></div>
     <div style="width:22px;height:22px;border-radius:99px;background:var(--ultra);display:grid;place-items:center;color:#fff">${I.check}</div>
   </div>
   <div class="row" style="gap:12px;margin-top:8px;padding:14px;border-radius:16px;background:var(--surface)">
     <div style="width:38px;height:38px;border-radius:11px;background:#fff;display:grid;place-items:center">${I.card}</div>
     <div class="col grow"><div class="t-m w6">Debit card</div><div class="t-s mut">Visa •••• 7730</div></div>
   </div>
   <div style="margin-top:18px">
     <div class="row t-m" style="justify-content:space-between;padding:6px 0"><span class="mut">Fee</span><span class="w6">€0.00 on Plus</span></div>
     <div class="row t-m" style="justify-content:space-between;padding:6px 0"><span class="mut">Arrives</span><span class="w6">In seconds</span></div>
   </div>
   <div class="btn btn-ink" style="width:100%;height:52px;margin-top:16px;font-size:15px">Pay out €2,486.40</div>`,
);

const bars = Array.from({ length: 30 }, (_, i) => 30 + Math.round(40 * Math.abs(Math.sin(i * 0.55)) + i * 1.4 + (i % 5 === 3 ? 18 : 0)));
const storyInsights = darkCard(
  440,
  `<div class="row" style="justify-content:space-between"><div class="t-l w6">Insights</div>
     <div class="row" style="gap:2px;padding:3px;border-radius:99px;background:rgb(255 255 255 / .07);font-size:12px;font-weight:600"><span style="padding:5px 10px;opacity:.6">7d</span><span style="padding:5px 10px;border-radius:99px;background:#fff;color:var(--ink)">30d</span><span style="padding:5px 10px;opacity:.6">1y</span></div></div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px">
     ${[["Views", "18.2k", "+12%"], ["Clicks", "4.1k", "+8%"], ["Sales", "€3,140", "+21%"]]
       .map(([k, v, d]) => `<div style="padding:12px;border-radius:14px;background:rgb(255 255 255 / .05)"><div class="t-xs" style="opacity:.55">${k}</div><div style="font-size:22px;font-weight:680;letter-spacing:-.03em;margin-top:2px">${v}</div><div class="t-xs w6" style="color:#7ee2a8;margin-top:2px">${d}</div></div>`)
       .join("")}
   </div>
   <div class="row" style="align-items:flex-end;gap:4px;height:110px;margin-top:20px">
     ${bars.map((h, i) => `<div style="flex:1;height:${h}%;border-radius:3px;background:${i > 24 ? "#2b3bff" : "rgb(255 255 255 / .16)"}"></div>`).join("")}
   </div>
   <div class="t-xs w6" style="opacity:.55;margin-top:20px;letter-spacing:.02em">TOP TILES</div>
   ${[
     ["Grotto Display", "312 sales", artGrotto(40, 40)],
     ["Nordlys poster", "2.1k clicks", artNordlysTall(40, 40)],
     ["Low Tide", "980 plays", artLowTide(40, 40)],
   ]
     .map(([t, s, a]) => `<div class="row" style="gap:12px;padding:10px 0;border-bottom:1px solid rgb(255 255 255 / .07)"><div style="width:40px;height:40px;border-radius:10px;overflow:hidden">${a}</div><div class="t-m w6 grow">${t}</div><div class="t-s" style="opacity:.6">${s}</div></div>`)
     .join("")}
   <div class="row" style="gap:8px;margin-top:16px;color:#7ee2a8" ><span style="display:flex">${I.shield}</span><span class="t-s w6">No cookies · No trackers · Nothing sold</span></div>`,
);

// ── Built in ────────────────────────────────────────────────────────────────
const extraDomain = card(
  460,
  `<div class="row" style="gap:12px"><div style="width:40px;height:40px;border-radius:12px;background:var(--ultra-tint);color:var(--ultra);display:grid;place-items:center">${I.globe}</div><div class="col grow"><div class="t-l w6">Custom domain</div><div class="t-s mut">Your page, at your address</div></div></div>
   <div class="row" style="gap:10px;margin-top:20px;padding:0 8px 0 16px;height:56px;border-radius:16px;box-shadow:inset 0 0 0 1.5px var(--ink)">
     <span style="font-size:19px;font-weight:600;letter-spacing:-.02em">noa.studio</span>
     <span class="pill" style="margin-left:auto;background:var(--paid-tint);color:var(--paid)">${I.check} Connected</span>
   </div>
   <div style="margin-top:16px">
     ${[["HTTPS certificate", "Active"], ["inlay.me/noa", "Redirects here"], ["www.noa.studio", "Redirects here"]]
       .map(([k, v]) => `<div class="row t-m" style="justify-content:space-between;padding:11px 2px;border-bottom:1px solid var(--line)"><span>${k}</span><span class="row w6" style="gap:6px;color:var(--paid)">${v}</span></div>`)
       .join("")}
   </div>
   <div class="t-xs mut w6" style="margin-top:16px;letter-spacing:.02em">DNS</div>
   <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px 14px;margin-top:8px;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;color:var(--body)">
     <span class="w6" style="color:var(--ink)">A</span><span>@</span><span>76.76.21.21</span>
     <span class="w6" style="color:var(--ink)">CNAME</span><span>www</span><span>pages.inlay.me</span>
   </div>`,
);

const extraLetter = card(
  460,
  `<div class="row" style="justify-content:space-between"><div class="row" style="gap:10px"><div style="width:34px;height:34px;border-radius:10px;background:var(--ink);color:#eceae3;display:grid;place-items:center;font-weight:800;font-size:12px;font-stretch:125%">KC</div><div class="t-m w6">Kerning Club #48</div></div><div class="pill" style="background:var(--surface);color:var(--body)">Draft</div></div>
   <div style="margin-top:18px;font-size:22px;font-weight:650;letter-spacing:-.03em;line-height:1.15">The g that took eleven tries</div>
   <div class="t-m bod" style="margin-top:10px;line-height:1.55">This week: why the ear of a g should lean, the poster I almost sent to print with a typo, and two typefaces I can't stop using.</div>
   <div style="margin-top:14px;height:120px;border-radius:14px;overflow:hidden">${artGlyph(416, 120)}</div>
   <div class="row" style="gap:10px;margin-top:18px">
     <div class="col grow"><div class="t-s mut">To</div><div class="t-m w6">4,280 readers</div></div>
     <div class="col grow"><div class="t-s mut">When</div><div class="t-m w6">Sun 08:00</div></div>
     <div class="btn btn-ultra">Schedule</div>
   </div>`,
);

const stripes = `repeating-linear-gradient(135deg, rgb(13 14 18 / .55) 0 2px, transparent 2px 9px)`;
const extraMembers = card(
  440,
  `<div style="position:relative;height:230px;border-radius:18px;overflow:hidden">${artFlow(396, 230, "#eceae3", "#2b3bff")}
     <div style="position:absolute;inset:0;background:${stripes}"></div>
     <div class="col" style="position:absolute;inset:0;align-items:center;justify-content:center;gap:10px;color:#fff">
       <div style="width:52px;height:52px;border-radius:99px;background:#fff;color:var(--ink);display:grid;place-items:center">${I.lock}</div>
       <div class="t-m w6" style="background:var(--ink);padding:4px 10px;border-radius:8px">Members only</div>
     </div>
   </div>
   <div class="row" style="margin-top:18px;gap:12px"><div class="col grow"><div class="t-l w6">Studio notes</div><div class="t-s mut">Process videos, early drops, my drawing playlist</div></div></div>
   <div class="row" style="margin-top:16px;gap:10px">
     <div class="row">${["@ines", "@sam", "@lea", "@ola"].map((n, i) => `<div style="margin-left:${i ? -10 : 0}px;border-radius:99px;box-shadow:0 0 0 2.5px #fff">${avatar(n, 30)}</div>`).join("")}</div>
     <span class="t-s mut">1,204 members</span>
     <div class="btn btn-ink" style="margin-left:auto">Join · €4/mo</div>
   </div>`,
);

const extraDrop = card(
  440,
  `<div class="row" style="gap:14px"><div style="width:86px;height:112px;border-radius:12px;overflow:hidden;flex:none">${artNordlysTall(86, 112)}</div>
     <div class="col grow" style="gap:4px"><div class="pill" style="align-self:flex-start;background:var(--ultra-tint);color:var(--ultra)">${I.clock} Scheduled</div><div class="t-l w6" style="margin-top:4px">Nordlys, A2 print</div><div class="t-s mut">Edition of 50 · €35</div></div></div>
   <div class="t-xs mut w6" style="margin-top:22px;letter-spacing:.02em">GOES LIVE IN</div>
   <div class="row" style="gap:8px;margin-top:10px">
     ${[["02", "days"], ["14", "hrs"], ["09", "min"], ["41", "sec"]]
       .map(([n, l]) => `<div class="col grow" style="align-items:center;padding:12px 0;border-radius:14px;background:var(--surface)"><div style="font-size:30px;font-weight:700;letter-spacing:-.03em;font-variant-numeric:tabular-nums">${n}</div><div class="t-xs mut">${l}</div></div>`)
       .join("")}
   </div>
   <div style="margin-top:16px">
     ${[["Opens", "Fri 16 Oct, 09:00"], ["Hide when sold out", "On"], ["Members get it", "1 hour early"]]
       .map(([k, v], i) => `<div class="row t-m" style="justify-content:space-between;padding:10px 2px;border-bottom:1px solid var(--line)"><span>${k}</span>${i === 1 ? `<span style="width:40px;height:24px;border-radius:99px;background:var(--ultra);position:relative"><span style="position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:99px;background:#fff"></span></span>` : `<span class="w6">${v}</span>`}</div>`)
       .join("")}
   </div>`,
);

function qr(size, seed = 5) {
  const n = 25;
  const c = size / n;
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let cells = "";
  const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if (rnd() > 0.52) cells += `<rect x="${x * c}" y="${y * c}" width="${c + 0.3}" height="${c + 0.3}"/>`;
    }
  const eye = (x, y) => `<rect x="${x * c + c / 2}" y="${y * c + c / 2}" width="${6 * c}" height="${6 * c}" rx="${c * 1.4}" fill="none" stroke="#0d0e12" stroke-width="${c}"/><rect x="${(x + 2) * c}" y="${(y + 2) * c}" width="${3 * c}" height="${3 * c}" rx="${c * 0.8}"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="#0d0e12">${cells}${eye(0, 0)}${eye(n - 7, 0)}${eye(0, n - 7)}
    <rect x="${size / 2 - c * 3}" y="${size / 2 - c * 3}" width="${c * 6}" height="${c * 6}" rx="${c * 1.5}" fill="#fff"/>
    <g transform="translate(${size / 2 - c * 2.2} ${size / 2 - c * 2.2}) scale(${(c * 4.4) / 24})"><rect x="1.5" y="1.5" width="9.5" height="9.5" rx="2.6"/><rect x="13" y="1.5" width="9.5" height="9.5" rx="2.6" fill="#2b3bff"/><rect x="1.5" y="13" width="9.5" height="9.5" rx="2.6"/><rect x="13" y="13" width="9.5" height="9.5" rx="2.6"/></g></svg>`;
}
const extraQr = card(
  440,
  `<div class="row" style="gap:18px;align-items:flex-start">
     <div style="padding:12px;border-radius:18px;box-shadow:inset 0 0 0 1px var(--line-2)">${qr(150)}</div>
     <div class="col grow" style="gap:4px;padding-top:4px"><div class="pill" style="align-self:flex-start;background:var(--surface);color:var(--body)">${I.qr} Code</div><div class="t-l w6" style="margin-top:6px">Market stall</div><div class="t-s mut">Værnedamsvej, Saturdays</div>
       <div style="font-size:34px;font-weight:700;letter-spacing:-.04em;margin-top:12px">214</div><div class="t-s mut" style="margin-top:-4px">scans this week</div></div>
   </div>
   <div class="t-xs mut w6" style="margin-top:20px;letter-spacing:.02em">WHERE VISITORS CAME FROM</div>
   ${[["Instagram bio", 46], ["Market stall code", 28], ["Gig poster code", 17], ["Newsletter", 9]]
     .map(([k, v], i) => `<div style="margin-top:12px"><div class="row t-s" style="justify-content:space-between"><span class="w5">${k}</span><span class="mut">${v}%</span></div><div style="height:6px;border-radius:9px;background:var(--surface);margin-top:6px"><div style="width:${v * 2}%;height:100%;border-radius:9px;background:${i === 1 ? "var(--ultra)" : "#c7c9d1"}"></div></div></div>`)
     .join("")}`,
);

// ── Sell sequence ───────────────────────────────────────────────────────────
// The page and the checkout share coordinates: the Grotto tile sits at
// SELL.tile inside the page, and the checkout grows out of it (see Sell.tsx).
const SW = 720;
const SH = 560;
const tileBox = (x, y, w, h, inner, extra = "") => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px var(--line);${extra}">${inner}</div>`;
const sellPage = `<div class="shot" style="width:${SW}px;height:${SH}px;border-radius:30px;background:#fff;box-shadow:inset 0 0 0 1px var(--line)">
  <div class="row" style="position:absolute;left:28px;top:26px;gap:12px">${avatar("Noa Lindqvist", 44)}<div class="col"><div class="t-l w6">Noa Lindqvist</div><div class="t-s mut">Type designer and poster artist</div></div></div>
  <div class="row" style="position:absolute;right:28px;top:32px;gap:8px"><div class="btn btn-line" style="height:34px;padding:0 14px;font-size:13px">Follow</div><div class="btn btn-ink" style="height:34px;padding:0 14px;font-size:13px">Tip €</div></div>
  ${tileBox(28, 96, 210, 210, artNordlysTall(210, 210))}
  ${tileBox(254, 96, 210, 210, `<div style="position:relative;width:210px;height:210px">${artGrotto(210, 210)}<div class="row" style="position:absolute;left:12px;right:12px;bottom:12px;justify-content:space-between;align-items:flex-end"><div class="col"><div class="t-m w7">Grotto Display</div><div class="t-xs" style="opacity:.7">6 weights · OTF + web</div></div><div class="pill" style="background:var(--ink);color:#fff">€48</div></div></div>`)}
  ${tileBox(480, 96, 212, 436, artGlyph(212, 436))}
  ${tileBox(28, 322, 436, 210, artNordlys(436, 210))}
</div>`;

const sellCheckout = `<div class="shot" style="width:380px;border-radius:28px;background:#fff;padding:22px;box-shadow:inset 0 0 0 1px var(--line)">
  <div class="row" style="gap:14px"><div style="width:64px;height:64px;border-radius:14px;overflow:hidden;flex:none">${artGrotto(64, 64)}</div><div class="col grow"><div class="t-l w6">Grotto Display</div><div class="t-s mut">by Noa Lindqvist · 6 weights</div></div></div>
  <div class="t-s mut w6" style="margin-top:20px">Licence</div>
  <div style="display:grid;gap:8px;margin-top:8px">
    ${[["Desktop", "Print, posters, logos", "€48", true], ["Web", "Up to 50k views a month", "€64"], ["Desktop + Web", "Both, one price", "€96"]]
      .map(([t, d, p, on]) => `<div class="row" style="gap:12px;padding:12px 14px;border-radius:14px;box-shadow:inset 0 0 0 ${on ? "1.5px var(--ultra)" : "1px var(--line-2)"};${on ? "background:var(--ultra-tint)" : ""}"><span style="width:18px;height:18px;border-radius:99px;box-shadow:inset 0 0 0 ${on ? "5px var(--ultra)" : "1.5px var(--line-2)"};flex:none"></span><div class="col grow"><div class="t-m w6">${t}</div><div class="t-xs mut">${d}</div></div><div class="t-m w6">${p}</div></div>`)
      .join("")}
  </div>
  <div class="field" style="margin-top:14px;color:var(--ink)">aiko@hey.com</div>
  <div class="row" style="justify-content:space-between;margin-top:16px"><span class="t-m mut">Total</span><span class="t-l w7">€48.00</span></div>
  <div class="btn" style="width:100%;height:50px;margin-top:14px;background:#000;color:#fff;font-size:15px">${I.apple} Pay</div>
  <div class="btn btn-line" style="width:100%;height:46px;margin-top:8px;font-size:14px">${I.card} Pay with card</div>
  <div class="row t-xs mut" style="justify-content:center;gap:6px;margin-top:12px">${I.shield} Secure checkout by Inlay Pay</div>
</div>`;

const sellPaid = `<div class="shot" style="width:380px;border-radius:28px;background:#fff;padding:26px 22px 22px;box-shadow:inset 0 0 0 1px var(--line)">
  <div class="col" style="align-items:center;text-align:center">
    <div style="width:64px;height:64px;border-radius:99px;background:var(--paid);color:#fff;display:grid;place-items:center"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
    <div class="t-s mut w6" style="margin-top:16px">Payment received</div>
    <div style="font-size:42px;font-weight:700;letter-spacing:-.045em;line-height:1.1;margin-top:2px">€48.00</div>
    <div class="t-s mut" style="margin-top:4px">Grotto Display · Desktop licence</div>
  </div>
  <div class="row" style="gap:12px;margin-top:22px;padding:14px;border-radius:16px;background:var(--surface)">
    <div style="width:42px;height:42px;border-radius:12px;background:#fff;display:grid;place-items:center;box-shadow:0 0 0 1px var(--line)">${I.dl}</div>
    <div class="col grow"><div class="t-m w6">Grotto-Display.zip</div><div class="t-xs mut">6 fonts · 2.4 MB</div></div>
    <div class="btn btn-ink" style="height:36px;padding:0 14px;font-size:13px">Download</div>
  </div>
  <div style="margin-top:16px">
    ${[["Receipt sent to", "aiko@hey.com"], ["Licence key", "GRT-7Q4K-2210"], ["Paid with", "Apple Pay"]]
      .map(([k, v]) => `<div class="row t-m" style="justify-content:space-between;padding:9px 2px;border-bottom:1px solid var(--line)"><span class="mut">${k}</span><span class="w6">${v}</span></div>`)
      .join("")}
  </div>
  <div class="t-s mut" style="text-align:center;margin-top:16px">Thanks for supporting independent type.</div>
</div>`;

const shots = {
  "story-tips": { html: storyTips, transparent: true },
  "story-booking": { html: storyBooking, transparent: true },
  "story-payout": { html: storyPayout, transparent: true },
  "story-insights": { html: storyInsights, transparent: true },
  "extra-domain": { html: extraDomain, transparent: true },
  "extra-letter": { html: extraLetter, transparent: true },
  "extra-members": { html: extraMembers, transparent: true },
  "extra-drop": { html: extraDrop, transparent: true },
  "extra-qr": { html: extraQr, transparent: true },
  "sell-page": { html: sellPage, transparent: true },
  "sell-checkout": { html: sellCheckout, transparent: true },
  "sell-paid": { html: sellPaid, transparent: true },
};

module.exports = { shots, SELL: { w: SW, h: SH, tile: { x: 254, y: 96, w: 210, h: 210 } } };
