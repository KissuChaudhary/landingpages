"use client";

import * as React from "react";
import { site } from "@/site.config";
import { mailto, signupHref } from "@/lib/links";
import { TextMorph } from "@/components/hairline/text-morph";
import { useReducedMotion } from "@/components/motion/Motion";
import { Roll, Throw } from "@/components/ui/Primitives";

/*
 * CLOSING: a plumb line drops into the ink panel, and the sign-up is one pill.
 *   idle     "Start free trial"
 *   open     press it and the pill widens in place into an email field; the label
 *            blurs away as the field arrives and takes focus
 *   invalid  a small shake and a hint underneath
 *   sending  the arrow becomes a spinner
 *   done     the pill narrows around a check that draws itself and the answer
 *   Escape on an empty field folds it back
 *
 * Where the email goes, in order: site.signup.endpoint (POST { email } as JSON), then
 * links.signup (?email=…), then an email to links.email.
 */

type Status = "idle" | "open" | "pending" | "done";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function SignupPill() {
  const { labels } = site.closing;
  const reduced = useReducedMotion();
  const [status, setStatus] = React.useState<Status>("idle");
  const [email, setEmail] = React.useState("");
  const [hint, setHint] = React.useState("");
  const [done, setDone] = React.useState(labels.success);
  const [widths, setWidths] = React.useState({ idle: 0, open: 0, done: 0 });
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const startRef = React.useRef<HTMLButtonElement>(null);
  const idleFace = React.useRef<HTMLSpanElement>(null);
  const doneFace = React.useRef<HTMLSpanElement>(null);

  // The pill eases between measured widths: the label's, the field's and the answer's.
  React.useLayoutEffect(() => {
    const form = formRef.current;
    const host = form?.parentElement;
    if (!form || !host) return;
    const measure = () =>
      setWidths({
        idle: Math.ceil((idleFace.current?.offsetWidth ?? 200) + 2),
        open: Math.min(460, host.clientWidth),
        done: Math.ceil((doneFace.current?.offsetWidth ?? 220) + 2),
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    if (idleFace.current) observer.observe(idleFace.current);
    if (doneFace.current) observer.observe(doneFace.current);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  const open = () => {
    setStatus("open");
    window.setTimeout(() => inputRef.current?.focus(), reduced ? 0 : 220);
  };

  const shake = () =>
    !reduced &&
    formRef.current?.animate([{ transform: "none" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(-2px)" }, { transform: "none" }], {
      duration: 380,
      easing: "ease-out",
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "idle") return open();
    if (status !== "open") return;
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setHint(labels.invalid);
      shake();
      return;
    }
    setHint("");
    setStatus("pending");
    const { endpoint, param } = site.signup;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value }) });
        if (!res.ok) throw new Error(String(res.status));
        setDone(labels.success);
        setStatus("done");
      } catch {
        setStatus("open");
        setHint(labels.error);
        shake();
      }
      return;
    }
    if (site.links.signup) {
      window.location.href = signupHref({ [param]: value });
      return;
    }
    window.location.href = mailto(`Start a ${site.brand.name} trial`, `Please start a free trial for ${value}.`);
    setDone(labels.mailto);
    setStatus("done");
  };

  const width = status === "idle" ? widths.idle : status === "done" ? widths.done : widths.open;
  const opened = status === "open" || status === "pending";

  return (
    <div className="pill-host">
      <form
        ref={formRef}
        className={`pill is-${status}`}
        onSubmit={submit}
        noValidate
        style={{ width: width || undefined }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && status === "open" && !email) {
            setStatus("idle");
            setHint("");
            startRef.current?.focus();
          }
        }}
      >
        <button ref={startRef} type="button" className="pill-start" onClick={open} inert={status !== "idle" || undefined} aria-label={labels.idle}>
          <span ref={idleFace} className="pill-face">
            <Roll text={labels.idle} />
            <Throw />
          </span>
        </button>

        <span className="pill-field" inert={!opened || undefined}>
          <label className="sr-only" htmlFor="closing-email">
            Email address
          </label>
          <input
            ref={inputRef}
            id="closing-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={labels.placeholder}
            value={email}
            readOnly={status === "pending"}
            aria-invalid={hint === labels.invalid || undefined}
            aria-describedby="closing-hint"
            onChange={(e) => {
              setEmail(e.target.value);
              if (hint) setHint("");
            }}
          />
          <button type="submit" className="pill-go" aria-label={status === "pending" ? labels.pending : labels.submit}>
            <span className="pill-go-icon" data-on={status !== "pending"} aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="pill-spinner" data-on={status === "pending"} aria-hidden="true" />
          </button>
        </span>

        <span className="pill-done" aria-hidden={status !== "done"}>
          <span ref={doneFace} className="pill-face">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="pill-check" />
            </svg>
            <TextMorph>{done}</TextMorph>
          </span>
        </span>
      </form>
      <p id="closing-hint" className={`pill-hint ${hint ? "is-shown" : ""}`} role="status">
        {hint || (status === "done" ? done : "")}
      </p>
    </div>
  );
}

export function Closing() {
  const { closing } = site;
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-panel on-ink" data-reveal>
        <span className="closing-line" aria-hidden="true">
          <i />
        </span>
        <h2 id="closing-title" className="closing-title">
          {closing.title.map((line, i) => (
            <span key={line} className="closing-row" style={{ "--i": i } as React.CSSProperties}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <p className="closing-body">{closing.body}</p>
        <SignupPill />
        <p className="closing-note">{closing.note}</p>
      </div>
    </section>
  );
}
