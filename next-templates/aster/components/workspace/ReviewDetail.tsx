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
import { type Review } from "@/data/reviews";
import { findBrief } from "@/data/briefs";
import { downloadText } from "@/lib/download";
import { Avatar } from "../ui/Primitives";
import { Modal } from "../ui/Modal";
export function ReviewDetail({
  review,
  onBack,
  onUpdate,
}: {
  review: Review;
  onBack: () => void;
  onUpdate: (
    action: "approved" | "changes",
    draft: string,
    owner: string,
    reason: string,
  ) => void;
}) {
  const [draft, setDraft] = useState(review.draft);
  const [changes, setChanges] = useState(false);
  const [owner, setOwner] = useState(review.owner);
  const [reason, setReason] = useState(review.revisionReason || "");
  const source = findBrief(review.briefId);
  return (
    <section className="conversation-detail">
      <div className="conversation-top">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to reviews
        </button>
        <button
          className="text-button"
          onClick={() =>
            downloadText(
              `${review.id.toLowerCase()}.json`,
              JSON.stringify(
                { ...review, draft, projectBrief: source },
                null,
                2,
              ),
              "application/json",
            )
          }
        >
          <Download size={16} />
          Export review
        </button>
      </div>
      <div className="conversation-heading">
        <div>
          <p className="eyebrow">
            {review.project} · Version {review.version} · {review.id}
          </p>
          <h2>{review.subject}</h2>
        </div>
        <span className={`status status-${review.status}`}>
          {review.status === "changes" ? "Changes requested" : review.status}
        </span>
      </div>
      <div className="conversation-columns">
        <div className="conversation-thread">
          <div className="reviewer-question">
            <Avatar initials={review.initials} />
            <div>
              <strong>{review.reviewer}</strong>
              <p>{review.message}</p>
            </div>
          </div>
          <label className="draft-label" htmlFor="reply-draft">
            Studio response <span>Review and edit</span>
          </label>
          <textarea
            id="reply-draft"
            rows={7}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <p className="small-note">
            Your edits are included in exports. Decisions update this local board; no client is notified.
          </p>
          <div className="conversation-actions">
            <button
              className="button"
              disabled={
                review.status === "approved" ||
                !draft.trim()
              }
              onClick={() =>
                onUpdate(
                  "approved",
                  draft,
                  review.owner,
                  `Approval recorded for ${review.project}, version ${review.version}.`,
                )
              }
            >
              <Check size={16} />
              {review.status === "approved" ? "Approved" : "Approve review"}
            </button>
            <button
              className="button button-light"
              disabled={!draft.trim()}
              onClick={() => setChanges(true)}
            >
              <UserRound size={16} />
              Request changes
            </button>
          </div>
          <p className="conversation-owner">
            Current owner: <strong>{review.owner}</strong>
          </p>
          {review.revisionReason && (
            <p className="small-note">
              Revision request: {review.revisionReason}
            </p>
          )}
        </div>
        <aside className="source-context">
          <p className="eyebrow">
            <BookOpen size={15} />
            Project brief
          </p>
          <h3>{source?.title}</h3>
          <p>{source?.summary}</p>
          <p className="source-date">Agreed {source?.updated}</p>
          <details>
            <summary>
              Read the full brief
              <ArrowUpRight size={14} />
            </summary>
            <p>{source?.body}</p>
          </details>
          <dl>
            <div>
              <dt>Discipline</dt>
              <dd>{review.discipline}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{review.priority}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{review.format}</dd>
            </div>
          </dl>
        </aside>
      </div>
      {changes && (
        <Modal
          title="Give the next version a direction"
          onClose={() => setChanges(false)}
        >
          <p>
            Keep {review.reviewer.split(" ")[0]}’s feedback and your response with the project. Choose who makes the change and describe the next pass.
          </p>
          <form
            className="changes-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (reason.trim().length < 5 || !draft.trim()) return;
              onUpdate("changes", draft, owner, reason.trim());
              setChanges(false);
            }}
          >
            <label>
              Revision owner
              <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option>Nina Shah</option>
                <option>Owen Reed</option>
                <option>Mei Tan</option>
                <option>Ari James</option>
              </select>
            </label>
            <label>
              What needs to change?
              <textarea
                required
                minLength={5}
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the change for the next version."
              />
            </label>
            <button className="button" type="submit">
              Record revision request
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
