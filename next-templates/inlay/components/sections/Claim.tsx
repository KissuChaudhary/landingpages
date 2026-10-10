"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { cleanHandle, handleProblem, setHandle, useHandle } from "@/lib/handle";
import { signupHref } from "@/lib/links";
import { href as pageHref } from "@/lib/urls";
import { useMotion } from "@/components/Motion";
import { TextMorph } from "@/components/ui/TextMorph";
import { Check } from "@/components/ui/Icons";
import { Roll, ThrowArrow } from "@/components/ui/Action";

// The handle field. Until someone types, it cycles through example handles (letters they
// share stay put). Typing checks the handle as you go; claiming goes to sign-up with it.

type Status = { tone: "idle" | "ok" | "warn" | "busy"; text: string };

const messages = {
  short: "At least three characters",
  chars: "Letters, numbers, dots and underscores",
  edge: "Start and end with a letter or number",
};

export function Claim({ id }: { id?: string }) {
  const { reduced } = useMotion();
  const handle = useHandle();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [example, setExample] = useState(0);
  const [taken, setTaken] = useState<Record<string, boolean>>({});
  const [checking, setChecking] = useState(false);
  const [shake, setShake] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // Pick up a handle typed earlier in the visit.
  useEffect(() => {
    if (handle && !value) setValue(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  // Cycle the examples while the field is empty and idle.
  useEffect(() => {
    if (reduced || value || focused) return;
    const timer = window.setInterval(() => setExample((i) => (i + 1) % site.hero.handles.length), 2400);
    return () => window.clearInterval(timer);
  }, [reduced, value, focused]);

  const problem = handleProblem(value);
  const ok = !!value && !problem;

  // Optional availability check against your own endpoint.
  useEffect(() => {
    if (!ok || !site.links.handleCheck || value in taken) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(async () => {
      setChecking(true);
      try {
        const res = await fetch(`${site.links.handleCheck}?handle=${encodeURIComponent(value)}`, { signal: ctrl.signal });
        const data = (await res.json()) as { available?: boolean };
        setTaken((t) => ({ ...t, [value]: data.available === false }));
      } catch {
        // Network trouble: let sign-up decide.
      } finally {
        setChecking(false);
      }
    }, 320);
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
    };
  }, [ok, value, taken]);

  const isTaken = ok && taken[value] === true;
  const status: Status = !value
    ? { tone: "idle", text: "Free forever. Takes a minute." }
    : problem
      ? { tone: "warn", text: messages[problem] }
      : checking
        ? { tone: "busy", text: "Checking" }
        : isTaken
          ? { tone: "warn", text: "Taken. Try another" }
          : { tone: "ok", text: `${site.handleDomain}/${value} looks good` };

  const onChange = (raw: string) => {
    const next = cleanHandle(raw);
    setValue(next);
    setHandle(handleProblem(next) ? "" : next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok || isTaken) {
      setShake(true);
      input.current?.focus();
      return;
    }
    setHandle(value);
    // Without a sign-up link yet, claiming shows the plans.
    const to = site.links.signup ? signupHref(value) : "/#pricing";
    if (to.startsWith("/#")) document.getElementById(to.slice(2))?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    else window.location.href = to.startsWith("/") ? pageHref(to) : to;
  };

  const ghost = site.hero.handles[example];

  return (
    <form id={id} className={`claim ${focused ? "is-focused" : ""}`} data-status={status.tone} onSubmit={submit} noValidate>
      <div className="claim-box" data-shake={shake || undefined} onAnimationEnd={() => setShake(false)}>
        <label className="claim-field">
          <span className="claim-domain">{site.handleDomain}/</span>
          <span className="claim-input">
            <input
              ref={input}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="url"
              maxLength={24}
              aria-label={`Choose your handle on ${site.handleDomain}`}
              aria-describedby="claim-status"
              aria-invalid={value ? !ok || isTaken : undefined}
            />
            {!value && (
              <span className="claim-ghost" aria-hidden="true">
                {focused ? <span className="claim-hint">yourname</span> : <TextMorph duration={520}>{ghost}</TextMorph>}
              </span>
            )}
          </span>
        </label>
        <button type="submit" className="btn btn-ink claim-btn">
          <Roll text={site.hero.claim} />
          <ThrowArrow />
        </button>
      </div>
      <p className="claim-status" id="claim-status" aria-live="polite">
        <span className="claim-dot" aria-hidden="true">
          <Check size={10} />
        </span>
        <TextMorph>{status.text}</TextMorph>
      </p>
    </form>
  );
}
