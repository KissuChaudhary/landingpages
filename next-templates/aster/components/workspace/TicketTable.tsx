"use client";
import { Search, ArrowUpRight, Download } from "lucide-react";
import {
  type Ticket,
  type TicketFilters,
  filterTickets,
  ticketCSV,
} from "@/data/tickets";
import { downloadText } from "@/lib/download";
import { Avatar } from "../ui/Primitives";
export function TicketTable({
  rows,
  filters,
  onFilter,
  onOpen,
  triage = false,
}: {
  rows: Ticket[];
  filters: TicketFilters;
  onFilter: (value: TicketFilters) => void;
  onOpen: (id: string) => void;
  triage?: boolean;
}) {
  const visible = filterTickets(rows, filters);
  return (
    <section className="ticket-table">
      <div className="workspace-toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search tickets"
            placeholder="Search tickets or customers"
            value={filters.query || ""}
            onChange={(e) => onFilter({ ...filters, query: e.target.value })}
          />
        </label>
        <button
          className="button button-light"
          onClick={() =>
            downloadText("aster-tickets.csv", ticketCSV(visible), "text/csv")
          }
        >
          Export results
          <Download size={15} />
        </button>
      </div>
      <div className="ticket-filters">
        <label>
          Status
          <select
            value={filters.status || "all"}
            onChange={(e) =>
              onFilter({
                ...filters,
                status: e.target.value as TicketFilters["status"],
              })
            }
          >
            <option value="all">All statuses</option>
            <option value="open">Open</option>
            <option value="handoff">Handed off</option>
            <option value="resolved">Resolved</option>
          </select>
        </label>
        <label>
          Channel
          <select
            value={filters.channel || "all"}
            onChange={(e) => onFilter({ ...filters, channel: e.target.value })}
          >
            <option value="all">All channels</option>
            <option>Chat</option>
            <option>Email</option>
          </select>
        </label>
        <label>
          Category
          <select
            value={filters.category || "all"}
            onChange={(e) => onFilter({ ...filters, category: e.target.value })}
          >
            <option value="all">All categories</option>
            <option>Orders</option>
            <option>Accounts</option>
            <option>Billing</option>
            <option>Product</option>
          </select>
        </label>
        <p aria-live="polite">
          {visible.length} of {rows.length} tickets
        </p>
        <button className="text-button" onClick={() => onFilter({})}>
          Clear filters
        </button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Conversation</th>
              <th>{triage ? "Priority" : "Channel"}</th>
              <th>Category</th>
              <th>Status</th>
              <th>Owner</th>
              <th>
                <span className="sr-only">Open ticket</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t.id}>
                <td>
                  <button className="ticket-link" onClick={() => onOpen(t.id)}>
                    <Avatar initials={t.initials} />
                    <span>
                      <strong>{t.subject}</strong>
                      <small>
                        {t.customer} · {t.id}
                      </small>
                    </span>
                  </button>
                </td>
                <td>
                  {triage ? (
                    <span
                      className={t.priority === "High" ? "priority-high" : ""}
                    >
                      {t.priority}
                    </span>
                  ) : (
                    t.channel
                  )}
                </td>
                <td>{t.category}</td>
                <td>
                  <span className={`status status-${t.status}`}>
                    {t.status === "handoff" ? "Handed off" : t.status}
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
          <h3>No tickets match this view.</h3>
          <p>Try another query or clear the filters.</p>
          <button className="button button-light" onClick={() => onFilter({})}>
            Show all tickets
          </button>
        </div>
      )}
    </section>
  );
}
