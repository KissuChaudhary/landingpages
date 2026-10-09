"use client";

import { site } from "@/site.config";

import * as React from "react";
import { Check, GitPullRequest, GitMerge } from "lucide-react";
import type { Step } from "@/site.config";
import { TextMorph } from "@/components/hairline/text-morph";

/*
 * The three "how it works" scenes. They play when their step opens:
 *   connect  accounts connect one by one, each spinner drawing a check
 *   review   findings slide in, ranked by monthly cost
 *   merge    a pull request passes its checks, then merges
 * Sample data, for illustration.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

function Spinner({ done }: { done: boolean }) {
  return (
    <span aria-hidden="true" className="relative grid size-4 place-items-center">
      <span className={`absolute size-3.5 rounded-full border-2 border-white/20 border-t-white/80 transition-opacity duration-300 motion-reduce:animate-none ${done ? "" : "animate-spin"}`} style={{ opacity: done ? 0 : 1 }} />
      <svg viewBox="0 0 16 16" fill="none" className="absolute size-4 text-mint">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} style={{ strokeDashoffset: done ? 0 : 1, transition: `stroke-dashoffset 420ms ${EASE}` }} />
      </svg>
    </span>
  );
}

/** Counts up through the scene's beats while it plays, and resets when it closes. */
function useBeats(play: boolean, count: number, gap: number, first = 400) {
  const [beat, setBeat] = React.useState(0);
  React.useEffect(() => {
    if (!play) {
      setBeat(0);
      return;
    }
    const timers = Array.from({ length: count }, (_, i) => window.setTimeout(() => setBeat(i + 1), first + i * gap));
    return () => timers.forEach(window.clearTimeout);
  }, [play, count, gap, first]);
  return beat;
}

function Connect({ play }: { play: boolean }) {
  const accounts = [
    ["AWS", "prod-us-east-1"],
    ["Google Cloud", "data-platform"],
    ["Azure", "eu-west-shared"],
    ["Kubernetes", "api-cluster"],
  ];
  const beat = useBeats(play, accounts.length, 520);
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5 sm:p-7">
      <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.04] p-3 font-mono text-[10.5px] leading-relaxed text-white/55">
        <span className="text-mint">role</span> = ShearReadOnly
        <br />
        <span className="text-mint">permissions</span> = [&quot;read:usage&quot;, &quot;read:billing&quot;]
      </div>
      <ul className="space-y-2">
        {accounts.map(([cloud, name], i) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-[12px] border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
            style={{ opacity: play ? 1 : 0, transform: play ? "none" : "translateY(8px)", transition: `all 600ms ${EASE} ${play ? i * 90 : 0}ms` }}
          >
            <span className="text-[12.5px] text-white">
              {cloud} <span className="font-mono text-[11px] text-white/45">· {name}</span>
            </span>
            <span className="flex items-center gap-2 text-[11px] text-white/50">
              <TextMorph>{beat > i ? "Connected" : "Connecting"}</TextMorph>
              <Spinner done={beat > i} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Review({ play }: { play: boolean }) {
  const findings = [
    ["Idle GPU nodes", "ml-training", "Priya", 6120],
    ["Oversized database", "orders-db", "Daniel", 4380],
    ["Unattached volumes", "238 volumes", "Maya", 2910],
    ["Old snapshots", "nightly backups", "Tom", 1840],
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center p-5 sm:p-7">
      <div className="mb-3 flex items-baseline justify-between text-[11px] text-white/50">
        <span>17 findings</span>
        <span className="font-mono text-[13px] text-white">$18,240/mo</span>
      </div>
      <ul className="space-y-2">
        {findings.map(([title, scope, owner, cost], i) => (
          <li
            key={title}
            className={`flex items-center gap-3 rounded-[12px] border px-3 py-2.5 ${i === 0 ? "border-mint/30 bg-mint/[0.07]" : "border-white/[0.08] bg-white/[0.03]"}`}
            style={{ opacity: play ? 1 : 0, transform: play ? "none" : "translateX(16px)", transition: `all 700ms ${EASE} ${play ? 200 + i * 110 : 0}ms` }}
          >
            <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-[10.5px] font-[600] text-white/80">
              {owner[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] text-white">{title}</span>
              <span className="block truncate font-mono text-[10.5px] text-white/45">
                {scope} · {owner}
              </span>
            </span>
            <span className="font-mono text-[12px] text-mint">${cost.toLocaleString(site.locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Merge({ play }: { play: boolean }) {
  const beat = useBeats(play, 3, 650, 500);
  const merged = beat >= 3;
  return (
    <div className="flex h-full flex-col justify-center p-5 sm:p-7">
      <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.03]">
        <div className="flex items-start gap-2.5 border-b border-white/[0.07] p-3.5">
          <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-500 ${merged ? "bg-violet-400/20 text-violet-300" : "bg-mint/15 text-mint"}`}>
            {merged ? <GitMerge aria-hidden="true" className="size-3.5" /> : <GitPullRequest aria-hidden="true" className="size-3.5" />}
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] text-white">Rightsize api-prod node pool</p>
            <p className="font-mono text-[10.5px] text-white/45">infra/terraform · opened by shear-bot</p>
          </div>
        </div>
        <pre className="overflow-hidden p-3.5 font-mono text-[10.5px] leading-[1.7]">
          <span className="block text-white/40">  node_pool &quot;api-prod&quot; {"{"}</span>
          <span className="block bg-red-400/10 text-red-300">-   machine_type = &quot;n2-standard-16&quot;</span>
          <span className="block bg-mint/10 text-mint">+   machine_type = &quot;n2-standard-8&quot;</span>
          <span className="block text-white/40">  {"}"}</span>
        </pre>
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] p-3">
          <span className="flex items-center gap-2 text-[11px] text-white/55">
            <Spinner done={beat >= 1} />
            <TextMorph>{beat >= 1 ? "Checks passed" : "Running checks"}</TextMorph>
          </span>
          <span
            className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-[560] transition-colors duration-500 ${merged ? "bg-violet-400/20 text-violet-200" : beat >= 2 ? "bg-mint text-ink" : "bg-white/10 text-white/50"}`}
          >
            <span aria-hidden="true" className="grid overflow-hidden transition-[width] duration-500" style={{ width: merged ? 14 : 0 }}>
              <Check className="size-3.5" strokeWidth={2.6} />
            </span>
            <TextMorph>{merged ? "Merged" : "Merge"}</TextMorph>
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[11.5px] text-white/50" style={{ opacity: merged ? 1 : 0, transition: `opacity 500ms ${EASE}` }}>
        <span className="font-mono text-mint">−$4,120/mo</span> on the next invoice
      </p>
    </div>
  );
}

const scenes = { connect: Connect, review: Review, merge: Merge };

export function StepScene({ scene, play }: { scene: Step["scene"]; play: boolean }) {
  const Scene = scenes[scene];
  return (
    <div className="relative isolate h-full overflow-hidden rounded-[18px] bg-ink text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_100%,rgba(124,240,181,0.16),transparent_70%)]" />
      <Scene play={play} />
    </div>
  );
}
