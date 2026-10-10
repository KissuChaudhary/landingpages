"use client";
import { useState } from "react";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
export function RevenueChart({
  months,
  values,
}: {
  months: string[];
  values: number[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const active =
    selected !== null && selected < values.length
      ? selected
      : values.length - 1;
  const max = Math.max(...values) * 1.16;
  return (
    <div className="revenue-chart">
      <div className="chart-caption">
        <span>Revenue by month</span>
        <span>
          <TextMorph>{months[active]}</TextMorph>
          <b>
            <NumberRoll value={values[active]} prefix="$" />
          </b>
        </span>
      </div>
      <div className="chart-plot">
        <div className="chart-guides" aria-hidden="true">
          <span>$40k</span>
          <span>$30k</span>
          <span>$20k</span>
          <span>$10k</span>
        </div>
        <div className="chart-bars">
          {values.map((value, index) => (
            <button
              type="button"
              key={months[index]}
              className={`chart-column ${index === active ? "active" : ""}`}
              aria-label={`${months[index]} revenue: $${value.toLocaleString("en-US")}`}
              aria-pressed={index === active}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              onFocus={() => setSelected(index)}
            >
              <span
                className="chart-bar"
                style={{
                  height: `${(value / max) * 100}%`,
                  transitionDelay: `${index * 35}ms`,
                }}
              >
                <span className="bar-cap" />
                <span className="bar-highlight" />
              </span>
              <span className="chart-month">{months[index]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
