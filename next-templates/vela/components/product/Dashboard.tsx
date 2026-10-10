"use client";
import { useState } from "react";
import { ChevronDown, LayoutGrid, Users, ArrowUpRight } from "lucide-react";
import { revenue, followups } from "@/data/preview";
import { RevenueChart } from "@/components/product/RevenueChart";
import { AccountScene } from "@/components/product/AccountScene";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
import { Avatar } from "@/components/ui/Primitives";
import { BrandMark } from "@/components/ui/Brand";
export function Dashboard() {
  const [period, setPeriod] = useState<keyof typeof revenue>("half");
  const [view, setView] = useState("revenue");
  const data = revenue[period];
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="workspace-name">
          <BrandMark />
          <span>Layers workspace</span>
          <ChevronDown size={12} />
        </div>
        <span className="example-label">
          <i />
          Example workspace
        </span>
        <Avatar initials="MC" />
      </div>
      <div className="dashboard-body">
        <div className="dashboard-main">
          <div className="dashboard-toolbar">
            <div
              className="dashboard-tabs"
              role="group"
              aria-label="Workspace view"
            >
              <button
                type="button"
                aria-pressed={view === "revenue"}
                onClick={() => setView("revenue")}
              >
                <LayoutGrid size={13} />
                Overview
              </button>
              <button
                type="button"
                aria-pressed={view === "accounts"}
                onClick={() => setView("accounts")}
              >
                <Users size={13} />
                Accounts
              </button>
            </div>
            <label className="period-select">
              <select
                aria-label="Revenue period"
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value as keyof typeof revenue)
                }
              >
                <option value="half">Last 6 months</option>
                <option value="quarter">Last quarter</option>
              </select>
              <ChevronDown size={12} />
            </label>
          </div>
          {view === "revenue" ? (
            <div className="dashboard-revenue" key="revenue">
              <div className="revenue-total">
                <div>
                  <small>Relationship revenue</small>
                  <strong>
                    <NumberRoll
                      value={data.values.reduce((sum, value) => sum + value, 0)}
                      prefix="$"
                      countIn
                    />
                  </strong>
                </div>
                <div className="revenue-change">
                  <span>
                    <ArrowUpRight size={13} />
                    <NumberRoll value={data.change} decimals={1} suffix="%" />
                  </span>
                  <small>vs. previous period</small>
                </div>
              </div>
              <RevenueChart
                key={period}
                months={data.months}
                values={data.values}
              />
            </div>
          ) : (
            <div className="dashboard-accounts" key="accounts">
              <AccountScene />
            </div>
          )}
        </div>
        <aside className="dashboard-aside">
          <div className="aside-title">
            <span>What’s next</span>
            <span className="tiny-count">{followups.length}</span>
          </div>
          {followups.map((task) => (
            <div className="aside-task" key={task.title}>
              <span className={`aside-task-dot ${task.done ? "done" : ""}`} />
              <div>
                <b>{task.title}</b>
                <small>
                  {task.account} <span>· {task.date}</span>
                </small>
              </div>
            </div>
          ))}
          <div className="upcoming-renewals">
            <span>
              <i className="status-dot" />
              On the horizon
            </span>
            <strong>
              <NumberRoll value={data.renewals} />
            </strong>
            <small>Upcoming renewals</small>
            <div className="mini-progress">
              <i />
            </div>
            <p>
              <NumberRoll value={data.expansion} prefix="$" /> in expansion
              opportunities
            </p>
          </div>
        </aside>
      </div>
      <div className="dashboard-bottom">
        <span>
          <i className="status-dot" />A little clarity goes a long way.
        </span>
        <span>
          <TextMorph>{`${data.months[0]}–${data.months[data.months.length - 1]} · Illustrative data`}</TextMorph>
        </span>
      </div>
    </div>
  );
}
