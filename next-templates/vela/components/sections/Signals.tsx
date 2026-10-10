import { ArrowUpRight, Check, MoreHorizontal } from "lucide-react";
import { site } from "@/site.config";
import { accounts, followups } from "@/data/preview";
import { SectionHead, Reveal, Avatar } from "@/components/ui/Primitives";
import { NumberRoll } from "@/components/ui/NumberRoll";
function SignalVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="signal-health">
        <div className="small-ui-title">
          <span>Relationships in focus</span>
          <MoreHorizontal size={14} />
        </div>
        <div className="health-meter">
          <svg viewBox="0 0 160 94" fill="none" aria-hidden="true">
            <path
              d="M15 82a65 65 0 0 1 130 0"
              stroke="#eee8e4"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M15 82a65 65 0 0 1 130 0"
              stroke="#748778"
              strokeWidth="13"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="67 100"
            />
          </svg>
          <strong>
            <NumberRoll
              value={Math.round(
                (accounts.filter((a) => a.health === "Healthy").length /
                  accounts.length) *
                  100,
              )}
              suffix="%"
              countIn
            />
          </strong>
          <small>healthy relationships</small>
        </div>
        <div className="signal-health-bottom">
          <span>
            <i className="status-dot" />
            {accounts.filter((a) => a.health === "Healthy").length} healthy
          </span>
          <span>1 to check in</span>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="signal-followups">
        <div className="small-ui-title">
          <span>Your day, a little clearer</span>
          <span className="tiny-count">{followups.length}</span>
        </div>
        {followups.map((task) => (
          <div className="signal-task" key={task.title}>
            <span className={`task-check ${task.done ? "checked" : ""}`}>
              {task.done && <Check size={12} />}
            </span>
            <div>
              <b>{task.title}</b>
              <small>
                {task.account} · {task.date}
              </small>
            </div>
          </div>
        ))}
        <span className="signal-task-note">
          A next step for every conversation.
        </span>
      </div>
    );
  return (
    <div className="signal-revenue">
      <div className="small-ui-title">
        <span>Renewal value in focus</span>
        <ArrowUpRight size={14} />
      </div>
      <strong>
        <NumberRoll value={54000} prefix="$" countIn />
      </strong>
      <small>Three conversations worth having</small>
      <div className="signal-sparkline">
        <svg viewBox="0 0 260 80" fill="none" aria-hidden="true">
          <path
            d="M0 74 36 62 66 66 95 40 130 49 160 22 198 29 224 12 260 4V80H0Z"
            fill="url(#signal-fill)"
          />
          <path
            d="M0 74 36 62 66 66 95 40 130 49 160 22 198 29 224 12 260 4"
            stroke="#ed6449"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="signal-fill"
              x1="130"
              y1="0"
              x2="130"
              y2="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fbcbbb" stopOpacity=".7" />
              <stop offset="1" stopColor="#fbcbbb" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="signal-revenue-bottom">
        <span>
          <Avatar initials="L" />
          <Avatar initials="Q" tone="peach" />
          <Avatar initials="C" tone="lilac" />
        </span>
        <span>July → September</span>
      </div>
    </div>
  );
}
export function Signals() {
  return (
    <section className="signals section frame" id="signals">
      <SectionHead {...site.signals} />
      <div className="signal-grid">
        {site.signals.items.map((item, index) => (
          <Reveal className="signal-card" delay={index * 90} key={item.title}>
            <div className="signal-visual">
              <SignalVisual index={index} />
            </div>
            <div className="signal-copy">
              <span className="eyebrow">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
