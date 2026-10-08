"use client";
import { Check, Plus, Sunrise } from "lucide-react";
import { site } from "@/site.config";
import { useTempo } from "@/components/TempoProvider";

export function PlanScreen() {
  const { completed, toggleRoutine } = useTempo();
  return (
    <div className="app-screen plan-screen">
      <p className="app-kicker">A FRESH LITTLE START</p>
      <h3>
        Hello, you<span>.</span>
      </h3>
      <p className="app-subtitle">Let’s give today a little shape.</p>
      <div className="morning-note">
        <Sunrise size={23} strokeWidth={1.4} />
        <p>
          A little intention<span>Make room for what matters.</span>
        </p>
        <span className="note-star">✳</span>
      </div>
      <div className="app-list-heading">
        <span>Your everyday</span>
        <span className="mono">
          {completed.length} / {site.routine.length}
        </span>
      </div>
      <div className="routine-list">
        {site.routine.map((item) => (
          <button
            className={`routine-item ${completed.includes(item.id) ? "done" : ""}`}
            key={item.id}
            onClick={() => toggleRoutine(item.id)}
            aria-pressed={completed.includes(item.id)}
            aria-label={`Mark ${item.title} ${completed.includes(item.id) ? "incomplete" : "complete"}`}
          >
            <span className="routine-check">
              {completed.includes(item.id) ? (
                <Check size={12} />
              ) : (
                <Plus size={12} />
              )}
            </span>
            <span className="routine-text">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </span>
            <span className="routine-time mono">{item.time}</span>
          </button>
        ))}
      </div>
      <p className="app-bottom-note">A little progress is still progress.</p>
    </div>
  );
}
