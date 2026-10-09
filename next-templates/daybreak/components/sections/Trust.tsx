"use client";
import { useState } from "react";
import { Check, Download, Eye, Hand, Lock } from "lucide-react";
import { site } from "@/site.config";
import { integrations } from "@/data/integrations";
import { IntegrationMark } from "../product/IntegrationMark";
import { Frame, SectionHead } from "../ui/Primitives";

// Which connected sources may suggest changes. Analytics only ever reports.
const SOURCES = ["search", "social", "mail", "analytics"];
const SUGGESTS = new Set(["search", "social", "mail"]);
const ICONS = [Eye, Hand, Download];
const LOG = [
  ["Tue 9:12", "Suggested moving $600 to Search", "Waiting for Mara"],
  ["Mon 8:00", "Weekly brief sent to 4 people", "Read-only"],
  ["Sun 23:40", "Synced 5 campaigns overnight", "Read-only"],
];

export function Trust() {
  const [suggest, setSuggest] = useState<Record<string, boolean>>({
    search: true,
    social: true,
    mail: false,
  });
  const sources = SOURCES.map((id) => integrations.find((i) => i.id === id)!).filter(Boolean);
  return (
    <Frame id="trust" className="trust-section">
      <div className="section-inner trust-layout">
        <div className="access-panel" data-reveal>
          <div className="access-head">
            <div>
              <strong>Connections</strong>
              <small>Forma workspace</small>
            </div>
            <span className="access-pill">
              <Eye size={13} />
              Read-only by default
            </span>
          </div>
          <div className="access-table" role="table" aria-label="What each connection can do">
            <div className="access-row access-row-head" role="row">
              <span role="columnheader">Source</span>
              <span role="columnheader">Read reports</span>
              <span role="columnheader">Suggest changes</span>
            </div>
            {sources.map((source) => {
              const can = SUGGESTS.has(source.id);
              const on = can && Boolean(suggest[source.id]);
              return (
                <div className="access-row" role="row" key={source.id}>
                  <span className="access-source" role="cell">
                    <IntegrationMark mark={source.mark} color={source.color} />
                    <span>
                      {source.name}
                      <small>{source.category}</small>
                    </span>
                  </span>
                  <span role="cell" className="access-always">
                    <Check size={14} />
                    <span>Always</span>
                  </span>
                  <span role="cell">
                    {can ? (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={`${source.name} can suggest changes`}
                        className="ui-switch"
                        onClick={() => setSuggest({ ...suggest, [source.id]: !on })}
                      >
                        <span />
                      </button>
                    ) : (
                      <span className="access-na">Reports only</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="access-rule">
            <Lock size={14} />
            Applying a change always asks a person first.
          </p>
          <ol className="access-log" aria-label="Recent activity">
            {LOG.map(([time, what, status]) => (
              <li key={time}>
                <time>{time}</time>
                <span>{what}</span>
                <small>{status}</small>
              </li>
            ))}
          </ol>
        </div>
        <div className="trust-copy">
          <SectionHead
            label={site.trust.label}
            title={site.trust.heading}
            text={site.trust.text}
            align="left"
          />
          <ul className="trust-principles">
            {site.trust.principles.map((principle, i) => {
              const Icon = ICONS[i] ?? Check;
              return (
                <li key={principle.title} data-reveal>
                  <span className="principle-icon">
                    <Icon size={16} />
                  </span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
