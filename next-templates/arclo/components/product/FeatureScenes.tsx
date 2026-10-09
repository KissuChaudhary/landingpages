"use client";
import { useState } from "react";
import { ArrowRight, Check, Plus, Sparkles, Stamp } from "lucide-react";
import { ToolIcon } from "./ToolIcon";
import { useExperience } from "../Experience";
export function BuilderScene() {
  return (
    <div className="feature-scene builder-scene" aria-hidden="true">
      <svg viewBox="0 0 320 180">
        <path d="M65 44H250V140H160V44" />
      </svg>
      <div className="mini-node builder-trigger">
        <ToolIcon name="bank" small />
        <span>
          Bank feed
          <br />
          <b>synced at 6:00</b>
        </span>
      </div>
      <div className="mini-node builder-rules">
        <ToolIcon small />
        <span>
          Matching
          <br />
          <b>rules applied</b>
        </span>
      </div>
      <div className="mini-node builder-message">
        <ToolIcon name="approval" small />
        <span>
          Exceptions
          <br />
          <b>sent to Lena</b>
        </span>
      </div>
      <div className="mini-node builder-calendar">
        <ToolIcon name="ledger" small />
        <span>
          Matches
          <br />
          <b>posted to ledger</b>
        </span>
      </div>
      <span className="scene-cursor">↖</span>
    </div>
  );
}
export function IntegrationScene() {
  return (
    <div className="feature-scene integration-scene" aria-hidden="true">
      <svg viewBox="0 0 320 180">
        <path d="M160 95L55 115M160 95L100 30M160 95V20M160 95L245 40M160 95L265 125M160 95V168" />
      </svg>
      <div className="integration-center">
        <ToolIcon />
      </div>
      {["bank", "card", "ledger", "payroll", "document", "calendar"].map(
        (name, index) => (
          <div
            className={`integration-satellite satellite-${index}`}
            key={name}
          >
            <ToolIcon name={name} />
          </div>
        ),
      )}
    </div>
  );
}
export function ModuleScene() {
  return (
    <div className="feature-scene module-scene" aria-hidden="true">
      <div className="module-library">
        <span>OCTOBER CHECKLIST</span>
        <div>
          <ToolIcon name="bank" small />
          Reconcile bank accounts
        </div>
        <div>
          <ToolIcon name="document" small />
          Review accruals
        </div>
        <div className="module-selected">
          <ToolIcon name="calendar" small />
          Lock the period <Plus size={13} />
        </div>
      </div>
      <div className="module-chain">
        <div className="mini-node">
          <ToolIcon name="check" small />
          <span>
            Day 1
            <br />
            <b>banks and cards</b>
          </span>
        </div>
        <span className="chain-line" />
        <div className="mini-node">
          <ToolIcon name="ledger" small />
          <span>
            Day 3
            <br />
            <b>accruals booked</b>
          </span>
        </div>
      </div>
    </div>
  );
}
export function AnalyticsScene() {
  const [period, setPeriod] = useState("close");
  // Share of bank lines reconciled: through this close by day, or at each month's close.
  const values =
    period === "close" ? [18, 34, 51, 66, 79, 90, 97] : [62, 74, 85, 97];
  const x = (index: number) => 25 + index * (438 / (values.length - 1));
  return (
    <div className="feature-scene analytics-scene">
      <div className="chart-heading">
        <span>Lines reconciled</span>
        <div>
          <button
            aria-pressed={period === "close"}
            onClick={() => setPeriod("close")}
          >
            This close
          </button>
          <button
            aria-pressed={period === "months"}
            onClick={() => setPeriod("months")}
          >
            By month
          </button>
        </div>
      </div>
      <svg
        viewBox="0 0 480 170"
        role="img"
        aria-label={
          period === "close"
            ? "Illustrative chart: lines reconciled rise from 18% on day one to 97% on day seven of the close"
            : "Illustrative chart: lines reconciled at close rise from 62% in July to 97% in October"
        }
      >
        <defs>
          <linearGradient id="arclo-chart" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2a7d88" stopOpacity=".3" />
            <stop offset="1" stopColor="#2a7d88" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 75, 120].map((y) => (
          <line key={y} x1="25" y1={y} x2="465" y2={y} />
        ))}
        <path
          d={`M${values.map((value, index) => `${x(index)},${145 - value * 1.2}`).join(" L")} L463,160 L25,160Z`}
          fill="url(#arclo-chart)"
          stroke="none"
        />
        <polyline
          points={values
            .map((value, index) => `${x(index)},${145 - value * 1.2}`)
            .join(" ")}
          fill="none"
          stroke="#1f6c77"
          strokeWidth="2.5"
        />
        <polyline
          points="25,120 98,74 171,88 244,105 317,62 390,81 463,40"
          className="chart-secondary"
        />
        {values.map((_, i) => (
          <text key={i} x={x(i)} y="169">
            {period === "close" ? `D${i + 1}` : ["Jul", "Aug", "Sep", "Oct"][i]}
          </text>
        ))}
      </svg>
      <span className="chart-caption">
        Illustrative close data · switch between the two views
      </span>
    </div>
  );
}
export function PromptScene() {
  const [text, setText] = useState(
    "Software is up because the annual design tool renewal landed in October.",
  );
  const { openWorkspace } = useExperience();
  return (
    <div className="feature-scene prompt-scene">
      <div className="mini-node prompt-account">
        <ToolIcon name="document" />
        <span>
          6100 Software
          <br />
          <b>up 29.6% on September</b>
        </span>
      </div>
      <div className="prompt-input">
        <label className="sr-only" htmlFor="feature-prompt">
          Draft variance note
        </label>
        <textarea
          id="feature-prompt"
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={180}
        />
        <div>
          <button
            className="refine-button"
            onClick={() =>
              setText(
                "One-off annual renewal, paid in October. Moved to prepaids and released monthly from November.",
              )
            }
          >
            <Sparkles size={12} /> Tighten the note
          </button>
          <button
            aria-label="Explore the variance workflow"
            className="prompt-submit"
            onClick={() => openWorkspace("flux")}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export function FrameworkScene() {
  return (
    <div className="framework-scene" aria-hidden="true">
      <div className="framework-ring ring-one" />
      <div className="framework-ring ring-two" />
      <div className="framework-stack stack-back">
        <span />
        <span />
        <span />
      </div>
      <div className="framework-stack stack-front">
        <div>
          <Check size={13} /> Source
        </div>
        <div>
          <Sparkles size={13} /> Rules
        </div>
        <div>
          <Stamp size={13} /> Sign-off
        </div>
        <div>
          <ToolIcon small />
          Your close
        </div>
      </div>
      <span className="framework-spark spark-one">✦</span>
      <span className="framework-spark spark-two">✦</span>
    </div>
  );
}
