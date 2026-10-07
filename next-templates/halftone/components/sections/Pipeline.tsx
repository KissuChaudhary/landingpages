"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { KeyRound, Layers, RotateCw, Split, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { usePlayback, useSequence } from "@/components/motion/hooks";
import { ScaledStage } from "@/components/motion/Stage";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Reveal, SectionHeader } from "@/components/ui/Reveal";
import { StatusPill, type Tone } from "@/components/ui/Status";

/* Labels inside the diagram. Page copy is in site.config.ts. */
const LABELS = {
  app: "Your app",
  call: "POST /v1/events",
  waiting: "Waiting",
  delivered: ["200 OK · 41 ms", "200 OK · 38 ms"],
  failed: "503 Unavailable",
  scheduled: "Retry in 30s",
  recovered: "200 OK · 2nd try",
  stageDetail: ["HMAC-SHA256", "Durable", "3 endpoints", "Backoff"],
  retryScheduled: "1 scheduled",
  retryRecovered: "Recovered",
};

const STAGE_ICONS: LucideIcon[] = [KeyRound, Layers, Split, RotateCw];

/*
 * The loop, in beats (ms):
 * 0 idle · 1 send · 2 sign · 3 queue · 4 fan out · 5 results (one 503) · 6 retry scheduled · 7 wait · 8 resend · 9 all delivered
 */
const BEATS = [700, 800, 450, 450, 900, 1300, 700, 1100, 800, 2800] as const;
const FINAL = BEATS.length - 1;

/* ------------------------------------------------------------------ geometry (stage pixels) */

const STAGE = { width: 1000, height: 380 };
type Point = [number, number];
type PathFn = (t: number) => Point;

const APP_OUT: Point = [210, 190];
const HUB_IN: Point = [360, 190];
const HUB_OUT: Point = [640, 190];
const ENDPOINT_Y = [66, 190, 314];
const ENDPOINT_IN: Point[] = ENDPOINT_Y.map((y) => [790, y]);

const straight =
  (a: Point, b: Point): PathFn =>
  (t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

const curve = (a: Point, b: Point): PathFn => {
  const mx = (a[0] + b[0]) / 2;
  return (t) => {
    const u = 1 - t;
    const x = u * u * u * a[0] + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b[0];
    const y = u * u * u * a[1] + 3 * u * u * t * a[1] + 3 * u * t * t * b[1] + t * t * t * b[1];
    return [x, y];
  };
};

const curveD = (a: Point, b: Point) => {
  const mx = (a[0] + b[0]) / 2;
  return `M ${a[0]} ${a[1]} C ${mx} ${a[1]}, ${mx} ${b[1]}, ${b[0]} ${b[1]}`;
};

const SEND_PATH = straight(APP_OUT, HUB_IN);
const FAN_PATHS = ENDPOINT_IN.map((point) => curve(HUB_OUT, point));
const RETURN_PATH: PathFn = (t) => FAN_PATHS[2](1 - t);

/* ------------------------------------------------------------------ state */

type StageState = "idle" | "on" | "warn" | "ok";

function stageStates(step: number): StageState[] {
  const retry: StageState = step >= 9 ? "ok" : step >= 6 ? "warn" : "idle";
  return [step >= 2 ? "on" : "idle", step >= 3 ? "on" : "idle", step >= 4 ? "on" : "idle", retry];
}

function endpointStatus(index: number, step: number): { tone: Tone; label: string } {
  if (step < 5) return { tone: "idle", label: LABELS.waiting };
  if (index < 2) return { tone: "ok", label: LABELS.delivered[index] };
  if (step === 5) return { tone: "fail", label: LABELS.failed };
  if (step < 9) return { tone: "warn", label: LABELS.scheduled };
  return { tone: "ok", label: LABELS.recovered };
}

/* ------------------------------------------------------------------ pieces */

function Packet({ path, run, duration = 0.8, tone = "accent" }: { path: PathFn; run: boolean; duration?: number; tone?: "accent" | "warn" }) {
  const t = useMotionValue(0);
  const x = useTransform(t, (value) => path(value)[0]);
  const y = useTransform(t, (value) => path(value)[1]);
  const opacity = useTransform(t, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  useEffect(() => {
    t.set(0);
    if (!run) return;
    const controls = animate(t, 1, { duration, ease: [0.45, 0, 0.25, 1] });
    return () => controls.stop();
  }, [run, duration, t]);

  return (
    <motion.span
      style={{ x, y, opacity }}
      className={cn(
        "absolute -left-[6px] -top-[6px] z-20 size-3 rounded-[3px]",
        tone === "warn" ? "bg-orange-500 shadow-[0_0_0_5px_rgba(249,115,22,0.16)]" : "bg-accent shadow-[0_0_0_5px_rgba(48,93,222,0.16)]",
      )}
    />
  );
}

function AppNode({ active, className }: { active: boolean; className?: string }) {
  return (
    <div className={cn("rounded-[20px] bg-white p-4 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.06]", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{LABELS.app}</p>
      <p
        className={cn(
          "mt-2 rounded-lg px-2.5 py-1.5 font-mono text-[13px] transition-colors duration-500",
          active ? "bg-accent/10 text-accent" : "bg-black/[0.04] text-neutral-600",
        )}
      >
        {LABELS.call}
      </p>
    </div>
  );
}

function HubNode({ step, className }: { step: number; className?: string }) {
  const states = stageStates(step);
  return (
    <div className={cn("rounded-[26px] bg-white p-2 shadow-[0_30px_60px_-36px_rgba(15,23,42,0.5)] ring-1 ring-accent/20", className)}>
      <div className="flex items-center gap-2 px-3 pb-3 pt-2.5">
        <span className="flex size-7 items-center justify-center rounded-[9px] bg-ink text-white">
          <BrandGlyph className="size-[18px]" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-ink">{site.brand.name}</span>
      </div>
      <ul className="grid gap-1.5">
        {site.pipeline.stages.map((label, index) => {
          const state = states[index];
          const Icon = STAGE_ICONS[index % STAGE_ICONS.length];
          const detail =
            index === 3 && state === "warn" ? LABELS.retryScheduled : index === 3 && state === "ok" ? LABELS.retryRecovered : LABELS.stageDetail[index];
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-[14px] px-2.5 py-2 transition-colors duration-500",
                state === "idle" ? "bg-black/[0.025]" : state === "warn" ? "bg-orange-500/[0.08]" : state === "ok" ? "bg-emerald-500/[0.08]" : "bg-accent/[0.07]",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-[9px] transition-colors duration-500",
                  state === "idle" ? "bg-white text-neutral-400 ring-1 ring-black/[0.06]" : state === "warn" ? "bg-orange-500 text-white" : state === "ok" ? "bg-emerald-500 text-white" : "bg-accent text-white",
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <span className={cn("text-[14px] font-semibold tracking-tight transition-colors duration-500", state === "idle" ? "text-neutral-500" : "text-ink")}>
                {label}
              </span>
              <span className="ml-auto font-mono text-[11px] text-neutral-400">{detail}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EndpointNode({ index, step, className, style }: { index: number; step: number; className?: string; style?: CSSProperties }) {
  const endpoint = site.samples.endpoints[index];
  const status = endpointStatus(index, step);
  return (
    <div style={style} className={cn("rounded-[20px] bg-white px-4 py-3.5 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.06]", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[14px] font-semibold tracking-tight text-ink">{endpoint.name}</p>
        <StatusPill tone={status.tone}>{status.label}</StatusPill>
      </div>
      <p className="mt-1 truncate font-mono text-[12px] text-neutral-400">{endpoint.host}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ section */

export function Pipeline() {
  const { pipeline } = site;
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.35);
  const [sequence] = useSequence(BEATS, playing);
  const step = reduced ? FINAL : sequence;
  const animated = !reduced;

  return (
    <section id="product" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker={pipeline.kicker} lead={pipeline.lead} accent={pipeline.accent} description={pipeline.description} />

        <Reveal y={35}>
          <div ref={ref} className="surface rounded-[36px] p-2">
            <div className="relative overflow-hidden rounded-[30px] bg-white bg-[radial-gradient(rgba(15,23,42,0.075)_1px,transparent_1px)] p-5 ring-1 ring-black/[0.05] [background-size:18px_18px] sm:p-8 lg:px-10 lg:py-8">
              {/* Large screens: the diagram at fixed coordinates, scaled to fit. */}
              <div aria-hidden="true" className="hidden md:block">
                <ScaledStage width={STAGE.width} height={STAGE.height}>
                  <svg className="absolute inset-0" width={STAGE.width} height={STAGE.height} fill="none">
                    <path d={`M ${APP_OUT[0]} ${APP_OUT[1]} H ${HUB_IN[0]}`} stroke="#cfd5df" strokeWidth="1.5" strokeDasharray="3 5" />
                    {ENDPOINT_IN.map((point, index) => (
                      <path key={index} d={curveD(HUB_OUT, point)} stroke="#cfd5df" strokeWidth="1.5" strokeDasharray="3 5" />
                    ))}
                  </svg>

                  <AppNode active={step >= 1 && step < 5} className="absolute left-0 top-[148px] w-[210px]" />
                  <HubNode step={step} className="absolute left-[360px] top-[65px] w-[280px]" />
                  {ENDPOINT_Y.map((y, index) => (
                    <EndpointNode key={index} index={index} step={step} className="absolute left-[790px] w-[210px]" style={{ top: y - 34 }} />
                  ))}

                  {animated ? (
                    <>
                      <Packet path={SEND_PATH} run={step === 1} />
                      {FAN_PATHS.map((path, index) => (
                        <Packet key={index} path={path} run={step === 4} duration={0.85} />
                      ))}
                      <Packet path={RETURN_PATH} run={step === 6} tone="warn" duration={0.7} />
                      <Packet path={FAN_PATHS[2]} run={step === 8} duration={0.8} />
                    </>
                  ) : null}
                </ScaledStage>
              </div>

              {/* Phones: the same states, stacked. */}
              <div aria-hidden="true" className="flex flex-col items-stretch md:hidden">
                <AppNode active={step >= 1 && step < 5} />
                <span className="mx-auto h-6 w-px border-l border-dashed border-[#cfd5df]" />
                <HubNode step={step} />
                <span className="mx-auto h-6 w-px border-l border-dashed border-[#cfd5df]" />
                <div className="grid gap-2">
                  {site.samples.endpoints.map((endpoint, index) => (
                    <EndpointNode key={endpoint.name} index={index} step={step} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-3 md:gap-10">
          {pipeline.steps.map((item, index) => (
            <Reveal key={item.title} delay={0.08 * index} y={24} className="border-t border-black/[0.08] pt-5">
              <span className="font-mono text-xs font-medium text-accent">0{index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
