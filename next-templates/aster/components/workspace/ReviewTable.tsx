"use client";
import { Search, ArrowUpRight, Download } from "lucide-react";
import {
  type Review,
  type ReviewFilters,
  filterReviews,
  reviewCSV,
} from "@/data/reviews";
import { downloadText } from "@/lib/download";
import { Avatar } from "../ui/Primitives";
export function ReviewTable({
  rows,
  filters,
  onFilter,
  onOpen,
  board = false,
}: {
  rows: Review[];
  filters: ReviewFilters;
  onFilter: (value: ReviewFilters) => void;
  onOpen: (id: string) => void;
  board?: boolean;
}) {
  const visible = filterReviews(rows, filters);
  return (
    <section className="review-table">
      <div className="workspace-toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search reviews"
            placeholder="Search projects or feedback"
            value={filters.query || ""}
            onChange={(e) => onFilter({ ...filters, query: e.target.value })}
          />
        </label>
        <button
          className="button button-light"
          onClick={() =>
            downloadText("aster-reviews.csv", reviewCSV(visible), "text/csv")
          }
        >
          Export results
          <Download size={15} />
        </button>
      </div>
      <div className="review-filters">
        <label>
          Status
          <select
            value={filters.status || "all"}
            onChange={(e) =>
              onFilter({
                ...filters,
                status: e.target.value as ReviewFilters["status"],
              })
            }
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending review</option>
            <option value="changes">Changes requested</option>
            <option value="approved">Approved</option>
          </select>
        </label>
        <label>
          Format
          <select
            value={filters.format || "all"}
            onChange={(e) => onFilter({ ...filters, format: e.target.value })}
          >
            <option value="all">All formats</option>
            <option>Digital</option>
            <option>Print</option>
          </select>
        </label>
        <label>
          Discipline
          <select
            value={filters.discipline || "all"}
            onChange={(e) => onFilter({ ...filters, discipline: e.target.value })}
          >
            <option value="all">All disciplines</option>
            <option>Identity</option>
            <option>Web</option>
            <option>Campaign</option>
            <option>Editorial</option>
          </select>
        </label>
        <p aria-live="polite">
          {visible.length} of {rows.length} reviews
        </p>
        <button className="text-button" onClick={() => onFilter({})}>
          Clear filters
        </button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Project review</th>
              <th>{board ? "Priority" : "Format"}</th>
              <th>Discipline</th>
              <th>Status</th>
              <th>Owner</th>
              <th>
                <span className="sr-only">Open review</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t.id}>
                <td>
                  <button className="review-link" onClick={() => onOpen(t.id)}>
                    <Avatar initials={t.initials} />
                    <span>
                      <strong>{t.subject}</strong>
                      <small>
                        {t.project} · v{t.version} · {t.reviewer}
                      </small>
                    </span>
                  </button>
                </td>
                <td>
                  {board ? (
                    <span
                      className={t.priority === "High" ? "priority-high" : ""}
                    >
                      {t.priority}
                    </span>
                  ) : (
                    t.format
                  )}
                </td>
                <td>{t.discipline}</td>
                <td>
                  <span className={`status status-${t.status}`}>
                    {t.status === "changes" ? "Changes requested" : t.status}
                  </span>
                </td>
                <td>{t.owner}</td>
                <td>
                  <button
                    className="icon-button"
                    aria-label={`Open ${t.id}`}
                    onClick={() => onOpen(t.id)}
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h3>No reviews match this view.</h3>
          <p>Try another query or clear the filters.</p>
          <button className="button button-light" onClick={() => onFilter({})}>
            Show all reviews
          </button>
        </div>
      )}
    </section>
  );
}
