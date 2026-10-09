"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  Download,
  UserRound,
} from "lucide-react";
import { type Ticket } from "@/data/tickets";
import { findKnowledge } from "@/data/knowledge";
import { downloadText } from "@/lib/download";
import { Avatar } from "../ui/Primitives";
import { Modal } from "../ui/Modal";
export function Conversation({
  ticket,
  onBack,
  onUpdate,
}: {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (
    action: "resolved" | "handoff",
    draft: string,
    owner: string,
    reason: string,
  ) => void;
}) {
  const [draft, setDraft] = useState(ticket.draft);
  const [handoff, setHandoff] = useState(false);
  const [owner, setOwner] = useState(
    ticket.category === "Billing"
      ? "Billing team"
      : ticket.category === "Accounts"
        ? "Account team"
        : "Support team",
  );
  const [reason, setReason] = useState("");
  const source = findKnowledge(ticket.source);
  return (
    <section className="conversation-detail">
      <div className="conversation-top">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to tickets
        </button>
        <button
          className="text-button"
          onClick={() =>
            downloadText(
              `${ticket.id.toLowerCase()}.json`,
              JSON.stringify(
                { ...ticket, draft, sourceArticle: source },
                null,
                2,
              ),
              "application/json",
            )
          }
        >
          <Download size={16} />
          Export conversation
        </button>
      </div>
      <div className="conversation-heading">
        <div>
          <p className="eyebrow">
            {ticket.id} · {ticket.channel}
          </p>
          <h2>{ticket.subject}</h2>
        </div>
        <span className={`status status-${ticket.status}`}>
          {ticket.status === "handoff" ? "Handed off" : ticket.status}
        </span>
      </div>
      <div className="conversation-columns">
        <div className="conversation-thread">
          <div className="customer-question">
            <Avatar initials={ticket.initials} />
            <div>
              <strong>{ticket.customer}</strong>
              <p>{ticket.message}</p>
            </div>
          </div>
          <label className="draft-label" htmlFor="reply-draft">
            Suggested reply <span>Review and edit</span>
          </label>
          <textarea
            id="reply-draft"
            rows={7}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <p className="small-note">
            {ticket.needsHuman
              ? "This question requires a person. Review the draft and choose a team for the handoff."
              : "A local draft. Your edits are included in exports; no message is sent."}
          </p>
          <div className="conversation-actions">
            <button
              className="button"
              disabled={
                ticket.needsHuman ||
                ticket.status === "resolved" ||
                !draft.trim()
              }
              onClick={() =>
                onUpdate(
                  "resolved",
                  draft,
                  "Aster",
                  "Draft reviewed and marked resolved locally.",
                )
              }
            >
              <Check size={16} />
              {ticket.status === "resolved" ? "Resolved" : "Resolve locally"}
            </button>
            <button
              className="button button-light"
              onClick={() => setHandoff(true)}
            >
              <UserRound size={16} />
              Hand off
            </button>
          </div>
          <p className="conversation-owner">
            Current owner: <strong>{ticket.owner}</strong>
          </p>
        </div>
        <aside className="source-context">
          <p className="eyebrow">
            <BookOpen size={15} />
            Approved source
          </p>
          <h3>{source?.title}</h3>
          <p>{source?.summary}</p>
          <p className="source-date">Reviewed {source?.updated}</p>
          <details>
            <summary>
              Read the full article
              <ArrowUpRight size={14} />
            </summary>
            <p>{source?.body}</p>
          </details>
          <dl>
            <div>
              <dt>Category</dt>
              <dd>{ticket.category}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{ticket.priority}</dd>
            </div>
            <div>
              <dt>Human review</dt>
              <dd>{ticket.needsHuman ? "Required" : "Available"}</dd>
            </div>
          </dl>
        </aside>
      </div>
      {handoff && (
        <Modal
          title="Hand off the conversation"
          onClose={() => setHandoff(false)}
        >
          <p>
            Keep {ticket.customer.split(" ")[0]}’s question, source and edited
            draft together for the next person.
          </p>
          <form
            className="handoff-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!reason.trim()) return;
              onUpdate("handoff", draft, owner, reason.trim());
              setHandoff(false);
            }}
          >
            <label>
              Destination
              <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option>Support team</option>
                <option>Billing team</option>
                <option>Account team</option>
                <option>Product team</option>
              </select>
            </label>
            <label>
              Reason for the handoff
              <textarea
                required
                minLength={5}
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="What should the next teammate review?"
              />
            </label>
            <button className="button" type="submit">
              Confirm local handoff
              <ArrowUpRight size={15} />
            </button>
            <p className="small-note">
              Updates this example workspace. No teammate is notified.
            </p>
          </form>
        </Modal>
      )}
    </section>
  );
}
