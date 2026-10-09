"use client";
import { useId, useState } from "react";
import {
  Download,
  LayoutDashboard,
  Megaphone,
  Sparkles,
  GitBranch,
  Files,
  ChevronDown,
} from "lucide-react";
import {
  campaigns,
  campaignRows,
  totals,
  money,
  channels,
  type Channel,
  type Period,
} from "@/data/campaigns";
import { site } from "@/site.config";
import { workspaceIdentity } from "@/data/teams";
import { BrandMark } from "../ui/Brand";
import { Chart } from "./Chart";
import { exportReport } from "./Report";
export function Dashboard({
  interactive = true,
  compact = false,
}: {
  interactive?: boolean;
  compact?: boolean;
}) {
  const [period, setPeriod] = useState<Period>("month");
  const [channel, setChannel] = useState<Channel>("All channels");
  const id = useId();
  const total = totals(period, channel);
  const rows = campaignRows(period, channel);
  return (
    <div className={`dashboard ${compact ? "dashboard-compact" : ""}`}>
      <aside className="dash-sidebar">
        <span className="dash-brand">
          <BrandMark />
          {site.brand}
          <ChevronDown size={13} />
        </span>
        <span className="dash-workspace">
          {workspaceIdentity.team} / Workspace
        </span>
        <div className="dash-menu">
          {[
            [LayoutDashboard, "Overview"],
            [Megaphone, "Campaigns"],
            [Sparkles, "Insights"],
            [GitBranch, "Workflows"],
            [Files, "Reports"],
          ].map(([Icon, label], i) => {
            const Symbol = Icon as typeof LayoutDashboard;
            return (
              <span className={i === 0 ? "current" : ""} key={String(label)}>
                <Symbol size={15} />
                {String(label)}
              </span>
            );
          })}
        </div>
        <div className="dash-member">
          <span>{workspaceIdentity.initials}</span>
          <p>
            {workspaceIdentity.person}
            <small>Example workspace</small>
          </p>
        </div>
      </aside>
      <div className="dash-main">
        <div className="dash-toolbar">
          <div>
            <span className="dash-breadcrumb">Workspace / Overview</span>
            <h3>Good morning, {workspaceIdentity.firstName}.</h3>
          </div>
          <select
            aria-label="Dashboard period"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            disabled={!interactive}
          >
            <option value="month">September 2026</option>
            <option value="quarter">Last quarter</option>
          </select>
        </div>
        <div className="dash-metrics">
          <div>
            <span>Attributed revenue</span>
            <strong>{money(total.revenue)}</strong>
            <small>Campaign revenue</small>
          </div>
          <div>
            <span>Return on spend</span>
            <strong>{total.roas.toFixed(1)}×</strong>
            <small>Revenue ÷ spend</small>
          </div>
          <div>
            <span>Conversions</span>
            <strong>{total.conversions}</strong>
            <small>Across {rows.length} campaigns</small>
          </div>
          <div>
            <span>Campaign spend</span>
            <strong>{money(total.spend)}</strong>
            <small>
              {period === "quarter" ? "Last quarter" : "This month"}
            </small>
          </div>
        </div>
        <div className="dash-charts">
          <div className="dash-chart">
            <header>
              <h4>Conversion trend</h4>
              <span>Illustrative trend</span>
            </header>
            <Chart variant="bars" period={period} />
          </div>
          <div className="dash-chart channel-chart">
            <header>
              <h4>Spend by channel</h4>
              <span>{rows.length} campaigns</span>
            </header>
            <div className="channel-bars">
              {["Search", "Social", "Email"].map((name, i) => {
                const spend = rows
                  .filter((c) => c.channel === name)
                  .reduce((a, c) => a + c.spend, 0);
                return (
                  <div key={name}>
                    <span
                      style={{
                        height: `${Math.max(4, (spend / Math.max(total.spend, 1)) * 150)}%`,
                        background: ["#88abe3", "#acc7ee", "#d3e1f5"][i],
                      }}
                    />
                    <small>{name}</small>
                    <b>{money(spend)}</b>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="dash-table-header">
          <h4>Campaign performance</h4>
          <div>
            <label className="sr-only" htmlFor={id}>
              Campaign channel
            </label>
            <select
              id={id}
              value={channel}
              disabled={!interactive}
              onChange={(e) => setChannel(e.target.value as Channel)}
            >
              {channels.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button
              className="export-small"
              disabled={!interactive}
              onClick={() => exportReport(period, channel)}
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="table-scroll">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Channel</th>
                <th>Spend</th>
                <th>Revenue</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.name}>
                  <td>
                    <i
                      style={{
                        background:
                          c.channel === "Search"
                            ? "#88abe3"
                            : c.channel === "Social"
                              ? "#bfacd9"
                              : "#abc5a5",
                      }}
                    />
                    {c.name}
                  </td>
                  <td>{c.channel}</td>
                  <td>{money(c.spend)}</td>
                  <td>{money(c.revenue)}</td>
                  <td>{(c.revenue / c.spend).toFixed(1)}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="dash-data-note">
          Local sample data · {campaigns.length} campaigns · No connected
          accounts
        </p>
      </div>
    </div>
  );
}
