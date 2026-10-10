"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/site.config";
import { useHandle } from "@/lib/handle";
import { sendEmailSignup, signupHref } from "@/lib/links";
import { Brand } from "@/components/ui/Brand";
import { Button, SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";
import { Bluesky, Check, Instagram, XLogo } from "@/components/ui/Icons";

// The footer opens with the visitor's own address, set in tiles that drop into place:
// inlay.me/you, or the handle they typed in the hero. Then links, a newsletter form whose
// button morphs through its states, and the small print.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const socials = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "x", label: "X", Icon: XLogo },
  { key: "bluesky", label: "Bluesky", Icon: Bluesky },
] as const;

export function Footer() {
  const { footer } = site;
  const handle = useHandle();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");
  const name = handle || "you";
  const domain = `${site.handleDomain}/`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    if (!EMAIL.test(email.trim())) return setError("Enter an email like you@example.com");
    setError("");
    setState("busy");
    try {
      await sendEmailSignup(site.links.newsletterEndpoint, email.trim(), `${site.brand} product notes`);
      setState("done");
    } catch {
      setState("idle");
      setError("Couldn't subscribe just now. Try again?");
    }
  };
  const label = state === "idle" ? footer.newsletter.button.idle : state === "busy" ? footer.newsletter.button.busy : footer.newsletter.button.done;

  return (
    <footer className="footer" data-dock-hide>
      <div className="container">
        <div className="foot-claim" data-reveal="none" style={{ "--len": domain.length + name.length } as CSSProperties}>
          <p className="foot-kicker">{footer.claim}</p>
          <SmartLink to={signupHref(handle)} className="foot-url" aria-label={`Claim ${domain}${name}`}>
            <span className="foot-domain" aria-hidden="true">
              {Array.from(domain).map((c, i) => (
                <span key={i} className="foot-ch" style={{ "--i": i } as CSSProperties}>
                  {c}
                </span>
              ))}
            </span>
            <span className="foot-handle" aria-hidden="true">
              <TextMorph>{name}</TextMorph>
            </span>
          </SmartLink>
          <Button to={signupHref(handle)} label={handle ? "Claim it" : site.hero.claim} tone="ink" size="lg" />
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <SmartLink to="/" aria-label={`${site.brand} home`}>
              <Brand />
            </SmartLink>
            <form className="foot-form" onSubmit={submit} noValidate>
              <label htmlFor="foot-email" className="foot-form-title">
                {footer.newsletter.title}
              </label>
              <div className="foot-field" data-state={state}>
                <input
                  id="foot-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={footer.newsletter.placeholder}
                  value={email}
                  disabled={state !== "idle"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error || undefined}
                  aria-describedby="foot-note"
                />
                <button type="submit" className="btn btn-ink btn-sm status-btn" data-state={state} aria-live="polite">
                  <span className="status-icon" aria-hidden="true">
                    <span className="spinner" data-on={state === "busy"} />
                    <span data-on={state === "done"}>
                      <Check size={14} />
                    </span>
                  </span>
                  <TextMorph>{label}</TextMorph>
                </button>
              </div>
              <p id="foot-note" className="foot-note" aria-live="polite">
                {error}
              </p>
            </form>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} className="foot-col" aria-label={col.title}>
              <p className="foot-col-title">{col.title}</p>
              <ul>
                {col.links
                  .filter((l) => l.href)
                  .map((l) => (
                    <li key={l.label}>
                      <SmartLink to={l.href} className="text-link">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="foot-bottom">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          {site.links.status ? (
            <SmartLink to={site.links.status} className="foot-status">
              <i aria-hidden="true" />
              {footer.status}
            </SmartLink>
          ) : (
            <p className="foot-status">
              <i aria-hidden="true" />
              {footer.status}
            </p>
          )}
          <ul className="foot-legal">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <SmartLink to={l.href} className="text-link">
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <ul className="foot-social">
            {socials
              .filter((s) => site.links.social[s.key])
              .map(({ key, label, Icon }) => (
                <li key={key}>
                  <SmartLink to={site.links.social[key]} aria-label={label}>
                    <Icon size={17} />
                  </SmartLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
