"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { useSite } from "../SiteShell";

const agents = ["customer-care", "lead-routing", "doc-review", "weekly-digest"];
const line = (n: number) => {
  const tasks = site.capabilities.tasks;
  const s = 7 + n * 3;
  return {
    id: n,
    time: `09:${String(41 + Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`,
    agent: agents[n % agents.length],
    task: tasks[n % tasks.length],
    took: `${(0.6 + ((n * 7) % 13) / 10).toFixed(1)}s`,
    person: n % 5 === 3,
  };
};

/** A short, deterministic run log that keeps writing while it is on screen. */
export function RunLog() {
  const { motion } = useSite();
  const [count, setCount] = useState(5);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!motion || paused) return;
    const timer = setInterval(() => setCount((n) => n + 1), 1600);
    return () => clearInterval(timer);
  }, [motion, paused]);
  const lines = Array.from({ length: 5 }, (_, i) => line(count - 5 + i));
  return (
    <div
      className="run-log"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div className="run-log-head mono">
        <span className="status-dot" />
        Run log · example
        <span>{paused ? "Paused" : "Live"}</span>
      </div>
      <ol>
        {lines.map((l) => (
          <li key={l.id}>
            <span>{l.time}</span>
            <span>{l.agent}</span>
            <span>{l.task}</span>
            <span className={l.person ? "is-person" : ""}>
              {l.person ? "→ person" : `✓ ${l.took}`}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
