"use client";
import { useState } from "react";
import {
  Inbox,
  Tags,
  BookOpen,
  BarChart3,
  Search,
  ChevronDown,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { site, appHref } from "@/site.config";
import { tickets } from "@/data/tickets";
import { findKnowledge } from "@/data/knowledge";
import { href } from "@/lib/urls";
import { AsterMark } from "../ui/Brand";
import { Avatar } from "../ui/Primitives";
export function InboxPreview({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(tickets[0].id);
  const ticket = tickets.find((t) => t.id === selected) || tickets[0];
  return (
    <div className={`inbox-preview ${compact ? "inbox-compact" : ""}`}>
      <aside className="preview-sidebar">
        <div className="preview-brand">
          <AsterMark size={19} />
          {site.brand}
        </div>
        {[
          [Inbox, "Inbox"],
          [Tags, "Triage"],
          [BookOpen, "Knowledge"],
          [BarChart3, "Reports"],
        ].map(([Icon, text], i) => {
          const Symbol = Icon as typeof Inbox;
          return (
            <div className={i === 0 ? "active" : ""} key={text as string}>
              <Symbol size={14} />
              {text as string}
              {i === 0 && <span>{tickets.length}</span>}
            </div>
          );
        })}
        <div className="preview-person">
          <Avatar initials="NS" />
          Nina Shah
        </div>
      </aside>
      <div className="preview-list">
        <div className="preview-list-title">
          Inbox
          <ChevronDown size={13} />
        </div>
        <div className="preview-search">
          <Search size={13} />
          Your conversations
        </div>
        {tickets.slice(0, 5).map((t) => (
          <button
            key={t.id}
            className={selected === t.id ? "selected" : ""}
            onClick={() => setSelected(t.id)}
            aria-pressed={selected === t.id}
          >
            <Avatar initials={t.initials} />
            <span>
              <strong>{t.customer}</strong>
              <small>{t.subject}</small>
            </span>
            <i className={`ticket-dot ${t.status}`} aria-label={t.status} />
          </button>
        ))}
      </div>
      <div className="preview-conversation">
        <header>
          <Avatar initials={ticket.initials} />
          <span>
            <strong>{ticket.customer}</strong>
            <small>{ticket.id}</small>
          </span>
          <span className="preview-state">
            {ticket.status === "resolved" ? (
              <>
                <Check size={12} />
                Resolved
              </>
            ) : ticket.status === "handoff" ? (
              "With the team"
            ) : (
              "For review"
            )}
          </span>
        </header>
        <div className="preview-message">
          <Avatar initials={ticket.initials} />
          <div>
            <strong>{ticket.customer}</strong>
            <p>{ticket.message}</p>
          </div>
        </div>
        <div className="preview-message aster-reply">
          <AsterMark size={26} />
          <div>
            <strong>
              {site.brand}
              <span>Suggested answer</span>
            </strong>
            <p>{ticket.draft}</p>
          </div>
        </div>
        <div className="preview-source">
          <BookOpen size={13} />
          {findKnowledge(ticket.source)?.title}
        </div>
        <a className="preview-open" href={href(appHref())}>
          Explore the inbox
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
