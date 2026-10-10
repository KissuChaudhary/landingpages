"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Flag } from "lucide-react";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
import { useSite } from "../SiteShell";

const keys: BlueprintKey[] = ["support", "leads", "review", "report"];
// One run, in milliseconds: type the intent, link the context, work the
// steps, deliver the action. The pulse leaves each port as its stage ends.
const T = {
  typed: 1400,
  leave: [1500, 3000, 5700],
  travel: 500,
  linkGap: 350,
  stepGap: 550,
  stream: 1200,
  rule: 7400,
  done: 7600,
  hold: 3600,
};
const arrive = (i: number) => (i === 0 ? 0 : T.leave[i - 1] + T.travel);
const columns = ["Intent", "Context", "Steps", "Action"];

export function RouteBoard() {
  const { motion } = useSite();
  const [active, setActive] = useState<BlueprintKey>("support");
  const [t, setT] = useState(0);
  const [runId, setRunId] = useState(0);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pulse, setPulse] = useState<{ x: number; y: number }[]>([]);
  const board = useRef<HTMLDivElement>(null);
  const ports = useRef<(HTMLSpanElement | null)[]>([]);
  const bp = blueprints[active];

  const run = useCallback((key: BlueprintKey) => {
    setActive(key);
    setRunId((n) => n + 1);
    setT(0);
  }, []);

  // Clock: one requestAnimationFrame loop per run, ~30 updates a second.
  useEffect(() => {
    if (!motion) {
      setT(T.done);
      return;
    }
    let frame = 0;
    let last = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (now - last > 33 || elapsed >= T.done) {
        last = now;
        setT(Math.min(T.done, elapsed));
      }
      if (elapsed < T.done) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [runId, motion]);

  // Next blueprint after a pause, unless someone chose one themselves.
  useEffect(() => {
    if (!motion || touched || !visible || t < T.done) return;
    const timer = setTimeout(
      () => run(keys[(keys.indexOf(active) + 1) % keys.length]),
      T.hold,
    );
    return () => clearTimeout(timer);
  }, [t, motion, touched, visible, active, run]);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Port centres, relative to the board body, for the travelling pulse.
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const measure = () =>
      setPulse(
        ports.current.map((p) => {
          const col = p?.parentElement;
          return p && col
            ? {
                x: col.offsetLeft + p.offsetLeft + p.offsetWidth / 2,
                y: col.offsetTop + p.offsetTop + p.offsetHeight / 2,
              }
            : { x: 0, y: 0 };
        }),
      );
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const show = (event: Event) => {
      const key = (event as CustomEvent<BlueprintKey>).detail;
      if (!(key in blueprints)) return;
      setTouched(true);
      run(key);
    };
    window.addEventListener("conduit:blueprint", show);
    return () => window.removeEventListener("conduit:blueprint", show);
  }, [run]);

  const stage = T.leave.filter((ms) => t >= ms).length;
  const typed = Math.round(Math.min(1, t / T.typed) * bp.prompt.length);
  const linked = t < arrive(1) ? 0 : Math.min(3, 1 + Math.floor((t - arrive(1)) / T.linkGap));
  const doneSteps = t < arrive(2) ? 0 : Math.min(4, Math.floor((t - arrive(2)) / T.stepGap));
  const working = t >= arrive(2) && doneSteps < 4 ? doneSteps : -1;
  const words = bp.result.split(" ");
  const shown = t < arrive(3) ? 0 : Math.ceil(Math.min(1, (t - arrive(3)) / T.stream) * words.length);
  const complete = t >= T.done;
  const at = pulse[stage];

  return (
    <div className="route" id="route" ref={board} aria-label="Example agent run">
      <div className="route-head">
        <span className="mono route-title">Blueprint</span>
        <div className="route-tabs" role="group" aria-label="Choose a blueprint">
          {keys.map((key) => (
            <button
              key={key}
              aria-pressed={key === active}
              onClick={() => {
                setTouched(true);
                run(key);
              }}
            >
              {blueprints[key].short}
            </button>
          ))}
        </div>
        <span className={`mono route-status ${complete ? "is-complete" : ""}`}>
          {complete ? <Check size={13} /> : <span className="status-dot" />}
          {complete ? "Complete" : "Running"}
          <span className="route-clock">0:0{Math.min(7, Math.floor(t / 1000))}</span>
        </span>
      </div>
      <div className="route-body" ref={body}>
        {at && (
          <span
            className="route-pulse"
            aria-hidden="true"
            style={{ transform: `translate(${at.x}px, ${at.y}px)` }}
          />
        )}
        {columns.map((name, i) => (
          <section
            key={name}
            className={`route-col col-${i} ${t >= arrive(i) ? "is-live" : ""}`}
          >
            <span
              className="route-port"
              aria-hidden="true"
              ref={(el) => {
                ports.current[i] = el;
              }}
            />
            <h3 className="mono route-col-title">
              <span>0{i + 1}</span>
              {name}
            </h3>
            {i === 0 && (
              <div className="route-intent">
                <p className="sr-only">{bp.prompt}</p>
                <p className="intent-text" aria-hidden="true">
                  {bp.prompt.slice(0, typed)}
                  {typed < bp.prompt.length && <span className="caret" />}
                </p>
                <span className="mono route-meta">From · {bp.source}</span>
              </div>
            )}
            {i === 1 && (
              <ul className="route-tools">
                {bp.tools.map((tool, n) => (
                  <li key={tool} className={n < linked ? "is-linked" : ""}>
                    <span className="tool-node" />
                    {tool}
                    <span className="mono">{n < linked ? "Linked" : "—"}</span>
                  </li>
                ))}
              </ul>
            )}
            {i === 2 && (
              <ol className="route-steps">
                {bp.steps.map((step, n) => (
                  <li
                    key={step}
                    className={n < doneSteps ? "is-done" : n === working ? "is-working" : ""}
                  >
                    <span className="step-mark">
                      {n < doneSteps ? <Check size={11} /> : n + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )}
            {i === 3 && (
              <div className="route-action">
                <p className="sr-only">{bp.result}</p>
                <p className="action-text" aria-hidden="true">
                  {words.map((word, n) => (
                    <span key={n} className={n < shown ? "is-in" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </p>
                <p className={`route-rule ${t >= T.rule ? "is-in" : ""}`}>
                  <span className="mono">
                    <Flag size={11} />
                    Needs a person
                  </span>
                  {bp.rule}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
      <p className="sr-only" role="status">
        {complete ? `${bp.name}: example complete. ${bp.rule}` : ""}
      </p>
    </div>
  );
}
