"use client";
import { useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { site } from "@/site.config";
import {
  campaignRows,
  totals,
  money,
  answerFor,
  type Period,
  type Channel,
} from "@/data/campaigns";
import { csvCell, downloadText } from "@/lib/download";
import { Chart } from "./Chart";
export function reportCSV(period: Period, channel: Channel = "All channels") {
  return [
    "Campaign,Channel,Spend USD,Revenue USD,Conversions,Return on spend",
    ...campaignRows(period, channel).map((c) =>
      [
        c.name,
        c.channel,
        c.spend,
        c.revenue,
        c.conversions,
        (c.revenue / c.spend).toFixed(2),
      ]
        .map(csvCell)
        .join(","),
    ),
  ].join("\n");
}
export function exportReport(
  period: Period,
  channel: Channel = "All channels",
) {
  downloadText(
    `${site.brand.toLowerCase()}-${period}-report.csv`,
    reportCSV(period, channel),
    "text/csv;charset=utf-8",
  );
}
export function Report({ question: initialQuestion }: { question: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [submitted, setSubmitted] = useState(initialQuestion);
  const [period, setPeriod] = useState<Period>("month");
  const total = totals(period);
  return (
    <div className="report-view">
      <p className="eyebrow">Example workspace · September 2026</p>
      <h2>Your marketing, in focus.</h2>
      <form
        className="report-question"
        onSubmit={(e) => {
          e.preventDefault();
          if (question.trim()) setSubmitted(question.trim());
        }}
      >
        <label className="sr-only" htmlFor="report-question">
          Question about the example campaigns
        </label>
        <input
          id="report-question"
          maxLength={300}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button className="icon-button dark" aria-label="Update report">
          <ArrowRight size={18} />
        </button>
      </form>
      <div className="report-controls">
        <span>Review the sample campaign data</span>
        <select
          aria-label="Report period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
        >
          <option value="month">September</option>
          <option value="quarter">Last quarter</option>
        </select>
      </div>
      <div className="metrics-grid">
        <div>
          <span>Attributed revenue</span>
          <strong>{money(total.revenue)}</strong>
        </div>
        <div>
          <span>Campaign spend</span>
          <strong>{money(total.spend)}</strong>
        </div>
        <div>
          <span>Return on spend</span>
          <strong>{total.roas.toFixed(1)}×</strong>
        </div>
      </div>
      <p className="report-answer" aria-live="polite">
        {answerFor(submitted, period)}
      </p>
      <Chart period={period} />
      <div className="table-scroll">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Revenue</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {campaignRows(period).map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.channel}</td>
                <td>{money(c.revenue)}</td>
                <td>{(c.revenue / c.spend).toFixed(1)}×</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="report-footer">
        <span>A local example. No live accounts are connected.</span>
        <button
          className="button button-dark"
          onClick={() => exportReport(period)}
        >
          <Download size={16} />
          Download CSV
        </button>
      </div>
    </div>
  );
}
