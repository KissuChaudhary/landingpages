"use client";
import { asset, href } from "@/lib/urls";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Database,
  FileText,
  Sparkles,
  Search,
  Mail,
  Play,
} from "lucide-react";
import { site } from "@/site.config";
import {
  answerFor,
  campaignRows,
  totals,
  money,
  type Channel,
} from "@/data/campaigns";
import { workspaceIdentity } from "@/data/teams";
import { BrandMark } from "../ui/Brand";
import { exportReport } from "./Report";
export function InsightScene() {
  const [source, setSource] = useState("All channels");
  const channel: Channel = source.startsWith("Search")
    ? "Search"
    : source.startsWith("Social")
      ? "Social"
      : source.startsWith("Email")
        ? "Email"
        : "All channels";
  const summary = totals("month", channel);
  const response =
    channel === "All channels"
      ? answerFor(site.hero.prompt)
      : `${channel} generated ${money(summary.revenue)} from ${money(summary.spend)} in spend, a ${summary.roas.toFixed(1)}× return. Review the campaign context before deciding what to scale.`;
  return (
    <div className="insight-scene ui-scene">
      <header>
        <div>
          <h3>A little insight</h3>
          <p>The numbers, and what comes next.</p>
        </div>
        <span className="scene-avatar">{workspaceIdentity.initials}</span>
      </header>
      <div className="insight-body">
        <aside>
          <strong>Your context</strong>
          <small>Example data sources</small>
          {[
            [Search, "Search campaigns"],
            [Sparkles, "Social campaigns"],
            [Mail, "Email campaigns"],
          ].map(([Icon, title]) => {
            const Symbol = Icon as typeof Search;
            return (
              <button
                key={String(title)}
                className={source === title ? "source-active" : ""}
                onClick={() => setSource(String(title))}
              >
                <Symbol size={16} />
                <span>
                  {String(title)}
                  <small>September 2026</small>
                </span>
                <Check size={12} />
              </button>
            );
          })}
        </aside>
        <div className="insight-chat">
          <span className="conversation-label">Conversation</span>
          <p className="chat-question">{site.hero.prompt}</p>
          <div className="chat-response">
            <BrandMark />
            <p>{response}</p>
            <span>Source: sample campaign table</span>
          </div>
          <a className="scene-question" href={href("/#hero-question")}>
            Ask your own question
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
export function CampaignScene() {
  const [channel, setChannel] = useState("All");
  const rows = campaignRows("month").filter(
    (c) => channel === "All" || c.channel === channel,
  );
  return (
    <div className="campaign-scene ui-scene">
      <header>
        <div>
          <h3>The work in motion</h3>
          <p>Each campaign, with the context it deserves.</p>
        </div>
        <span className="scene-avatar">{workspaceIdentity.initials}</span>
      </header>
      <div className="mini-filters" role="group" aria-label="Campaign channels">
        {["All", "Search", "Social", "Email"].map((c) => (
          <button
            aria-pressed={channel === c}
            onClick={() => setChannel(c)}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="campaign-list">
        {rows.map((c) => (
          <div key={c.name}>
            <span
              className={`channel-dot channel-${c.channel.toLowerCase()}`}
            />
            <p>
              {c.name}
              <small>
                {c.channel} · {money(c.spend)} spend
              </small>
            </p>
            <strong>
              {(c.revenue / c.spend).toFixed(1)}×<small>return</small>
            </strong>
          </div>
        ))}
      </div>
      <p className="scene-footnote">
        Campaign values come from the same local dataset.
      </p>
    </div>
  );
}
export function WorkflowScene() {
  const [step, setStep] = useState(0);
  const labels = [
    "Gather the sources",
    "Find the useful signals",
    "Prepare the weekly report",
    "Ready for your review",
  ];
  useEffect(() => {
    if (step < 1 || step > 3) return;
    const t = setTimeout(() => setStep(step + 1), 650);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div className="workflow-scene ui-scene">
      <header>
        <div>
          <h3>Your Monday, made lighter</h3>
          <p>A useful routine, ready to repeat.</p>
        </div>
        <span className="workflow-frequency">Weekly report</span>
      </header>
      <div className="workflow-track">
        {labels.map((label, i) => (
          <div
            key={label}
            className={step > i ? "complete" : step === i ? "next" : ""}
          >
            <span>
              {step > i ? (
                <Check size={16} />
              ) : i === 0 ? (
                <Database size={16} />
              ) : i === 1 ? (
                <Sparkles size={16} />
              ) : (
                <FileText size={16} />
              )}
            </span>
            <p>
              {label}
              <small>
                {step > i
                  ? "Complete"
                  : i === 0
                    ? "5 example campaigns"
                    : i === 1
                      ? "Review channel returns"
                      : i === 2
                        ? "Compile a CSV snapshot"
                        : "A human decides what to share"}
              </small>
            </p>
            {step === i + 1 && step < 4 && <i className="running-dot" />}
          </div>
        ))}
      </div>
      <div className="workflow-controls">
        <span role="status">
          {step === 0
            ? "Run a local example"
            : step === 4
              ? "Report ready. Nothing has been sent."
              : "Preparing your example report…"}
        </span>
        {step === 4 ? (
          <button
            className="button button-dark"
            onClick={() => exportReport("month")}
          >
            Download report
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            className="button button-dark"
            onClick={() => setStep(1)}
            disabled={step > 0}
          >
            <Play size={14} />
            {step > 0 ? "Running…" : "Run workflow"}
          </button>
        )}
        {step === 4 && (
          <button className="text-button" onClick={() => setStep(0)}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
export function FeatureScene({ selected }: { selected: number }) {
  return selected === 0 ? (
    <InsightScene />
  ) : selected === 1 ? (
    <CampaignScene />
  ) : selected === 2 ? (
    <picture className="scene-dashboard">
      <source
        media="(max-width: 700px)"
        srcSet={asset("/images/dashboard-phone.webp")}
        width="1080"
        height="1452"
      />
      <img
        src={asset("/images/dashboard.webp")}
        alt="The Daybreak overview: the month’s revenue, return on spend, conversions and spend, with trends and campaigns."
        width="2540"
        height="1486"
        loading="lazy"
      />
    </picture>
  ) : (
    <WorkflowScene />
  );
}
