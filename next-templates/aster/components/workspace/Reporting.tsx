"use client";
import { Download } from "lucide-react";
import {
  type Ticket,
  type TicketEvent,
  ticketMetrics,
  ticketCSV,
} from "@/data/tickets";
import { downloadText } from "@/lib/download";
export function Reporting({
  rows,
  events,
}: {
  rows: Ticket[];
  events: TicketEvent[];
}) {
  const m = ticketMetrics(rows);
  return (
    <section className="reporting-workspace">
      <div className="reporting-summary">
        {[
          ["Tickets reviewed", m.total],
          ["Resolved", `${m.rate}%`],
          ["Median response", `${m.median} min`],
          ["Customer rating", `${m.csat.toFixed(1)} / 5`],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="reporting-columns">
        <div className="reporting-panel">
          <h3>The current queue</h3>
          <p>Counts from the {rows.length} example tickets.</p>
          {[
            ["Resolved", m.resolved, "resolved"],
            ["Open", m.open, "open"],
            ["Handed off", m.handoff, "handoff"],
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
            Ratings include scored resolved tickets only. Response times belong
            to the fictional dataset; local edits update status counts.
          </p>
          <button
            className="button button-light"
            onClick={() =>
              downloadText("aster-report.csv", ticketCSV(rows), "text/csv")
            }
          >
            Export ticket report
            <Download size={15} />
          </button>
        </div>
        <div className="reporting-panel">
          <h3>Local review history</h3>
          <p>Changes made during this visit.</p>
          {events.length ? (
            <ol className="activity-list">
              {[...events].reverse().map((e, i) => (
                <li key={`${e.ticketId}-${i}`}>
                  <span>
                    {e.ticketId} ·{" "}
                    {e.action === "handoff" ? "Handed off" : "Resolved"}
                  </span>
                  <p>{e.detail}</p>
                  <time>{e.time}</time>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-history">
              <p>Your review history begins with the first ticket change.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
