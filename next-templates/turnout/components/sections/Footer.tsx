"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { useInView } from "@/components/Motion";
import { Mark } from "@/components/ui/Brand";
import { SmartLink } from "@/components/ui/Action";
import { TextMorph } from "@/components/ui/TextMorph";
import { ArrowUp, Check, Instagram, LinkedIn, TikTok } from "@/components/ui/Icons";

// The page lifts away to reveal the footer underneath (on screens tall enough to show all
// of it). The newsletter form posts to links.newsletterEndpoint, or opens an email when
// that's empty. The button morphs through each state instead of swapping.

type State = "idle" | "sending" | "done" | "error" | "invalid";

const labels: Record<State, string> = {
  idle: site.footer.newsletter.action,
  sending: "Joining…",
  done: "You're on the list",
  error: "Try again",
  invalid: "Check your email",
};

const socials = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "tiktok", label: "TikTok", Icon: TikTok },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedIn },
] as const;

function Newsletter() {
  const { newsletter } = site.footer;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setState("invalid");
    const endpoint = site.links.newsletterEndpoint;
    if (!endpoint) {
      const body = encodeURIComponent(`Please add ${email.trim()} to ${newsletter.title}.`);
      window.location.href = `mailto:${site.links.email}?subject=${encodeURIComponent(`Subscribe to ${newsletter.title}`)}&body=${body}`;
      return setState("done");
    }
    setState("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim() }) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <form className={`newsletter is-${state}`} onSubmit={submit} noValidate>
      <p className="newsletter-title">{newsletter.title}</p>
      <p className="newsletter-body">{newsletter.body}</p>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={newsletter.placeholder}
        value={email}
        aria-invalid={state === "invalid"}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state !== "idle" && state !== "sending") setState("idle");
        }}
      />
      <button type="submit" className="newsletter-button" disabled={state === "sending" || state === "done"}>
        <span className="newsletter-icon" aria-hidden="true">
          <span className="newsletter-spinner" />
          <Check size={14} />
        </span>
        <TextMorph>{labels[state]}</TextMorph>
      </button>
      <span className="sr-only" role="status">
        {state === "done" ? labels.done : state === "error" ? "Something went wrong. Please try again." : state === "invalid" ? "Please enter a valid email address." : ""}
      </span>
    </form>
  );
}

export function Footer() {
  const { footer, links } = site;
  const [markRef, markIn] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const year = new Date().getFullYear();

  return (
    <footer className="footer on-dark">
      <div className="container footer-head">
        <p className="h2 footer-headline">
          {footer.headline.map((line, i) => (
            <span key={line} className="footer-line">
              {line}
              {i < footer.headline.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <Newsletter />
      </div>

      <div className="container footer-grid">
        <nav className="footer-col" aria-label="Footer">
          <p className="footer-label label">Explore</p>
          <ul className="footer-links">
            {[...site.nav, { label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href}>
                <SmartLink to={l.href} className="footer-link">
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col footer-contact">
          <p className="footer-label label">Say hello</p>
          <a className="footer-email" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="footer-phone" href={`tel:${links.phone.replace(/[^\d+]/g, "")}`}>
            {links.phone}
          </a>
          <address className="footer-address">
            {links.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>

        <div className="footer-col">
          <p className="footer-label label">Follow</p>
          <ul className="footer-social">
            {socials
              .filter((s) => links.social[s.key])
              .map(({ key, label, Icon }) => (
                <li key={key}>
                  <a href={links.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={18} />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div ref={markRef} className={`container footer-mark ${markIn ? "is-in" : ""}`} aria-hidden="true">
        <Mark size={120} className="footer-mark-glyph" />
        <span className="footer-word">
          {Array.from(site.brand).map((c, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </span>
      </div>

      <div className="container footer-base">
        <span>
          © {year} {site.legalName}
        </span>
        <span className="footer-legal">
          {footer.legal.map((l) => (
            <SmartLink key={l.href} to={l.href} className="text-link">
              {l.label}
            </SmartLink>
          ))}
        </span>
        <a className="footer-top" href="#main">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
