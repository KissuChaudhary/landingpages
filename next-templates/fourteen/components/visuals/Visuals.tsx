import { Check, Inbox } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Small drawings used inside the cards. They are built from plain elements, so there is nothing to host,
 * and they are hidden from screen readers because the card text already says everything they show.
 * The names match the `visual` fields in site.config.ts.
 */

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("relative flex h-full w-full items-center justify-center", className)}>
      {children}
    </div>
  );
}

function Tile({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-line bg-card", className)}>{children}</div>;
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-line", className)} />;
}

function Caps({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-low", className)}>{children}</span>;
}

/* ---------- Solution cards ---------- */

function Match() {
  return (
    <Frame className="items-end">
      <div className="relative w-full max-w-[26rem] space-y-3">
        <span className="absolute bottom-6 left-[17px] top-4 w-px bg-line-strong" />
        {[2, 3].map((n) => (
          <div key={n} className="relative flex items-center gap-3 opacity-60">
            <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-card text-[12px] text-ink-low">{n}</span>
            <span className="h-9 flex-1 rounded-xl bg-wash" />
          </div>
        ))}
        <div className="relative flex items-center gap-3">
          <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-flame font-serif text-[15px] text-white">1</span>
          <Tile className="flex flex-1 items-center justify-between gap-3 px-4 py-2.5">
            <span>
              <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink">
                <span className="size-2 rounded-full bg-flame" />
                Ideal customer
              </span>
              <span className="mt-0.5 block text-[11px] text-ink-mid">Series A SaaS, 20 to 200 staff</span>
            </span>
            <span className="rounded-md border border-peach bg-flame-soft px-2 py-0.5 text-[11px] font-semibold text-flame-text">98%</span>
          </Tile>
        </div>
      </div>
    </Frame>
  );
}

function Ring() {
  return (
    <Frame>
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-wash)" strokeWidth="9" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-flame)" strokeWidth="9" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="70" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-[1.875rem] leading-none text-ink">3x</span>
          <Caps className="mt-1">Replies</Caps>
        </div>
      </div>
    </Frame>
  );
}

function Nodes() {
  return (
    <Frame>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 rounded-full border border-peach bg-card px-3.5 py-1.5 text-[12px] font-medium text-ink">
          <span className="size-2 rounded-full bg-flame" />
          Email 1
        </div>
        <span className="h-4 w-px bg-line-strong" />
        <div className="flex gap-2.5">
          {["Day 3", "Day 7", "Day 12"].map((d) => (
            <Tile key={d} className="px-3 py-2 text-[11px] font-medium text-ink-mid">
              {d}
            </Tile>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Email() {
  return (
    <Frame>
      <div className="relative h-36 w-full max-w-[22rem]">
        <Tile className="absolute left-0 top-3 h-28 w-[55%] bg-wash" />
        <Tile className="absolute right-0 top-0 w-[68%] p-4">
          <span className="block h-2.5 w-24 rounded-full bg-ink" />
          <span className="mt-3 block space-y-2">
            <Bar />
            <Bar className="w-5/6" />
          </span>
          <span className="mt-3 flex items-center justify-between">
            <span className="rounded border border-peach bg-flame-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-flame-text">Replied</span>
            <Check className="size-4 text-good" strokeWidth={2.5} />
          </span>
        </Tile>
      </div>
    </Frame>
  );
}

function Bars() {
  const heights = [34, 48, 68, 100];
  return (
    <Frame>
      <div className="relative flex h-28 w-full max-w-[16rem] items-end gap-3 border-b border-line-strong">
        {heights.map((h, i) => (
          <span
            key={h}
            className={cn("relative flex-1 rounded-t-md", i === heights.length - 1 ? "bg-gradient-to-b from-orange-300 to-flame" : i === 2 ? "bg-stone-400" : "bg-stone-200")}
            style={{ height: `${h}%` }}
          >
            {i === heights.length - 1 ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded border border-peach bg-card px-1.5 py-0.5 text-[10px] font-semibold text-flame-text">ROI</span>
            ) : null}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function Queue() {
  const rows = [
    { state: "done", label: "Sent to 40 accounts", time: "Done" },
    { state: "live", label: "Follow-up, day 3", time: "Just now" },
    { state: "wait", label: "Follow-up, day 7", time: "Queued" },
  ];
  return (
    <Frame>
      <Tile className="w-full max-w-[18rem] p-3.5">
        <div className="flex items-center justify-between">
          <Caps className="flex items-center gap-2">
            <span className="size-1.5 animate-[blink_1.8s_ease-in-out_infinite] rounded-full bg-good" />
            Sending queue
          </Caps>
          <span className="rounded border border-green-200 bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-good">Active</span>
        </div>
        <ul className="mt-3 space-y-2.5">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2.5 text-[11px]">
              <span className={cn("size-2 shrink-0 rounded-full", r.state === "live" ? "bg-flame" : r.state === "done" ? "bg-good" : "bg-line-strong")} />
              <span className={cn("flex-1", r.state === "wait" ? "text-ink-low" : "font-medium text-ink")}>{r.label}</span>
              <span className={cn(r.state === "live" ? "text-flame-text" : "text-ink-low")}>{r.time}</span>
            </li>
          ))}
        </ul>
      </Tile>
    </Frame>
  );
}

/* ---------- How it works ---------- */

function MapVisual() {
  return (
    <Frame className="rounded-xl bg-wash" >
      <span className="absolute inset-0 rounded-xl opacity-70" style={{ backgroundImage: "radial-gradient(var(--color-line-strong) 1.2px, transparent 1.3px)", backgroundSize: "16px 16px" }} />
      <div className="relative flex flex-col items-center">
        <Tile className="flex gap-6 px-4 py-2.5">
          <span>
            <Caps className="block">Accounts</Caps>
            <span className="text-[13px] font-semibold text-ink">1,240</span>
          </span>
          <span className="text-right">
            <Caps className="block">Fit</Caps>
            <span className="text-[13px] font-semibold text-good">High</span>
          </span>
        </Tile>
        <span className="h-3 w-px bg-line-strong" />
        <span className="flex size-5 items-center justify-center rounded-full bg-flame/20">
          <span className="size-2.5 rounded-full bg-flame" />
        </span>
      </div>
    </Frame>
  );
}

function Tree() {
  return (
    <Frame className="rounded-xl bg-wash">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 rounded-full border border-peach bg-card px-3.5 py-1.5 text-[12px] font-medium text-ink">
          <span className="size-2 rounded-full bg-flame" />
          Core offer
        </div>
        <span className="h-3 w-px bg-line-strong" />
        <span className="h-px w-32 bg-line-strong" />
        <div className="flex gap-3 pt-0">
          {["Email 1", "Email 2", "Email 3"].map((t) => (
            <span key={t} className="flex flex-col items-center">
              <span className="h-3 w-px bg-line-strong" />
              <Tile className="px-2.5 py-1.5 text-[10px] font-medium text-ink-mid">{t}</Tile>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Chat() {
  return (
    <Frame className="rounded-xl bg-wash">
      <div className="w-full max-w-[17rem] space-y-2.5 px-2">
        <Tile className="ml-auto w-fit max-w-[85%] rounded-2xl px-3 py-2 text-[11px] text-ink-mid">Sounds interesting. Free Tuesday?</Tile>
        <Tile className="w-fit max-w-[90%] rounded-2xl px-3 py-2 text-[11px] text-ink">
          Yes, 3:00 pm works. Invite sent.
        </Tile>
        <div className="flex items-center gap-2 pl-1">
          <span className="flex size-6 items-center justify-center rounded-full bg-flame text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span className="rounded-full border border-peach bg-card px-3 py-1 text-[11px] font-medium text-ink">Booked: Tue, 3:00 pm</span>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Feature cards ---------- */

function Score() {
  return (
    <Frame>
      <Tile className="w-full max-w-[14rem] p-4">
        <div className="flex items-center justify-between">
          <Caps>Match score</Caps>
          <span className="rounded border border-peach bg-flame-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase text-flame-text">Strong fit</span>
        </div>
        <p className="mt-2 font-serif text-[2rem] leading-none text-ink">
          92<span className="text-[0.9rem] text-ink-low"> /100</span>
        </p>
        {[
          ["Fit signals", "9 / 10", "w-[90%]"],
          ["Timing", "High", "w-4/5"],
        ].map(([label, value, width]) => (
          <div key={label} className="mt-3">
            <div className="flex justify-between text-[10px] text-ink-mid">
              <span>{label}</span>
              <span className="font-medium text-ink">{value}</span>
            </div>
            <span className="mt-1 block h-1.5 rounded-full bg-wash">
              <span className={cn("block h-full rounded-full bg-flame", width)} />
            </span>
          </div>
        ))}
      </Tile>
    </Frame>
  );
}

function Sliders() {
  return (
    <Frame>
      <Tile className="w-full max-w-[13rem] space-y-3.5 p-4">
        {[
          ["Friendly", 85],
          ["Direct", 40],
          ["Technical", 90],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="flex justify-between">
              <Caps>{label}</Caps>
              <span className="text-[10px] font-semibold text-flame-text">{value}%</span>
            </div>
            <span className="relative mt-1.5 block h-1.5 rounded-full bg-wash">
              <span className="absolute inset-y-0 left-0 rounded-full bg-peach" style={{ width: `${value}%` }} />
              <span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-flame bg-card" style={{ left: `${value}%` }} />
            </span>
          </div>
        ))}
      </Tile>
    </Frame>
  );
}

function Terminal() {
  return (
    <Frame>
      <div className="w-full max-w-[16rem] overflow-hidden rounded-xl bg-ink font-mono text-[10px] leading-relaxed text-stone-300">
        <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-amber-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <div className="space-y-1.5 p-3">
          <p>&gt; Reading northwind.example...</p>
          <p className="rounded bg-white/10 px-2 py-1 text-amber-200">Found: opened a second office, hiring 6</p>
          <p>&gt; Writing first line...</p>
          <p className="rounded bg-green-400/15 px-2 py-1 text-green-300">Ready: mentions the new office</p>
        </div>
      </div>
    </Frame>
  );
}

function Timeline() {
  return (
    <Frame>
      <div className="relative w-full max-w-[17rem]">
        <span className="absolute left-4 right-4 top-4 h-px bg-line-strong" />
        <ol className="relative flex justify-between">
          {[
            ["Day 0", "Email 1", true],
            ["Day 3", "Reply?", true],
            ["Day 7", "Follow", false],
            ["Day 12", "Close", false],
          ].map(([day, label, done]) => (
            <li key={String(day)} className="flex w-10 flex-col items-center gap-1.5 text-center sm:w-12">
              <span className={cn("flex size-7 items-center justify-center rounded-full border text-[10px] font-semibold sm:size-8", done ? "border-flame bg-flame text-white" : "border-line-strong bg-card text-ink-low")}>
                {done ? <Check className="size-3.5" strokeWidth={3} /> : String(day).replace("Day ", "")}
              </span>
              <Caps className="text-[9px]">{day}</Caps>
              <span className="text-[10px] text-ink-mid">{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function Health() {
  return (
    <Frame>
      <Tile className="w-full max-w-[14rem] p-4">
        <div className="flex items-center justify-between">
          <Caps>Inbox health</Caps>
          <span className="flex items-center gap-1 text-[10px] font-medium text-good">
            <span className="size-1.5 rounded-full bg-good" /> Healthy
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p className="font-serif text-[2rem] leading-none text-ink">98%</p>
          <span className="text-[10px] text-ink-mid">in the inbox</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
          <span className="rounded-lg bg-wash px-2 py-1.5 text-ink-mid">
            Spam <b className="font-semibold text-ink">0.2%</b>
          </span>
          <span className="rounded-lg bg-wash px-2 py-1.5 text-ink-mid">
            Warm-up <b className="font-semibold text-ink">day 14</b>
          </span>
        </div>
      </Tile>
    </Frame>
  );
}

function Roadmap() {
  const rows = [
    ["Domains warmed", "done"],
    ["List built and verified", "done"],
    ["Sequence live", "live"],
    ["First meetings", "wait"],
  ];
  return (
    <Frame>
      <Tile className="w-full max-w-[14rem] p-4">
        <Caps className="block">14-day roadmap</Caps>
        <ul className="mt-3 space-y-2.5">
          {rows.map(([label, state]) => (
            <li key={label} className="flex items-center gap-2.5 text-[11px]">
              <span className={cn("flex size-4 shrink-0 items-center justify-center rounded-full", state === "done" ? "bg-good text-white" : state === "live" ? "border-2 border-flame bg-card" : "border border-line-strong bg-card")}>
                {state === "done" ? <Check className="size-2.5" strokeWidth={3.5} /> : null}
              </span>
              <span className={cn(state === "wait" ? "text-ink-low" : "font-medium text-ink")}>{label}</span>
            </li>
          ))}
        </ul>
        <span className="mt-3.5 block h-1.5 rounded-full bg-wash">
          <span className="block h-full w-[62%] rounded-full bg-flame" />
        </span>
      </Tile>
    </Frame>
  );
}

function InboxVisual() {
  const rows = [
    ["Interested", "bg-green-50 text-good border-green-200", "Can we do Thursday?"],
    ["Referral", "bg-flame-soft text-flame-text border-peach", "Talk to our COO, Mia"],
    ["Not now", "bg-wash text-ink-mid border-line", "Revisit next quarter"],
  ];
  return (
    <Frame>
      <Tile className="w-full max-w-[16rem] divide-y divide-line">
        {rows.map(([tag, tone, text]) => (
          <div key={tag} className="flex items-center gap-2.5 px-3 py-2.5">
            <Inbox className="size-3.5 shrink-0 text-ink-low" />
            <span className="min-w-0 flex-1 truncate text-[11px] text-ink">{text}</span>
            <span className={cn("rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide", tone)}>{tag}</span>
          </div>
        ))}
      </Tile>
    </Frame>
  );
}

function Sync() {
  return (
    <Frame>
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-ink px-4 py-2 text-center">
          <Caps className="block text-[8px] text-orange-300">Meeting booked</Caps>
          <span className="font-serif text-[1.0625rem] leading-none text-white">Fourteen</span>
        </div>
        <span className="h-3 w-px bg-ink" />
        <div className="flex gap-3 rounded-xl border border-dashed border-line-strong px-3 pb-2 pt-3">
          {[
            ["H", "CRM", "text-flame-text border-peach"],
            ["C", "Calendar", "text-blue-700 border-blue-200"],
            ["S", "Slack", "text-good border-green-200"],
          ].map(([letter, label, tone]) => (
            <span key={label} className="flex flex-col items-center gap-1">
              <span className={cn("flex size-9 items-center justify-center rounded-lg border-2 bg-card text-[13px] font-bold", tone)}>{letter}</span>
              <span className="text-[9px] text-ink-mid">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export const visuals: Record<string, ComponentType> = {
  match: Match,
  ring: Ring,
  nodes: Nodes,
  email: Email,
  bars: Bars,
  queue: Queue,
  map: MapVisual,
  tree: Tree,
  chat: Chat,
  score: Score,
  sliders: Sliders,
  terminal: Terminal,
  timeline: Timeline,
  health: Health,
  roadmap: Roadmap,
  inbox: InboxVisual,
  sync: Sync,
};

/** Renders the drawing named in the config, or nothing if the name is unknown. */
export function Visual({ name }: { name: string }) {
  const Component = visuals[name];
  return Component ? <Component /> : null;
}
