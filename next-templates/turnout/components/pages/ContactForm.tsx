"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { TextMorph } from "@/components/ui/TextMorph";
import { Check, Cross } from "@/components/ui/Icons";

// Posts the enquiry as JSON to links.contactEndpoint. With no endpoint it opens the
// visitor's email app with everything filled in, so the form works the day you launch.
// A plan chosen on the pricing section arrives in the URL (?plan=season&billing=yearly).

type Status = "idle" | "sending" | "sent" | "mail" | "error";

const kinds = ["Pop-up or store takeover", "Launch night", "Community program", "Creator trip", "Not sure yet"];
const budgets = ["Under $50k", "$50k–150k", "$150k+", "Not sure yet"];

const labels: Record<Status, string> = {
  idle: "Send enquiry",
  sending: "Sending…",
  sent: "Sent. We'll be in touch",
  mail: "Opening your email app",
  error: "Try again",
};

type Fields = { name: string; email: string; company: string; kind: string; budget: string; dates: string; message: string };
const empty: Fields = { name: "", email: "", company: "", kind: kinds[0], budget: budgets[3], dates: "", message: "" };

function planLabel(plan: string | null, billing: string | null) {
  if (!plan) return null;
  if (plan === "custom") return "A tour or festival";
  const match = site.pricing.plans.find((p) => p.id === plan);
  if (!match) return null;
  return `${match.name} retainer${billing === "yearly" ? ", billed yearly" : billing === "quarterly" ? ", billed quarterly" : ""}`;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setPlan(planLabel(query.get("plan"), query.get("billing")));
  }, []);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = "Tell us who you are.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = "We need an email address to reply to.";
    if (fields.message.trim().length < 10) next.message = "A sentence or two about the idea helps us reply properly.";
    setErrors(next);
    // Move focus to the first field that needs attention.
    const first = (["name", "email", "message"] as const).find((key) => next[key]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return !first;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;
    const enquiry = { ...fields, plan: plan ?? undefined, page: window.location.href };
    const endpoint = site.links.contactEndpoint;
    if (!endpoint) {
      const details = [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        fields.company ? `Company: ${fields.company}` : "",
        plan ? `Plan: ${plan}` : "",
        `Looking for: ${fields.kind}`,
        `Budget: ${fields.budget}`,
        fields.dates ? `Dates: ${fields.dates}` : "",
      ].filter(Boolean);
      const body = `${details.join("\n")}\n\n${fields.message}`;
      window.location.href = `mailto:${site.links.email}?subject=${encodeURIComponent(`New enquiry from ${fields.name}`)}&body=${encodeURIComponent(body)}`;
      return setStatus("mail");
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(enquiry) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setFields(empty);
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof Fields) => ({
    id: `contact-${key}`,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
  });

  const error = (key: keyof Fields) =>
    errors[key] ? (
      <span className="field-error" id={`contact-${key}-error`}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <form className={`contact-form is-${status}`} onSubmit={submit} noValidate>
      {plan ? (
        <p className="contact-plan">
          <span className="label">About</span>
          <strong>{plan}</strong>
          <button type="button" aria-label="Remove plan" onClick={() => setPlan(null)}>
            <Cross size={12} />
          </button>
        </p>
      ) : null}
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input {...field("name")} autoComplete="name" />
          {error("name")}
        </label>
        <label className="field">
          <span>Email</span>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" />
          {error("email")}
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Company</span>
          <input {...field("company")} autoComplete="organization" />
        </label>
        <label className="field">
          <span>Dates or season</span>
          <input {...field("dates")} placeholder="e.g. late March" />
        </label>
      </div>
      <label className="field">
        <span>What are you planning?</span>
        <select {...field("kind")}>
          {kinds.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </label>
      <fieldset className="field">
        <legend>Production budget</legend>
        <div className="choice-row">
          {budgets.map((b) => (
            <label key={b} className="choice">
              <input type="radio" name="budget" value={b} checked={fields.budget === b} onChange={set("budget")} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field">
        <span>Tell us about it</span>
        <textarea {...field("message")} rows={5} placeholder="What you're launching, where, and who you want in the room." />
        {error("message")}
      </label>
      <button type="submit" className="contact-submit" disabled={status === "sending"}>
        <span className="newsletter-icon" aria-hidden="true">
          <span className="newsletter-spinner" />
          <Check size={14} />
        </span>
        <TextMorph>{labels[status]}</TextMorph>
      </button>
      <p className="sr-only" role="status">
        {status === "sent" ? "Your enquiry was sent." : status === "error" ? "Your enquiry could not be sent. Please try again." : ""}
      </p>
      <p className="contact-fine small">
        {site.links.contactEndpoint ? "We reply within two working days." : `This opens an email to ${site.links.email} with your answers filled in.`}
      </p>
    </form>
  );
}
