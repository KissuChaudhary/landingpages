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
import { reviews } from "@/data/reviews";
import { findBrief } from "@/data/briefs";
import { href } from "@/lib/urls";
import { AsterMark } from "../ui/Brand";
import { Avatar } from "../ui/Primitives";
export function InboxPreview({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(reviews[0].id);
  const review = reviews.find((t) => t.id === selected) || reviews[0];
  return (
    <div className={`inbox-preview ${compact ? "inbox-compact" : ""}`}>
      <aside className="preview-sidebar">
        <div className="preview-brand">
          <AsterMark size={19} />
          {site.brand}
        </div>
        {[
          [Inbox, "Reviews"],
          [Tags, "Board"],
          [BookOpen, "Briefs"],
          [BarChart3, "Reports"],
        ].map(([Icon, text], i) => {
          const Symbol = Icon as typeof Inbox;
          return (
            <div className={i === 0 ? "active" : ""} key={text as string}>
              <Symbol size={14} />
              {text as string}
              {i === 0 && <span>{reviews.length}</span>}
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
          Reviews
          <ChevronDown size={13} />
        </div>
        <div className="preview-search">
          <Search size={13} />
          Client feedback
        </div>
        {reviews.slice(0, 5).map((t) => (
          <button
            key={t.id}
            className={selected === t.id ? "selected" : ""}
            onClick={() => setSelected(t.id)}
            aria-pressed={selected === t.id}
          >
            <Avatar initials={t.initials} />
            <span>
              <strong>{t.reviewer}</strong>
              <small>{t.subject}</small>
            </span>
            <i className={`review-dot ${t.status}`} aria-label={t.status} />
          </button>
        ))}
      </div>
      <div className="preview-conversation">
        <header>
          <Avatar initials={review.initials} />
          <span>
            <strong>{review.reviewer}</strong>
            <small>{review.project} · v{review.version}</small>
          </span>
          <span className="preview-state">
            {review.status === "approved" ? (
              <>
                <Check size={12} />
                Approved
              </>
            ) : review.status === "changes" ? (
              "Changes requested"
            ) : (
              "For review"
            )}
          </span>
        </header>
        <div className="preview-message">
          <Avatar initials={review.initials} />
          <div>
            <strong>{review.reviewer}</strong>
            <p>{review.message}</p>
          </div>
        </div>
        <div className="preview-message aster-reply">
          <AsterMark size={26} />
          <div>
            <strong>
              {site.brand}
              <span>Studio response</span>
            </strong>
            <p>{review.draft}</p>
          </div>
        </div>
        <div className="preview-source">
          <BookOpen size={13} />
          {findBrief(review.briefId)?.title}
        </div>
        <a className="preview-open" href={href(appHref())}>
          Explore the reviews
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
