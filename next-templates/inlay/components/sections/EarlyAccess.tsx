"use client";

import { useState } from "react";
import type { CSSProperties, ComponentType } from "react";
import { site } from "@/site.config";
import { sendEmailSignup } from "@/lib/links";
import { useScrollProgress } from "@/components/Motion";
import { TileWords } from "@/components/ui/TileWords";
import { TextMorph } from "@/components/ui/TextMorph";
import { Bolt, Calendar, Card, Check, Globe, Qr, Shield, Sparkles, Wallet } from "@/components/ui/Icons";

// The early-access list. Tiles with the things Inlay Pay does drift past at different
// depths as you scroll; the form posts to your endpoint (or opens an email) and its button
// morphs through joining and joined, in place.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Float = { Icon: ComponentType<{ size?: number }>; x: number; y: number; s: number; r: number; tone?: "ultra" | "citrine" | "ink" };
const floats: Float[] = [
  { Icon: Shield, x: 9, y: 18, s: 140, r: -8 },
  { Icon: Wallet, x: 20, y: 64, s: -90, r: 6, tone: "ultra" },
  { Icon: Globe, x: 4, y: 84, s: 60, r: 10 },
  { Icon: Bolt, x: 30, y: 8, s: -60, r: 4, tone: "citrine" },
  { Icon: Card, x: 84, y: 14, s: 110, r: 8 },
  { Icon: Sparkles, x: 74, y: 70, s: -120, r: -6 },
  { Icon: Calendar, x: 93, y: 52, s: 70, r: -10, tone: "ink" },
  { Icon: Qr, x: 66, y: 6, s: -40, r: 5 },
];

export function EarlyAccess() {
  const { early } = site;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const ref = useScrollProgress<HTMLElement>((p, el) => el.style.setProperty("--p", p.toFixed(4)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (!EMAIL.test(email.trim())) {
      setError("Enter an email like you@example.com");
      return;
    }
    setError("");
    setState("busy");
    try {
      await sendEmailSignup(site.links.waitlistEndpoint, email.trim(), `${site.brand} Pay early access`);
      setState("done");
    } catch {
      setState("idle");
      setError("Couldn't join just now. Try again?");
    }
  };

  const label = state === "idle" ? early.button.idle : state === "busy" ? early.button.busy : early.button.done;

  return (
    <section className="section early" ref={ref} aria-labelledby="early-title" data-dock-hide>
      <div className="early-floats" aria-hidden="true">
        {floats.map(({ Icon, x, y, s, r, tone }, i) => (
          <span key={i} className="early-float" data-tone={tone} style={{ left: `${x}%`, top: `${y}%`, "--s": s, "--r": r } as CSSProperties}>
            <Icon size={22} />
          </span>
        ))}
      </div>
      <div className="container">
        <div className="head early-head">
          <span className="chip" data-reveal="fade">
            <Sparkles size={15} />
            {early.label}
          </span>
          <TileWords id="early-title" text={early.title} className="h2" />
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            {early.description}
          </p>
          <form className="early-form" onSubmit={submit} noValidate data-reveal style={{ "--d": "220ms" } as CSSProperties} data-state={state}>
            <label className="sr-only" htmlFor="early-email">
              Email address
            </label>
            <input
              id="early-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={early.placeholder}
              value={email}
              disabled={state !== "idle"}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={!!error || undefined}
              aria-describedby="early-note"
            />
            <button type="submit" className="btn btn-ultra status-btn" data-state={state} aria-live="polite">
              <span className="status-icon" aria-hidden="true">
                <span className="spinner" data-on={state === "busy"} />
                <span data-on={state === "done"}>
                  <Check size={14} />
                </span>
              </span>
              <TextMorph>{label}</TextMorph>
            </button>
          </form>
          <p id="early-note" className={`small early-note ${error ? "is-error" : ""}`} aria-live="polite">
            <TextMorph>{error || early.note}</TextMorph>
          </p>
        </div>
      </div>
    </section>
  );
}
