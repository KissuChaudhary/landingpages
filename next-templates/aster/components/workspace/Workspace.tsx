"use client";
import { useEffect, useState } from "react";
import {
  Inbox,
  ListFilter,
  BookOpen,
  ChartNoAxesCombined,
  RotateCcw,
} from "lucide-react";
import {
  tickets,
  type TicketFilters,
  type TicketEvent,
  updateTicket,
  ticketMetrics,
} from "@/data/tickets";
import { site } from "@/site.config";
import { TicketTable } from "./TicketTable";
import { Conversation } from "./Conversation";
import { Knowledge } from "./Knowledge";
import { Reporting } from "./Reporting";
import { Modal } from "../ui/Modal";
const views = [
  {
    id: "inbox",
    name: "Inbox",
    icon: Inbox,
    text: "Good support starts with the whole question.",
  },
  {
    id: "triage",
    name: "Ticket triage",
    icon: ListFilter,
    text: "A clearer view of what needs care.",
  },
  {
    id: "knowledge",
    name: "Knowledge",
    icon: BookOpen,
    text: "Keep the useful answers close.",
  },
  {
    id: "reporting",
    name: "Reporting",
    icon: ChartNoAxesCombined,
    text: "A useful picture of the support day.",
  },
];
export function Workspace() {
  const [view, setView] = useState("inbox");
  const [rows, setRows] = useState(tickets);
  const [filters, setFilters] = useState<TicketFilters>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [notice, setNotice] = useState("");
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    if (views.some((v) => v.id === requested)) setView(requested!);
  }, []);
  const current = views.find((v) => v.id === view)!;
  const ticket = rows.find((t) => t.id === selected);
  const metrics = ticketMetrics(rows);
  function changeView(id: string) {
    setView(id);
    setSelected(null);
    setNotice("");
    const url = new URL(window.location.href);
    url.searchParams.set("view", id);
    window.history.replaceState(null, "", url);
  }
  function update(
    action: "resolved" | "handoff",
    draft: string,
    owner: string,
    reason: string,
  ) {
    if (!ticket) return;
    setRows((value) =>
      updateTicket(value, ticket.id, action, draft, owner, reason),
    );
    setEvents((value) => [
      ...value,
      {
        action,
        ticketId: ticket.id,
        detail: reason,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNotice(
      `${ticket.id} ${action === "resolved" ? "marked resolved" : "handed off to " + owner} locally.`,
    );
  }
  return (
    <main id="main" className="workspace-page page-width">
      <div className="workspace-intro">
        <div>
          <p className="eyebrow">
            <i />
            {site.brand} workspace
          </p>
          <h1>
            A little clarity.
            <br />
            <span className="muted-line">A better next step.</span>
          </h1>
        </div>
        <p>
          A working local example. Review fictional tickets, edit a draft,
          choose a handoff and explore the knowledge behind an answer.
        </p>
      </div>
      <div className="workspace-frame">
        <aside className="workspace-sidebar">
          <p className="workspace-team">Your support space</p>
          <nav aria-label="Workspace views">
            {views.map((v) => (
              <button
                key={v.id}
                aria-current={view === v.id ? "page" : undefined}
                className={view === v.id ? "selected" : ""}
                onClick={() => changeView(v.id)}
              >
                <v.icon size={18} />
                {v.name}
                {v.id === "inbox" && <span>{metrics.open}</span>}
              </button>
            ))}
          </nav>
          <div className="workspace-local">
            <i />
            Local example<p>Edits reset on reload.</p>
          </div>
          <button className="text-button" onClick={() => setReset(true)}>
            <RotateCcw size={15} />
            Reset workspace
          </button>
        </aside>
        <div className="workspace-content">
          <header className="workspace-view-heading">
            <div>
              <h2>{current.name}</h2>
              <p>{current.text}</p>
            </div>
            <span className="workspace-count">
              {rows.length} example tickets
            </span>
          </header>
          <p
            role="status"
            className={`workspace-notice ${notice ? "visible" : ""}`}
          >
            {notice}
          </p>
          {(view === "inbox" || view === "triage") &&
            (ticket ? (
              <Conversation
                key={ticket.id}
                ticket={ticket}
                onBack={() => setSelected(null)}
                onUpdate={update}
              />
            ) : (
              <TicketTable
                rows={rows}
                filters={filters}
                onFilter={setFilters}
                onOpen={(id) => {
                  setSelected(id);
                  setNotice("");
                }}
                triage={view === "triage"}
              />
            ))}
          {view === "knowledge" && <Knowledge />}
          {view === "reporting" && <Reporting rows={rows} events={events} />}
        </div>
      </div>
      {reset && (
        <Modal title="Reset this workspace?" onClose={() => setReset(false)}>
          <p>
            Restore the original twelve example tickets and clear this visit’s
            review history.
          </p>
          <button
            className="button"
            onClick={() => {
              setRows(tickets);
              setEvents([]);
              setSelected(null);
              setFilters({});
              setNotice("The original example workspace has been restored.");
              setReset(false);
            }}
          >
            Restore the example
            <RotateCcw size={15} />
          </button>
        </Modal>
      )}
    </main>
  );
}
