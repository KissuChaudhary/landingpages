"use client";
import { Download } from "lucide-react";
import {
  type Review,
  type ReviewEvent,
  reviewMetrics,
  reviewCSV,
} from "@/data/reviews";
import { downloadText } from "@/lib/download";
export function Reporting({
  rows,
  events,
}: {
  rows: Review[];
  events: ReviewEvent[];
}) {
  const m = reviewMetrics(rows);
  return (
    <section className="reporting-workspace">
      <div className="reporting-summary">
        {[
          ["Creative projects", m.projects],
          ["Reviews approved", `${m.rate}%`],
          ["Median review age", `${m.median} hr`],
          ["Awaiting a decision", m.pending],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="reporting-columns">
        <div className="reporting-panel">
          <h3>The current review board</h3>
          <p>Counts from the {rows.length} example reviews.</p>
          {[
            ["Approved", m.approved, "approved"],
            ["Pending", m.pending, "pending"],
            ["Changes requested", m.changes, "changes"],
          ].map(([label, value, status]) => (
            <div className="reporting-bar" key={label}>
              <span>{label}</span>
              <div>
                <i
                  className={`bar-${status}`}
                  style={{
                    width: `${(Number(value) / Math.max(m.total, 1)) * 100}%`,
                  }}
                />
              </div>
              <strong>{value}</strong>
            </div>
          ))}
          <p className="small-note">
            Review ages belong to the fictional dataset and are measured in hours. Local decisions update the counts and approval share.
          </p>
          <button
            className="button button-light"
            onClick={() =>
              downloadText("aster-report.csv", reviewCSV(rows), "text/csv")
            }
          >
            Export review report
            <Download size={15} />
          </button>
        </div>
        <div className="reporting-panel">
          <h3>Local review history</h3>
          <p>Changes made during this visit.</p>
          {events.length ? (
            <ol className="activity-list">
              {[...events].reverse().map((e, i) => (
                <li key={`${e.reviewId}-${i}`}>
                  <span>
                    {e.reviewId} ·{" "}
                    {e.action === "changes" ? "Changes requested" : "Approved"}
                  </span>
                  <p>{e.detail}</p>
                  <time>{e.time}</time>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-history">
              <p>Your review history begins with the first review change.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
