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
  reviews,
  type ReviewFilters,
  type ReviewEvent,
  updateReview,
  reviewMetrics,
} from "@/data/reviews";
import { site } from "@/site.config";
import { ReviewTable } from "./ReviewTable";
import { ReviewDetail } from "./ReviewDetail";
import { BriefLibrary } from "./BriefLibrary";
import { Reporting } from "./Reporting";
import { Modal } from "../ui/Modal";
const views = [
  {
    id: "reviews",
    name: "Reviews",
    icon: Inbox,
    text: "The feedback, the brief and the next decision.",
  },
  {
    id: "board",
    name: "Review board",
    icon: ListFilter,
    text: "A shared view of what needs another pass.",
  },
  {
    id: "briefs",
    name: "Project briefs",
    icon: BookOpen,
    text: "Keep the agreed direction beside the work.",
  },
  {
    id: "reporting",
    name: "Reporting",
    icon: ChartNoAxesCombined,
    text: "Decisions across the studio’s current projects.",
  },
];
export function Workspace() {
  const [view, setView] = useState("reviews");
  const [rows, setRows] = useState(reviews);
  const [filters, setFilters] = useState<ReviewFilters>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [events, setEvents] = useState<ReviewEvent[]>([]);
  const [notice, setNotice] = useState("");
  const [reset, setReset] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    if (views.some((v) => v.id === requested)) setView(requested!);
  }, []);
  const current = views.find((v) => v.id === view)!;
  const review = rows.find((t) => t.id === selected);
  const metrics = reviewMetrics(rows);
  function changeView(id: string) {
    setView(id);
    setSelected(null);
    setNotice("");
    const url = new URL(window.location.href);
    url.searchParams.set("view", id);
    window.history.replaceState(null, "", url);
  }
  function update(
    action: "approved" | "changes",
    draft: string,
    owner: string,
    reason: string,
  ) {
    if (!review || !draft.trim() || !owner.trim() || (action === "changes" && reason.trim().length < 5)) return;
    setRows((value) =>
      updateReview(value, review.id, action, draft, owner, reason),
    );
    setEvents((value) => [
      ...value,
      {
        action,
        reviewId: review.id,
        detail: reason,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNotice(
      `${review.id} ${action === "approved" ? "marked approved" : "changes requested · " + owner} locally.`,
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
            Your work, together.
            <br />
            <span className="muted-line">Your next decision.</span>
          </h1>
        </div>
        <p>
          Explore four fictional projects. Read the brief, edit a studio response and record an approval or revision request in this local workspace.
        </p>
      </div>
      <div className="workspace-frame">
        <aside className="workspace-sidebar">
          <p className="workspace-team">Your creative studio</p>
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
                {v.id === "reviews" && <span>{metrics.pending}</span>}
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
              {rows.length} example reviews
            </span>
          </header>
          <p
            role="status"
            className={`workspace-notice ${notice ? "visible" : ""}`}
          >
            {notice}
          </p>
          {(view === "reviews" || view === "board") &&
            (review ? (
              <ReviewDetail
                key={review.id}
                review={review}
                onBack={() => setSelected(null)}
                onUpdate={update}
              />
            ) : (
              <ReviewTable
                rows={rows}
                filters={filters}
                onFilter={setFilters}
                onOpen={(id) => {
                  setSelected(id);
                  setNotice("");
                }}
                board={view === "board"}
              />
            ))}
          {view === "briefs" && <BriefLibrary />}
          {view === "reporting" && <Reporting rows={rows} events={events} />}
        </div>
      </div>
      {reset && (
        <Modal title="Reset this workspace?" onClose={() => setReset(false)}>
          <p>
            Restore the original twelve example reviews and clear this visit’s
            review history.
          </p>
          <button
            className="button"
            onClick={() => {
              setRows(reviews);
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
