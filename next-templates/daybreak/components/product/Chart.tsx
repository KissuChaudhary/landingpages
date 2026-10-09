"use client";
import { useId } from "react";
export function Chart({
  variant = "line",
  period = "month",
}: {
  variant?: "line" | "bars";
  period?: string;
}) {
  const id = useId().replaceAll(":", "");
  const heights =
    period === "quarter"
      ? [22, 32, 28, 46, 40, 54, 60, 52, 70, 67, 84, 91]
      : [28, 37, 35, 48, 45, 54, 43, 64, 72, 69, 86, 92];
  return variant === "bars" ? (
    <div
      className="bar-chart"
      role="img"
      aria-label={`Illustrative ${period} performance trend`}
    >
      {heights.map((h, i) => (
        <span key={i} style={{ height: `${h}%` }} />
      ))}
      <div className="chart-axis">
        <span>{period === "quarter" ? "Jul" : "Sep 01"}</span>
        <span>{period === "quarter" ? "Sep" : "Sep 30"}</span>
      </div>
    </div>
  ) : (
    <svg
      className="line-chart"
      viewBox="0 0 420 150"
      role="img"
      aria-label={`Illustrative ${period} conversion trend`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#96b8f0" stopOpacity=".36" />
          <stop offset="100%" stopColor="#96b8f0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 124C25 124 30 92 60 94S95 127 125 99S154 54 183 71S214 94 246 54S285 76 313 36S362 55 390 18L420 25V150H0Z"
        fill={`url(#${id})`}
      />
      <path
        d="M0 124C25 124 30 92 60 94S95 127 125 99S154 54 183 71S214 94 246 54S285 76 313 36S362 55 390 18L420 25"
        stroke="#8aaee9"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
