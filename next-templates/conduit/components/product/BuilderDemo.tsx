"use client";
import { useState } from "react";
import { ArrowUp, Check, ChevronDown, Sparkles } from "lucide-react";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
import { useSite } from "../SiteShell";
export function BuilderDemo() {
  const [key, setKey] = useState<BlueprintKey>("support");
  const [built, setBuilt] = useState(false);
  const { open } = useSite();
  return (
    <div className="product-window builder-window">
      <div className="window-title">
        <span className="micro">Agent builder</span>
        <span className="status-dot" />{" "}
        <span className="micro status-label">Example</span>
      </div>
      <div className="builder-content">
        <div className="agent-message">
          <span className="message-symbol">
            <Sparkles size={16} />
          </span>
          <p>What would you like your agent to do?</p>
        </div>
        <div className="user-message">{blueprints[key].prompt}</div>
        <div className="agent-message">
          <span className="message-symbol">
            <Sparkles size={16} />
          </span>
          <div className="created-agent">
            <strong>{blueprints[key].name}</strong>
            <p>{blueprints[key].tools.join(" · ")}</p>
            <span className={`build-status ${built ? "is-built" : ""}`}>
              <Check size={13} />
              {built ? "Blueprint ready to inspect" : "Human approval included"}
            </span>
          </div>
        </div>
      </div>
      <form
        className="builder-input"
        onSubmit={(e) => {
          e.preventDefault();
          setBuilt(true);
        }}
      >
        <label className="sr-only" htmlFor="blueprint-select">
          Choose an agent blueprint
        </label>
        <select
          id="blueprint-select"
          value={key}
          onChange={(e) => {
            setKey(e.target.value as BlueprintKey);
            setBuilt(false);
          }}
        >
          {Object.entries(blueprints).map(([value, bp]) => (
            <option key={value} value={value}>
              {bp.name}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="select-chevron" aria-hidden="true" />
        <button type="submit" aria-label="Build example agent">
          <ArrowUp size={17} />
        </button>
      </form>
      {built && (
        <button
          className="window-footer-action"
          onClick={() => open({ kind: "blueprint", key })}
        >
          Inspect the blueprint
          <ArrowUp size={14} />
        </button>
      )}
    </div>
  );
}
