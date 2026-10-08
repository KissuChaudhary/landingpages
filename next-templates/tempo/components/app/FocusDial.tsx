"use client";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useTempo } from "@/components/TempoProvider";
import { site } from "@/site.config";

export function DialFace({ compact = false }: { compact?: boolean }) {
  const { session } = useTempo();
  const circumference = 2 * Math.PI * 143;
  return (
    <div className={`dial-face ${compact ? "compact" : ""}`}>
      <svg viewBox="0 0 360 360" fill="none" aria-hidden="true">
        <circle
          cx="180"
          cy="180"
          r="143"
          stroke="var(--dial-track)"
          strokeWidth="3"
        />
        <circle
          cx="180"
          cy="180"
          r="143"
          stroke="var(--forest)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - session.progress)}
          transform="rotate(-90 180 180)"
        />
        {Array.from({ length: 60 }, (_, index) => {
          const angle = (index * Math.PI) / 30;
          const inner = index % 5 === 0 ? 154 : 159;
          return (
            <line
              key={index}
              x1={(180 + inner * Math.sin(angle)).toFixed(3)}
              y1={(180 - inner * Math.cos(angle)).toFixed(3)}
              x2={(180 + 165 * Math.sin(angle)).toFixed(3)}
              y2={(180 - 165 * Math.cos(angle)).toFixed(3)}
              stroke={index % 5 === 0 ? "#677663" : "#aeb7a7"}
              strokeWidth={index % 5 === 0 ? 1.5 : 1}
            />
          );
        })}
        <circle cx="180" cy="37" r="5" fill="var(--forest)" />
      </svg>
      <div className="dial-readout">
        <span className="mono dial-caption">
          {session.complete ? "WELL DONE" : "A LITTLE FOCUS"}
        </span>
        <span
          className="dial-time"
          role="timer"
          aria-live="off"
          aria-label={`${session.remaining} seconds remaining`}
        >
          {session.display}
        </span>
        <span className="dial-subtitle">
          {session.complete
            ? "Take a moment. You earned it."
            : site.session.note}
        </span>
        {!compact && (
          <span className="dial-flower" aria-hidden="true">
            ✳
          </span>
        )}
      </div>
    </div>
  );
}
export function FocusDial() {
  const { session } = useTempo();
  return (
    <div className="focus-instrument" id="focus-demo">
      <div className="instrument-heading">
        <span className="mono">SLOW DOWN. SETTLE IN.</span>
        <span className="instrument-light" aria-hidden="true" />
      </div>
      <DialFace />
      <div
        className="duration-controls"
        role="group"
        aria-label="Focus duration"
      >
        {site.session.durations.map((minutes) => (
          <button
            key={minutes}
            onClick={() => session.choose(minutes)}
            aria-pressed={session.minutes === minutes}
            disabled={session.running}
          >
            {minutes}
            <span> min</span>
          </button>
        ))}
      </div>
      <div className="session-controls">
        <button className="button button-forest" onClick={session.toggle}>
          {session.running ? (
            <Pause size={15} fill="currentColor" />
          ) : (
            <Play size={15} fill="currentColor" />
          )}
          {session.running
            ? "Pause session"
            : session.complete
              ? "Start another"
              : session.remaining < session.minutes * 60
                ? "Resume session"
                : "Start session"}
        </button>
        <button
          className="icon-button reset-session"
          onClick={session.reset}
          aria-label="Reset focus session"
        >
          <RotateCcw size={17} />
        </button>
      </div>
      <p className="session-status" role="status">
        {session.complete
          ? "Session complete. A little time, well spent."
          : session.running
            ? "Your session is running. One thing at a time."
            : "A real little timer. Try it for yourself."}
      </p>
    </div>
  );
}
