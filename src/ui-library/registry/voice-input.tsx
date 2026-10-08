"use client";

import * as React from "react";
import { Mic, MicOff, RotateCcw, Square, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * VOICE INPUT: dictating a prompt
 *
 *   idle          a mic button
 *   listening     a waveform drawn from your mic level, the live
 *                 transcript, a timer, Stop and Cancel
 *   transcribing  turning speech into text
 *   blocked       the browser denied the microphone; how to fix it
 *   error         it didn't catch that; try again
 *
 * Your recording code owns the mic: pass status and the current
 * level (0 to 1). Without a level the bars move in a gentle wave.
 * ───────────────────────────────────────────────────────── */

export type VoiceStatus = "idle" | "listening" | "transcribing" | "blocked" | "error";

export interface VoiceInputProps extends React.HTMLAttributes<HTMLDivElement> {
  status: VoiceStatus;
  /** Current microphone level, 0 to 1. */
  level?: number;
  /** The words recognised so far. */
  transcript?: string;
  /** When listening started (ms); shows a timer. */
  startedAt?: number;
  onStart?: () => void;
  onStop?: () => void;
  onCancel?: () => void;
  errorText?: string;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const BARS = 28;
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function formatClock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function VoiceInput({
  status,
  level,
  transcript,
  startedAt,
  onStart,
  onStop,
  onCancel,
  errorText,
  className = "",
  ...props
}: VoiceInputProps) {
  const listening = status === "listening";
  const [history, setHistory] = React.useState<number[]>(() => Array(BARS).fill(0));
  const [now, setNow] = React.useState(startedAt ?? 0);

  // Keep a short history of levels so the waveform scrolls.
  React.useEffect(() => {
    if (!listening || level === undefined) return;
    setHistory((h) => [...h.slice(1), Math.min(1, Math.max(0, level))]);
  }, [level, listening]);

  React.useEffect(() => {
    if (!listening) {
      setHistory(Array(BARS).fill(0));
      return;
    }
    if (startedAt === undefined) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [listening, startedAt]);

  if (status === "idle") {
    return (
      <div className={className} {...props}>
        <button
          type="button"
          aria-label="Dictate"
          onClick={onStart}
          className={`flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
        >
          <Mic className="size-4" />
        </button>
      </div>
    );
  }

  if (status === "blocked" || status === "error") {
    const blocked = status === "blocked";
    return (
      <div role="alert" className={`flex items-center gap-3 animate-[ui-fade-in_250ms_ease-out_both] ${className}`} {...props}>
        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <MicOff className="size-4" />
        </span>
        <span className="min-w-0 text-[12.5px] leading-5">
          <span className="block font-medium text-foreground">{blocked ? "Microphone blocked" : "Didn’t catch that"}</span>
          <span className="block text-muted-foreground">
            {errorText ?? (blocked ? "Allow the microphone in your browser’s site settings, then try again." : "Speak a little closer to the microphone.")}
          </span>
        </span>
        {onStart && (
          <button
            type="button"
            onClick={onStart}
            className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[12px] font-medium text-foreground transition-colors hover:bg-accent ${FOCUS}`}
          >
            <RotateCcw aria-hidden="true" className="size-3" />
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`} {...props}>
      {transcript && (
        <p aria-live="polite" className="px-1 text-[13px] leading-relaxed text-foreground animate-[ui-fade-in_200ms_ease-out_both]">
          {transcript}
        </p>
      )}
      <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-background pl-1.5 pr-2 animate-[ui-fade-in_200ms_ease-out_both]">
        {listening ? (
          <button
            type="button"
            aria-label="Stop and transcribe"
            onClick={onStop}
            className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 ${FOCUS}`}
          >
            <Square className="size-3" fill="currentColor" />
          </button>
        ) : (
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center">
            <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none" />
          </span>
        )}

        {listening ? (
          <span aria-hidden="true" className="flex h-6 flex-1 items-center justify-center gap-[3px] overflow-hidden">
            {history.map((v, i) =>
              level === undefined ? (
                <span
                  key={i}
                  className="h-full w-[3px] origin-center rounded-full bg-foreground/70 animate-[ui-wave_1.1s_ease-in-out_infinite] motion-reduce:animate-none"
                  style={{ animationDelay: `${(i % 7) * 90}ms`, transform: "scaleY(0.35)" }}
                />
              ) : (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-foreground/70 transition-[height] duration-100"
                  style={{ height: `${Math.max(12, v * 100)}%` }}
                />
              )
            )}
          </span>
        ) : (
          <span role="status" className={`flex-1 text-[13px] font-medium ${SHIMMER}`}>
            Transcribing
          </span>
        )}

        {listening && startedAt !== undefined && (
          <span className="shrink-0 font-mono text-[11.5px] tabular-nums text-muted-foreground">{formatClock(now - startedAt)}</span>
        )}
        {listening && onCancel && (
          <button
            type="button"
            aria-label="Cancel"
            onClick={onCancel}
            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
      {listening && <span className="sr-only" role="status">Listening</span>}
    </div>
  );
}
