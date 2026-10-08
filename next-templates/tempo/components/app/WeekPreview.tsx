"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const week = [
  { day: "Mon", short: "M", minutes: 25 },
  { day: "Tue", short: "T", minutes: 45 },
  { day: "Wed", short: "W", minutes: 15 },
  { day: "Thu", short: "T", minutes: 50 },
  { day: "Fri", short: "F", minutes: 25 },
  { day: "Sat", short: "S", minutes: 0 },
  { day: "Sun", short: "S", minutes: 0 },
];
export function WeekPreview() {
  const [active, setActive] = useState(3);
  return (
    <div className="week-preview">
      <div className="week-heading">
        <span>This little week</span>
        <span className="mono">SAMPLE WEEK</span>
      </div>
      <div
        className="week-days"
        role="group"
        aria-label="Explore the sample week"
      >
        {week.map((item, index) => (
          <button
            key={item.day}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            aria-label={`${item.day}: ${item.minutes} focus minutes`}
          >
            <span>{item.short}</span>
            <span
              className={`week-circle level-${Math.ceil(item.minutes / 15)}`}
            >
              <span>{item.minutes ? "✳" : "·"}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="week-summary">
        <span role="status">
          <strong>
            {week[active].minutes} <span>min</span>
          </strong>
          <span>
            {week[active].day} ·{" "}
            {week[active].minutes
              ? "A little time, well spent."
              : "A little room to breathe."}
          </span>
        </span>
        <ArrowUpRight size={20} />
      </div>
    </div>
  );
}
