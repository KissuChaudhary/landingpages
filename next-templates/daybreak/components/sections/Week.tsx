"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  CalendarClock,
  Check,
  Mail,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { site } from "@/site.config";
import { campaigns, money, totals } from "@/data/campaigns";
import { Frame, SectionHead } from "../ui/Primitives";

// The sun's path: a quadratic arc across a 1000 × 300 box, one stop per weekday.
const H = 300;
const STOPS = [0.1, 0.3, 0.5, 0.7, 0.9];
const P0 = { x: 40, y: 284 };
const P1 = { x: 500, y: -236 };
const P2 = { x: 960, y: 284 };
const point = (t: number) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});
const ARC = `M${P0.x} ${P0.y}Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`;
const returnOf = (c: { revenue: number; spend: number }) => c.revenue / c.spend;

function Brief() {
  const total = totals("month");
  const best = [...campaigns].sort((a, b) => returnOf(b) - returnOf(a))[0];
  return (
    <div className="morning-ui">
      <div className="ui-head">
        <span className="ui-icon">
          <Mail size={14} />
        </span>
        <div>
          <strong>Weekly brief · Forma</strong>
          <small>Sent to 4 people · Monday 8:00</small>
        </div>
      </div>
      <div className="brief-kpis">
        <div>
          <span>Revenue</span>
          <strong>{money(total.revenue)}</strong>
        </div>
        <div>
          <span>Return</span>
          <strong>{total.roas.toFixed(1)}×</strong>
        </div>
        <div>
          <span>Conversions</span>
          <strong>{total.conversions}</strong>
        </div>
      </div>
      <p className="ui-note">
        <Sparkles size={13} />
        <span>
          Worth a look: <b>{best.name}</b> returns {returnOf(best).toFixed(1)}×
          on {money(best.spend)}.
        </span>
      </p>
    </div>
  );
}

function Nudge() {
  const [state, setState] = useState<"open" | "approved" | "later">("open");
  const from = [...campaigns].sort((a, b) => returnOf(a) - returnOf(b))[0];
  const to = [...campaigns]
    .filter((c) => c.channel !== "Email")
    .sort((a, b) => returnOf(b) - returnOf(a))[0];
  return (
    <div className="morning-ui">
      <div className="ui-head">
        <span className="ui-icon">
          <ArrowRightLeft size={14} />
        </span>
        <div>
          <strong>Suggested budget move</strong>
          <small>
            {state === "open"
              ? "Waiting for you"
              : state === "approved"
                ? "Approved by you"
                : "Saved for Friday"}
          </small>
        </div>
      </div>
      <div className="nudge-flow">
        <div>
          <span>From</span>
          <strong>{from.name}</strong>
          <small>{returnOf(from).toFixed(1)}× return</small>
        </div>
        <span className="nudge-amount">
          $600
          <ArrowRight size={14} />
        </span>
        <div>
          <span>To</span>
          <strong>{to.name}</strong>
          <small>{returnOf(to).toFixed(1)}× return</small>
        </div>
      </div>
      <div className="nudge-actions" aria-live="polite">
        {state === "open" ? (
          <>
            <button className="ui-button ui-button-dark" onClick={() => setState("approved")}>
              Approve
            </button>
            <button className="ui-button" onClick={() => setState("later")}>
              Not now
            </button>
          </>
        ) : (
          <p className="nudge-done">
            <Check size={14} />
            {state === "approved"
              ? "In next week’s plan."
              : "Saved for Friday’s review."}
            <button className="text-link" onClick={() => setState("open")}>
              Undo
            </button>
          </p>
        )}
      </div>
      <small className="ui-foot">A local example. Nothing changes in your ad accounts.</small>
    </div>
  );
}

function Creative() {
  const versions = [
    { id: "A", line: "Good mornings deserve good coffee", rate: 3.1 },
    { id: "B", line: "Your mornings, a little brighter", rate: 4.6 },
  ];
  return (
    <div className="morning-ui">
      <div className="ui-head">
        <span className="ui-icon">
          <Sparkles size={14} />
        </span>
        <div>
          <strong>Subject line test</strong>
          <small>A familiar hello · 4,200 sends so far</small>
        </div>
      </div>
      <div className="creative-rows">
        {versions.map((v) => (
          <div key={v.id} className={v.rate > 4 ? "is-leading" : ""}>
            <span className="creative-id">{v.id}</span>
            <div>
              <p>“{v.line}”</p>
              <span className="creative-bar">
                <i style={{ width: `${(v.rate / 5) * 100}%` }} />
              </span>
            </div>
            <strong>{v.rate}%</strong>
          </div>
        ))}
      </div>
      <p className="ui-note">
        <Check size={13} />
        <span>Version B leads. The rest of the list gets it on Thursday.</span>
      </p>
    </div>
  );
}

function Slip() {
  const slipping = campaigns.find((c) => c.trend < 0) ?? campaigns[0];
  return (
    <div className="morning-ui">
      <div className="ui-head">
        <span className="ui-icon ui-icon-warm">
          <TrendingDown size={14} />
        </span>
        <div>
          <strong>{slipping.name}</strong>
          <small>{slipping.channel} · flagged Thursday 7:45</small>
        </div>
      </div>
      <div className="slip-figure">
        <strong>{String(slipping.trend).replace("-", "−")}%</strong>
        <span>conversions this week</span>
      </div>
      <svg className="slip-line" viewBox="0 0 300 70" aria-hidden="true">
        <path className="slip-area" d="M0 38 L50 30 L100 34 L150 24 L200 27 L245 42 L300 54 L300 70 L0 70Z" />
        <path d="M0 38 L50 30 L100 34 L150 24 L200 27 L245 42 L300 54" />
        <circle cx="300" cy="54" r="4" />
      </svg>
      <div className="slip-chips">
        <span>Return {returnOf(slipping).toFixed(1)}×</span>
        <span>Spend {money(slipping.spend)}</span>
        <span className="slip-action">Review the creative</span>
      </div>
    </div>
  );
}

function Schedule() {
  const [on, setOn] = useState(true);
  return (
    <div className="morning-ui">
      <div className="ui-head">
        <span className="ui-icon">
          <CalendarClock size={14} />
        </span>
        <div>
          <strong>Weekly brief</strong>
          <small>Every Monday · 8:00</small>
        </div>
      </div>
      <div className="schedule-people">
        <span className="people-stack" aria-hidden="true">
          {["MS", "LK", "NP"].map((p) => (
            <i key={p}>{p}</i>
          ))}
          <i>+1</i>
        </span>
        <span>Mara, Leo, Noa and one more</span>
      </div>
      <ul className="schedule-list">
        {["Revenue by channel", "The strongest campaign", "Suggested moves to review"].map((item) => (
          <li key={item}>
            <Check size={13} />
            {item}
          </li>
        ))}
      </ul>
      <div className="schedule-switch">
        <span>Send automatically</span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="Send the weekly brief automatically"
          className="ui-switch"
          onClick={() => setOn(!on)}
        >
          <span />
        </button>
      </div>
    </div>
  );
}

const SCENES = [Brief, Nudge, Creative, Slip, Schedule];

export function Week() {
  const [selected, setSelected] = useState(0);
  const [t, setT] = useState(STOPS[0]);
  const tRef = useRef(STOPS[0]);
  const id = useId();
  const days = site.week.days;
  const sun = point(t);

  // The sun travels along the arc to the chosen day rather than cutting across it.
  useEffect(() => {
    const target = STOPS[selected];
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    if (still) {
      tRef.current = target;
      setT(target);
      return;
    }
    const from = tRef.current;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 750);
      const eased = 1 - (1 - k) ** 3;
      tRef.current = from + (target - from) * eased;
      setT(tRef.current);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [selected]);
  const Scene = SCENES[selected];
  const onKey = (event: KeyboardEvent, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % days.length
        : event.key === "ArrowLeft"
          ? (index + days.length - 1) % days.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? days.length - 1
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`${id}-day-${next}`)?.focus();
  };
  return (
    <Frame id="week" className="week-section">
      <div className="section-inner">
        <SectionHead
          label={site.week.label}
          title={site.week.heading}
          text={site.week.text}
        />
        <div className="week-stage" data-reveal>
          <div className="sun-path">
            <svg viewBox={`0 0 1000 ${H}`} aria-hidden="true">
              <path className="sun-arc" d={ARC} />
              <path
                className="sun-arc-progress"
                d={ARC}
                pathLength={1}
                style={{ strokeDashoffset: 1 - t }}
              />
            </svg>
            <span
              className="sun"
              aria-hidden="true"
              style={{ left: `${sun.x / 10}%`, top: `${(sun.y / H) * 100}%` }}
            />
            <div role="tablist" aria-label="A week with Daybreak" className="sun-days">
              {days.map((d, i) => {
                const p = point(STOPS[i]);
                return (
                  <button
                    key={d.day}
                    id={`${id}-day-${i}`}
                    role="tab"
                    aria-selected={selected === i}
                    aria-controls={`${id}-panel`}
                    tabIndex={selected === i ? 0 : -1}
                    onClick={() => setSelected(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    style={{ left: `${p.x / 10}%`, top: `${(p.y / H) * 100}%` }}
                  >
                    <span className="sun-stop" aria-hidden="true" />
                    <span className="sun-label">
                      <span className="sun-label-long">{d.day}</span>
                      <span className="sun-label-short">{d.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="week-card"
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-day-${selected}`}
          >
            <div className="week-copy" key={`copy-${selected}`}>
              <p className="week-time">
                {days[selected].day} · {days[selected].time}
              </p>
              <h3>{days[selected].title}</h3>
              <p>{days[selected].text}</p>
            </div>
            <div className="week-scene" key={`scene-${selected}`}>
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
