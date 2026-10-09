"use client";
import { useState } from "react";
import { ArrowRight, Check, Plus, Sparkles } from "lucide-react";
import { ToolIcon } from "./ToolIcon";
import { useExperience } from "../Experience";
export function BuilderScene() {
  return (
    <div className="feature-scene builder-scene" aria-hidden="true">
      <svg viewBox="0 0 320 180">
        <path d="M65 44H250V140H160V44" />
      </svg>
      <div className="mini-node builder-trigger">
        <ToolIcon name="trigger" small />
        <span>
          New teammate
          <br />
          <b>joins your team</b>
        </span>
      </div>
      <div className="mini-node builder-agent">
        <ToolIcon small />
        <span>
          Onboarding
          <br />
          <b>AI assistant</b>
        </span>
      </div>
      <div className="mini-node builder-message">
        <ToolIcon name="chat" small />
        <span>
          Prepare a warm
          <br />
          <b>welcome message</b>
        </span>
      </div>
      <div className="mini-node builder-calendar">
        <ToolIcon name="calendar" small />
        <span>
          Plan the
          <br />
          <b>first week</b>
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
      {["email", "chat", "calendar", "database", "document", "trigger"].map(
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
        <span>YOUR BUILDING BLOCKS</span>
        <div>
          <ToolIcon name="email" small />
          Summarize an inbox
        </div>
        <div>
          <ToolIcon name="chat" small />
          Prepare an update
        </div>
        <div className="module-selected">
          <ToolIcon name="document" small />
          Create a checklist <Plus size={13} />
        </div>
      </div>
      <div className="module-chain">
        <div className="mini-node">
          <ToolIcon name="database" small />
          <span>
            Read
            <br />
            <b>team context</b>
          </span>
        </div>
        <span className="chain-line" />
        <div className="mini-node">
          <ToolIcon name="document" small />
          <span>
            Create
            <br />
            <b>welcome guide</b>
          </span>
        </div>
      </div>
    </div>
  );
}
export function AnalyticsScene() {
  const [period, setPeriod] = useState("week");
  const values =
    period === "week" ? [22, 30, 24, 43, 55, 48, 72] : [30, 44, 64, 94];
  const x = (index: number) => 25 + index * (438 / (values.length - 1));
  return (
    <div className="feature-scene analytics-scene">
      <div className="chart-heading">
        <span>Workflow activity</span>
        <div>
          <button
            aria-pressed={period === "week"}
            onClick={() => setPeriod("week")}
          >
            Week
          </button>
          <button
            aria-pressed={period === "month"}
            onClick={() => setPeriod("month")}
          >
            Month
          </button>
        </div>
      </div>
      <svg
        viewBox="0 0 480 170"
        role="img"
        aria-label={`Illustrative ${period} workflow activity chart`}
      >
        <defs>
          <linearGradient id="arclo-chart" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#cf7fea" stopOpacity=".35" />
            <stop offset="1" stopColor="#cf7fea" stopOpacity="0" />
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
          stroke="#c66be3"
          strokeWidth="2.5"
        />
        <polyline
          points="25,120 98,74 171,88 244,105 317,62 390,81 463,40"
          className="chart-secondary"
        />
        {values.map((_, i) => (
          <text key={i} x={x(i)} y="169">
            {period === "week"
              ? ["M", "T", "W", "T", "F", "S", "S"][i]
              : `W${i + 1}`}
          </text>
        ))}
      </svg>
      <span className="chart-caption">
        Illustrative activity · explore the two views
      </span>
    </div>
  );
}
export function PromptScene() {
  const [text, setText] = useState("Help a new teammate feel at home.");
  const { openWorkspace } = useExperience();
  return (
    <div className="feature-scene prompt-scene">
      <div className="mini-node prompt-agent">
        <ToolIcon />
        <span>
          Your next
          <br />
          <b>onboarding assistant</b>
        </span>
      </div>
      <div className="prompt-input">
        <label className="sr-only" htmlFor="feature-prompt">
          Example agent instruction
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
                "Create a first-day checklist using the team’s workspace, people and product context.",
              )
            }
          >
            <Sparkles size={12} /> Refine idea
          </button>
          <button
            aria-label="Explore onboarding workflow"
            className="prompt-submit"
            onClick={() => openWorkspace("onboarding")}
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
          <Check size={13} /> Context
        </div>
        <div>
          <Sparkles size={13} /> Instructions
        </div>
        <div>
          <ArrowRight size={13} /> Actions
        </div>
        <div>
          <ToolIcon small />
          Your agent
        </div>
      </div>
      <span className="framework-spark spark-one">✦</span>
      <span className="framework-spark spark-two">✦</span>
    </div>
  );
}
