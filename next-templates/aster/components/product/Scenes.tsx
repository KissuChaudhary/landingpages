import { Check, BookOpen, ArrowUpRight, UserRound, Clock3 } from "lucide-react";
import { reviews, reviewMetrics } from "@/data/reviews";
import { briefs, findBrief } from "@/data/briefs";
import { site } from "@/site.config";
import { AsterMark } from "../ui/Brand";
import { Avatar } from "../ui/Primitives";
export function Scene({ type }: { type: string }) {
  const metrics = reviewMetrics(reviews);
  if (type === "briefs" || type === "editorial") return (
    <div className="scene-card briefs-scene">
      <header><BookOpen size={17} /><span>Project briefs</span></header>
      {(type === "editorial" ? [briefs[3], briefs[0]] : briefs.slice(0, 2)).map((brief) => (
        <div className="briefs-row" key={brief.id}>
          <div><strong>{brief.title}</strong><small>{brief.category}</small></div>
          <span><Check size={12} />Agreed</span>
        </div>
      ))}
      <p className="scene-note">The direction, before the next decision.</p>
    </div>
  );
  if (type === "revision" || type === "campaign") {
    const review = type === "campaign" ? reviews[5] : reviews[1];
    return (
      <div className="scene-card changes-scene">
        <div className="scene-person"><Avatar initials={review.initials} /><span>{review.reviewer}<small>{review.project} · v{review.version}</small></span></div>
        <p>“{review.message}”</p>
        <div className="changes-owner">
          <Avatar initials={type === "campaign" ? "MT" : "OR"} portrait={type === "campaign" ? "mei" : "owen"} name={`${review.owner}, fictional studio member`} />
          <span>{review.owner}<small>Owns the next version</small></span><ArrowUpRight size={17} />
        </div>
        <div className="scene-note"><UserRound size={12} />A clear change. A named owner.</div>
      </div>
    );
  }
  if (type === "performance" || type === "reporting") return (
    <div className="scene-card performance-scene">
      <header><span>Studio overview</span><span className="muted">Local example</span></header>
      <div className="scene-metrics">
        <div><span>Reviews approved</span><strong>{metrics.rate}%</strong></div>
        <div><span>Creative projects</span><strong>{metrics.projects}</strong></div>
      </div>
      <div className="scene-chart" aria-label="Current review counts by decision">
        {[["Approved", metrics.approved], ["Pending", metrics.pending], ["Changes", metrics.changes]].map(([label, value]) => (
          <div key={label as string}><i style={{ height: `${25 + ((value as number) / metrics.total) * 95}px` }} /><span>{label}</span><b>{value}</b></div>
        ))}
      </div>
    </div>
  );
  if (type === "response" || type === "web") {
    const review = type === "web" ? reviews[4] : reviews[3];
    return (
      <div className="scene-card voice-scene">
        <header><AsterMark size={24} /><span>{site.brand}<small>{review.project} · Studio response</small></span></header>
        <p>{review.draft}</p>
        <div className="voice-source"><BookOpen size={13} />{findBrief(review.briefId)?.title}<Check size={13} /></div>
        <div className="voice-toolbar"><span>The next version, in your words.</span><i>Review response<ArrowUpRight size={12} /></i></div>
      </div>
    );
  }
  if (type === "queue") return (
    <div className="scene-card queue-scene">
      <header><Clock3 size={16} />The review board</header>
      <div className="scene-metrics">
        <div><span>Another pass</span><strong>{metrics.changes}</strong></div>
        <div><span>Reviews approved</span><strong>{metrics.approved}</strong></div>
      </div>
      <div className="queue-summary"><i><Check size={15} /></i><p>Every round has a next step.<span>{metrics.pending} reviews await a decision.</span></p></div>
      <div className="queue-days">{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => <span className={i === 4 ? "selected" : ""} key={i}>{day}</span>)}</div>
    </div>
  );
  const review = reviews[0];
  return (
    <div className="scene-card answer-scene">
      <div className="scene-person"><Avatar initials={review.initials} /><span>{review.reviewer}<small>{review.project} · v{review.version}</small></span></div>
      <p>“{review.message}”</p>
      <div className="answer-draft"><AsterMark size={24} /><p>{review.draft}</p></div>
      <div className="answer-source"><BookOpen size={12} />Willow · identity brief<Check size={12} /></div>
    </div>
  );
}
