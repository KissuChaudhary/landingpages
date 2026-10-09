"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { submitSignup } from "@/lib/signup";
import { TextMorph } from "@/components/hairline/text-morph";
import { useReducedMotion } from "@/components/motion/MotionProvider";

/*
 * SIGN-UP FIELD: one surface from email to answer.
 *   idle     the email and a round mint button with an arrow
 *   invalid  a small shake, the edge tints and a hint fades in
 *   sending  the button stretches over the field and a light sweeps
 *            through it while your endpoint answers
 *   sent     a check draws itself and the button holds the answer
 *   failed   the button folds back and the hint asks to try again
 * Where the email goes is decided in lib/signup.ts (site.config.ts → signup).
 */

type Status = "idle" | "sending" | "sent";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function SignupForm() {
  const reduced = useReducedMotion();
  const id = React.useId();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [hint, setHint] = React.useState("");
  const pillRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const covering = status !== "idle";

  const shake = () =>
    !reduced &&
    pillRef.current?.animate(
      [{ transform: "none" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(-2px)" }, { transform: "none" }],
      { duration: 380, easing: "ease-out" },
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (covering) return;
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setHint("Enter a full work email, like you@company.com.");
      shake();
      inputRef.current?.focus();
      return;
    }
    setHint("");
    if (!site.signup.endpoint && !site.signup.url) {
      // No destination yet: the plans are the next step.
      await submitSignup(value);
      return;
    }
    setStatus("sending");
    try {
      const outcome = await submitSignup(value);
      if (outcome === "sent") setStatus("sent");
    } catch {
      setStatus("idle");
      setHint("That didn’t go through. Please try again.");
      shake();
    }
  };

  const label = status === "sending" ? (site.signup.endpoint ? "Sending" : "Opening sign-up") : status === "sent" ? site.signup.success : "";

  return (
    <form noValidate onSubmit={submit} className="relative mx-auto w-full max-w-[520px]">
      <div
        ref={pillRef}
        className={`relative flex h-[60px] items-center rounded-full border p-1.5 transition-[border-color,background-color] duration-300 ${
          hint ? "border-red-400/50 bg-white/[0.06]" : "border-white/10 bg-white/[0.05] focus-within:border-white/25 focus-within:bg-white/[0.07]"
        }`}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Work email
        </label>
        <input
          ref={inputRef}
          id={`${id}-email`}
          type="email"
          name={site.signup.param}
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          disabled={covering}
          aria-invalid={hint ? true : undefined}
          aria-describedby={`${id}-hint`}
          placeholder={site.signup.placeholder}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hint) setHint("");
          }}
          className="h-full min-w-0 flex-1 bg-transparent pl-4 pr-16 text-[15px] text-white outline-none placeholder:text-white/40 disabled:opacity-0 sm:pl-5"
          style={{ transition: "opacity 200ms ease-out" }}
        />
        <button
          type="submit"
          aria-label={covering ? undefined : site.signup.button}
          aria-disabled={covering || undefined}
          className="absolute bottom-1.5 right-1.5 top-1.5 flex items-center justify-center overflow-hidden rounded-full bg-mint px-3.5 text-[13.5px] font-[520] text-[#04140c] outline-none transition-[background-color] hover:bg-[#8ff5c3] focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          style={{ width: covering ? "calc(100% - 12px)" : 48, transition: reduced ? "none" : `width 560ms ${EASE}, background-color 300ms` }}
        >
          {status === "sending" && (
            <span aria-hidden="true" className="loop pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[sh-sweep_1.4s_ease-in-out_infinite]" />
            </span>
          )}
          <span className="relative flex min-w-0 items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true" className="relative grid size-[18px] shrink-0 place-items-center">
              <ArrowRight
                className="absolute size-[18px] transition-[opacity,scale,filter] duration-300"
                strokeWidth={2.2}
                style={{ opacity: status === "idle" ? 1 : 0, scale: status === "idle" ? "1" : "0.6", filter: status === "idle" ? "none" : "blur(3px)" }}
              />
              <span
                className={`absolute size-3.5 rounded-full border-2 border-current/25 border-t-current transition-[opacity,scale] duration-300 motion-reduce:animate-none ${status === "sending" ? "animate-spin" : ""}`}
                style={{ opacity: status === "sending" ? 1 : 0, scale: status === "sending" ? "1" : "0.6" }}
              />
              <svg viewBox="0 0 16 16" fill="none" className="absolute size-4">
                <path
                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  style={{ strokeDashoffset: status === "sent" ? 0 : 1, transition: status === "sent" && !reduced ? `stroke-dashoffset 460ms ${EASE} 260ms` : "none" }}
                />
              </svg>
            </span>
            {covering && (
              <span className="min-w-0 truncate">
                <TextMorph>{label}</TextMorph>
              </span>
            )}
          </span>
        </button>
      </div>
      <p
        id={`${id}-hint`}
        className="mt-2.5 h-4 text-[12.5px] text-red-300 transition-[opacity,transform] duration-300"
        style={{ opacity: hint ? 1 : 0, transform: hint ? "none" : "translateY(-3px)" }}
      >
        {hint}
      </p>
      <span role="status" className="sr-only">
        {status === "sent" ? site.signup.success : ""}
      </span>
    </form>
  );
}
