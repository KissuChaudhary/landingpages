"use client";
import { useState } from "react";
const periods = [
  {
    label: "24 hours",
    tasks: "1,247",
    rate: "98.4%",
    duration: "1.2s",
    values: [23, 31, 19, 42, 35, 56, 40, 67, 51, 72, 62, 87],
    counts: ["342", "289", "156"],
  },
  {
    label: "7 days",
    tasks: "8,631",
    rate: "99.1%",
    duration: "1.1s",
    values: [46, 29, 61, 47, 75, 54, 82, 69, 92, 77, 65, 89],
    counts: ["2,405", "2,017", "1,091"],
  },
];
export function AnalyticsDemo() {
  const [period, setPeriod] = useState(0);
  const data = periods[period];
  return (
    <div className="product-window analytics-window">
      <div className="window-title">
        <span className="micro">Activity overview</span>
        <div
          className="period-toggle"
          role="group"
          aria-label="Analytics period"
        >
          {periods.map((item, i) => (
            <button
              key={item.label}
              aria-pressed={i === period}
              onClick={() => setPeriod(i)}
            >
              {i === 0 ? "24h" : "7d"}
            </button>
          ))}
        </div>
      </div>
      <div className="analytics-metrics" aria-live="polite">
        <div>
          <strong>{data.tasks}</strong>
          <span>Example tasks</span>
        </div>
        <div>
          <strong>{data.rate}</strong>
          <span>Success rate</span>
        </div>
        <div>
          <strong>{data.duration}</strong>
          <span>Avg. duration</span>
        </div>
      </div>
      <div className="analytics-chart">
        <span className="micro">Task volume · {data.label}</span>
        <div
          className="chart-bars"
          role="img"
          aria-label={`Illustrative task volume over ${data.label}`}
          key={period}
        >
          {data.values.map((value, i) => (
            <i
              key={i}
              style={
                { "--height": `${value}%`, "--bar": i } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <ul className="analytics-agents">
        {["Customer care", "Lead routing", "Document review"].map((name, i) => (
          <li key={name}>
            <span className="status-dot" />
            <span>{name}</span>
            <span>{data.counts[i]} tasks</span>
          </li>
        ))}
      </ul>
      <p className="analytics-note">Illustrative data</p>
    </div>
  );
}
