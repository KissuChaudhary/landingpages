"use client";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { DialFace } from "./FocusDial";
import { useTempo } from "@/components/TempoProvider";
import { site } from "@/site.config";

export function FocusScreen() {
  const { session } = useTempo();
  return (
    <div className="app-screen focus-screen">
      <p className="app-kicker">HERE, NOW</p>
      <h3>
        A little focus<span>.</span>
      </h3>
      <p className="app-subtitle">Give one good thing your attention.</p>
      <DialFace compact />
      <div className="focus-task">
        <span className="task-dot" />
        <span>{site.session.task}</span>
        <ArrowUpRight size={13} />
      </div>
      <button
        className="phone-action"
        onClick={session.toggle}
        aria-label={
          session.running
            ? "Pause phone focus timer"
            : "Start phone focus timer"
        }
      >
        {session.running ? (
          <Pause size={13} fill="currentColor" />
        ) : (
          <Play size={13} fill="currentColor" />
        )}
        {session.running
          ? "Pause for a moment"
          : session.complete
            ? "A fresh start"
            : "Let’s begin"}
      </button>
      <p className="app-bottom-note">Your pace. Your little pocket of time.</p>
    </div>
  );
}
