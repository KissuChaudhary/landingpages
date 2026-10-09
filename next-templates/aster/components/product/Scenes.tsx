import {
  Check,
  BookOpen,
  ArrowUpRight,
  Mail,
  MessageCircle,
  UserRound,
  Clock3,
} from "lucide-react";
import { tickets, ticketMetrics } from "@/data/tickets";
import { knowledge } from "@/data/knowledge";
import { site } from "@/site.config";
import { AsterMark } from "../ui/Brand";
import { Avatar } from "../ui/Primitives";
export function Scene({ type }: { type: string }) {
  const metrics = ticketMetrics(tickets);
  if (type === "knowledge")
    return (
      <div className="scene-card knowledge-scene">
        <header>
          <BookOpen size={17} />
          <span>Your knowledge</span>
        </header>
        {knowledge.slice(0, 2).map((article) => (
          <div className="knowledge-row" key={article.id}>
            <div>
              <strong>{article.title}</strong>
              <small>{article.category}</small>
            </div>
            <span>
              <Check size={12} />
              Ready
            </span>
          </div>
        ))}
        <p className="scene-note">Approved sources, in one place.</p>
      </div>
    );
  if (type === "handoff")
    return (
      <div className="scene-card handoff-scene">
        <div className="scene-person">
          <Avatar initials="JE" />
          <span>
            Jamie Ellis<small>Billing question</small>
          </span>
        </div>
        <p>
          “There are two charges for the same order. Could someone take a look?”
        </p>
        <div className="handoff-owner">
          <Avatar
            initials="NS"
            portrait="nina"
            name="Nina Shah, fictional team member"
          />
          <span>
            Billing team<small>Context ready for review</small>
          </span>
          <ArrowUpRight size={17} />
        </div>
        <div className="scene-note">
          <UserRound size={12} />A person, with the whole picture.
        </div>
      </div>
    );
  if (type === "performance" || type === "reporting")
    return (
      <div className="scene-card performance-scene">
        <header>
          <span>Support overview</span>
          <span className="muted">Local example</span>
        </header>
        <div className="scene-metrics">
          <div>
            <span>Resolution rate</span>
            <strong>{metrics.rate}%</strong>
          </div>
          <div>
            <span>Conversations</span>
            <strong>{metrics.total}</strong>
          </div>
        </div>
        <div
          className="scene-chart"
          aria-label="Current ticket counts by state"
        >
          {[
            ["Resolved", metrics.resolved],
            ["Waiting", metrics.open],
            ["Handoff", metrics.handoff],
          ].map(([label, value]) => (
            <div key={label as string}>
              <i
                style={{
                  height: `${25 + ((value as number) / metrics.total) * 95}px`,
                }}
              />
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
    );
  if (type === "voice")
    return (
      <div className="scene-card voice-scene">
        <header>
          <AsterMark size={24} />
          <span>
            {site.brand}
            <small>Suggested answer</small>
          </span>
        </header>
        <p>{tickets[3].draft}</p>
        <div className="voice-source">
          <BookOpen size={13} />
          {knowledge[3].title}
          <Check size={13} />
        </div>
        <div className="voice-toolbar">
          <span>Clear. Warm. In your words.</span>
          <i>
            Review draft
            <ArrowUpRight size={12} />
          </i>
        </div>
      </div>
    );
  if (type === "queue")
    return (
      <div className="scene-card queue-scene">
        <header>
          <Clock3 size={16} />A clearer start
        </header>
        <div className="scene-metrics">
          <div>
            <span>Ready for a person</span>
            <strong>{metrics.handoff}</strong>
          </div>
          <div>
            <span>Questions resolved</span>
            <strong>{metrics.resolved}</strong>
          </div>
        </div>
        <div className="queue-summary">
          <i>
            <Check size={15} />
          </i>
          <p>
            The routine has a rhythm.<span>Keep the next step in sight.</span>
          </p>
        </div>
        <div className="queue-days">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <span className={i === 4 ? "selected" : ""} key={i}>
              {day}
            </span>
          ))}
        </div>
      </div>
    );
  if (type === "triage")
    return (
      <div className="scene-card triage-scene">
        <header>
          <span>Ticket triage</span>
          <span className="muted">{tickets.length} conversations</span>
        </header>
        <div className="mini-table">
          <div className="mini-table-row mini-table-head">
            <span>Customer</span>
            <span>Question</span>
            <span>State</span>
          </div>
          {tickets.slice(0, 6).map((t) => (
            <div className="mini-table-row" key={t.id}>
              <span>
                <Avatar initials={t.initials} />
                {t.customer}
              </span>
              <span>{t.subject}</span>
              <span className={`status ${t.status}`}>
                {t.status === "open"
                  ? "For review"
                  : t.status === "handoff"
                    ? "With team"
                    : "Resolved"}
              </span>
            </div>
          ))}
        </div>
        <p className="scene-note">Category, priority and context together.</p>
      </div>
    );
  return (
    <div className="scene-card answer-scene">
      <div className="scene-person">
        <Avatar initials="RC" />
        <span>
          Robin Chen<small>Account question</small>
        </span>
      </div>
      <p>“How do I reset my password?”</p>
      <div className="answer-draft">
        <AsterMark size={24} />
        <p>
          Start with the recovery link on the sign-in page. Keep passwords and
          codes private.
        </p>
      </div>
      <div className="answer-source">
        <BookOpen size={12} />
        Account recovery
        <Check size={12} />
      </div>
    </div>
  );
}
