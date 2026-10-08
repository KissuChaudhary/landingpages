"use client";
import { useId, useState } from "react";
import { ArrowUpRight, Check, Asterisk } from "lucide-react";
import type { Example } from "@/data/types";
export function SignupOutput({
  applied,
  example,
}: {
  applied: boolean;
  example: Example;
}) {
  const id = useId();
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className={`signup-output ${applied ? "is-refined" : ""}`}>
      <div className="output-brand">
        <Asterisk size={19} />
        <span>STUDIO NOTES</span>
      </div>
      <h3>{applied ? example.output.title : "Studio notes"}</h3>
      <p>{applied ? example.output.description : "Notes on making things."}</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setConfirmed(true);
        }}
      >
        <label htmlFor={id} className={applied ? "" : "sr-only"}>
          Your email
        </label>
        <div className="signup-field">
          <input
            id={id}
            type="email"
            required={applied}
            placeholder="you@example.com"
            autoComplete="off"
            aria-describedby={`${id}-note`}
          />
          <button
            type="submit"
            aria-label={applied ? example.output.action : "Join"}
          >
            {confirmed ? <Check size={17} /> : <ArrowUpRight size={17} />}
          </button>
        </div>
        <div id={`${id}-note`} className="output-form-note" role="status">
          {confirmed
            ? "Example confirmed. Nothing sent."
            : applied
              ? "A few good thoughts. No extra noise."
              : "An example. Nothing is sent."}
        </div>
      </form>
      <div className="output-rule">
        <span>MADE OF GOOD IDEAS</span>
        <span>↗</span>
      </div>
    </div>
  );
}
