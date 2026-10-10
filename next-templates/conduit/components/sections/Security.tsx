"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
import { useSite } from "../SiteShell";

// A readable policy for the customer-care example. Each group answers one
// principle on the left; `g` ties a line to its principle.
const policy: { text: string; g?: number; key?: boolean }[] = [
  { text: "agent: customer-care", key: true },
  { text: "access:", g: 0, key: true },
  { text: "  tools: [orders.read, kb.search, desk.draft]", g: 0 },
  { text: "  approval: [refunds.issue]", g: 0 },
  { text: "context:", g: 1, key: true },
  { text: "  sources: [order-record, returns-policy]", g: 1 },
  { text: "  retain: per-run", g: 1 },
  { text: "oversight:", g: 2, key: true },
  { text: "  history: readable", g: 2 },
  { text: "  escalate: person-requested", g: 2 },
];

export function Security() {
  const { motion } = useSite();
  const [focus, setFocus] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!motion || held) return;
    const timer = setInterval(() => setFocus((f) => (f + 1) % 3), 2800);
    return () => clearInterval(timer);
  }, [motion, held]);
  return (
    <Frame className="section control" id="control">
      <div className="control-copy">
        <SectionHead label={site.security.label} title={site.security.title}>
          <p>{site.security.intro}</p>
        </SectionHead>
        <ol
          className="control-list"
          onMouseLeave={() => setHeld(false)}
        >
          {site.security.items.map((item, i) => (
            <li key={item.title} className={focus === i ? "is-focus" : ""}>
              <button
                onMouseEnter={() => {
                  setHeld(true);
                  setFocus(i);
                }}
                onFocus={() => {
                  setHeld(true);
                  setFocus(i);
                }}
                onClick={() => {
                  setHeld(true);
                  setFocus(i);
                }}
                aria-pressed={focus === i}
              >
                <span className="mono">{site.security.seals[i].title}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <figure className="policy" aria-label="An example agent policy">
        <div className="policy-head mono">
          <span>policy / customer-care.yaml</span>
          <span className="policy-state">
            <span className="status-dot" />
            Enforced on every run
          </span>
        </div>
        <pre>
          {policy.map((line, n) => (
            <code
              key={n}
              className={`${line.g === focus ? "is-focus" : ""} ${line.key ? "is-key" : ""}`}
            >
              <span className="policy-n">{String(n + 1).padStart(2, "0")}</span>
              {line.text}
            </code>
          ))}
        </pre>
        <figcaption className="mono">
          Example policy · {site.security.seals[focus].detail}
        </figcaption>
      </figure>
    </Frame>
  );
}
