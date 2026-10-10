"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { signupHref } from "@/lib/links";
import { useInView, useMotion } from "@/components/Motion";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { TextMorph } from "@/components/ui/TextMorph";
import { TileWords } from "@/components/ui/TileWords";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Action";
import { Check, Wallet } from "@/components/ui/Icons";

// The balance card. While it's on screen, payments fly in from the edges of the stage and
// land in the balance, which rolls up like an odometer; the newest one slides into the
// feed. The tabs roll between balance, this month and paid out. "Pay out" really empties
// the balance (in the demo) and the next payment starts filling it again.

type Item = { key: number; who: string; what: string; amount: number };
const SUBS = ["Available to pay out", "Earned since the 1st", "Sent to your bank, all time"];
const AGES = ["Just now", "2 min ago", "9 min ago", "1 hr ago"];

export function Pay() {
  const { pay } = site;
  const { reduced } = useMotion();
  const handle = useHandle();
  const [stageRef, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.45 });
  const figure = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const [view, setView] = useState(0);
  const [values, setValues] = useState(() => pay.views.map((v) => v.value));
  const [feed, setFeed] = useState<Item[]>(() =>
    pay.incoming.slice(0, 3).map((item, i) => ({ ...item, key: -i - 1 })),
  );
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const busy = useRef(false);
  const money = (n: number, sign = false) =>
    `${sign ? "+" : ""}${new Intl.NumberFormat("en-IE", { style: "currency", currency: pay.currency }).format(n)}`;

  // A payment arrives: a chip flies from the edge of the stage into the balance, then the
  // numbers roll and the feed makes room for it.
  const arrive = useCallback(() => {
    const stage = stageRef.current;
    const target = figure.current;
    const item = pay.incoming[(counter.current + 3) % pay.incoming.length];
    const key = ++counter.current;
    const land = () => {
      setValues(([balance, month, out]) => [balance + item.amount, month + item.amount, out]);
      setFeed((f) => [{ ...item, key }, ...f].slice(0, 4));
    };
    if (!stage || !target) return land();
    const box = stage.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    const chip = document.createElement("span");
    chip.className = "pay-fly";
    chip.textContent = `${money(item.amount, true)} · ${item.who}`;
    stage.appendChild(chip);
    const side = key % 2 ? 1 : -1;
    const x0 = side > 0 ? box.width - chip.offsetWidth - 18 : 18;
    const y0 = (key % 4 < 2 ? 0.18 : 0.74) * box.height;
    const x1 = end.left - box.left + end.width / 2 - chip.offsetWidth / 2;
    const y1 = end.top - box.top + end.height / 2 - chip.offsetHeight / 2;
    const xm = (x0 + x1) / 2 + side * 40;
    const ym = Math.min(y0, y1) - 60;
    const flight = chip.animate(
      [
        { transform: `translate(${x0}px, ${y0}px) scale(0.6) rotate(${side * 8}deg)`, opacity: 0 },
        { transform: `translate(${x0}px, ${y0}px) scale(1) rotate(${side * 4}deg)`, opacity: 1, offset: 0.18 },
        { transform: `translate(${xm}px, ${ym}px) scale(1) rotate(${side * -3}deg)`, opacity: 1, offset: 0.62 },
        { transform: `translate(${x1}px, ${y1}px) scale(0.35) rotate(0deg)`, opacity: 0 },
      ],
      { duration: 1500, easing: "cubic-bezier(0.45, 0, 0.2, 1)", fill: "forwards" },
    );
    flight.onfinish = () => {
      chip.remove();
      land();
    };
  }, [pay.incoming, stageRef]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!inView || reduced) return;
    const first = window.setTimeout(arrive, 900);
    const timer = window.setInterval(() => !busy.current && arrive(), 3400);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [inView, reduced, arrive]);

  const payOut = () => {
    if (state !== "idle" || values[0] <= 0) return;
    busy.current = true;
    setState("busy");
    setView(0);
    window.setTimeout(() => {
      setValues(([balance, month, out]) => [0, month, out + balance]);
      setState("done");
      window.setTimeout(() => {
        setState("idle");
        busy.current = false;
      }, 2600);
    }, 1300);
  };

  const label = state === "idle" ? pay.payout.idle : state === "busy" ? pay.payout.busy : pay.payout.done;

  return (
    <section className="section pay" id="pay" aria-labelledby="pay-title">
      <div className="container">
        <div className="head">
          <span className="chip" data-reveal="fade">
            <Wallet size={15} />
            {pay.label}
          </span>
          <TileWords id="pay-title" text={pay.title} className="h2" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {pay.description}
          </p>
        </div>

        <div className="pay-stage" ref={stageRef} data-reveal="scale">
          <div className="bal" data-dock-hide>
            <div className="bal-top">
              <div className="seg" style={{ "--i": view, "--n": pay.views.length } as CSSProperties}>
                <span className="seg-thumb" aria-hidden="true" />
                {pay.views.map((v, i) => (
                  <button key={v.label} type="button" aria-pressed={view === i} onClick={() => setView(i)}>
                    {v.label}
                  </button>
                ))}
              </div>
              <span className="bal-live">
                <i aria-hidden="true" />
                Live
              </span>
            </div>
            <div className="bal-figure" ref={figure}>
              <NumberRoll value={values[view]} format={{ style: "currency", currency: pay.currency }} locales="en-IE" duration={900} />
            </div>
            <p className="bal-sub">
              <TextMorph>{SUBS[view] ?? ""}</TextMorph>
            </p>
            <ul className="bal-feed" aria-label="Latest payments">
              {feed.map((item, i) => (
                <li key={item.key} className={item.key > 0 && i === 0 ? "is-new" : ""}>
                  <div className="bal-row">
                    <Avatar name={item.who} size={34} />
                    <div className="bal-what">
                      <p>
                        <b>{item.who}</b> {item.what.startsWith("Tip") ? "tipped you" : "paid you"}
                      </p>
                      <p className="bal-note">{item.what}</p>
                    </div>
                    <div className="bal-amt">
                      <p>{money(item.amount, true)}</p>
                      <p className="bal-note">{AGES[i]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-ink status-btn bal-payout" data-state={state} onClick={payOut} aria-live="polite" disabled={state === "idle" && values[0] <= 0}>
              <span className="status-icon" aria-hidden="true">
                <span className="spinner" data-on={state === "busy"} />
                <span data-on={state === "done"}>
                  <Check size={14} />
                </span>
              </span>
              <TextMorph>{label}</TextMorph>
            </button>
          </div>
        </div>

        <div className="pay-foot" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
          <p className="small">{pay.methods}</p>
          <Button to={signupHref(handle)} label={pay.cta} tone="line" />
        </div>
      </div>
    </section>
  );
}
