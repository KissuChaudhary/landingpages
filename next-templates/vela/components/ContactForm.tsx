"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { site, type Billing } from "@/site.config";
import { TextMorph } from "@/components/ui/TextMorph";
export function ContactForm() {
  const [plan, setPlan] = useState("");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [status, setStatus] = useState<
    "idle" | "sending" | "saved" | "draft" | "sent" | "error"
  >("idle");
  const [error, setError] = useState("");
  const mode = site.links.contactEndpoint
    ? "endpoint"
    : site.links.email
      ? "email"
      : "local";
  const selected = site.pricing.plans.find((item) => item.id === plan);
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: site.pricing.currency,
      maximumFractionDigits: 0,
    }).format(value);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("plan");
    if (site.pricing.plans.some((item) => item.id === requested))
      setPlan(requested!);
    if (params.get("billing") === "annual") setBilling("annual");
  }, []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (fields.get("website")) return;
    const request = {
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      company: String(fields.get("company") || "").trim(),
      teamSize: String(fields.get("teamSize") || ""),
      message: String(fields.get("message") || "").trim(),
      plan: selected?.name || "To discuss",
      billing,
      price: selected
        ? billing === "annual"
          ? `${money(selected.annual * 12)} per year (${money(selected.annual)}/month equivalent)`
          : `${money(selected.monthly)} per month`
        : "To discuss",
    };
    if (!request.name || !request.company || !request.message) {
      setError(
        "Please add your name, company and a little context about your team.",
      );
      setStatus("error");
      return;
    }
    const text = `Walkthrough request\n\nName: ${request.name}\nEmail: ${request.email}\nCompany: ${request.company}\nTeam size: ${request.teamSize}\nPlan: ${request.plan}\nBilling: ${request.billing}\nPrice: ${request.price}\n\n${request.message}`;
    setError("");
    if (mode === "local") {
      const url = URL.createObjectURL(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "walkthrough-request.txt";
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("saved");
      return;
    }
    if (mode === "email") {
      window.location.href = `mailto:${site.links.email}?subject=${encodeURIComponent(`${site.brand} walkthrough — ${request.company}`)}&body=${encodeURIComponent(text)}`;
      setStatus("draft");
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
      setPlan("");
    } catch {
      setError(
        "Your request wasn’t sent. Please try again. Your details are still in the form.",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };
  const label =
    status === "sending"
      ? "Sending your request…"
      : mode === "endpoint"
        ? "Send your request"
        : mode === "email"
          ? "Open an email draft"
          : "Save your request";
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
          />
        </label>
        <label>
          Work email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={200}
          />
        </label>
        <label>
          Company
          <input
            name="company"
            autoComplete="organization"
            placeholder="Your company"
            required
            maxLength={100}
          />
        </label>
        <label>
          Team size
          <select name="teamSize" required defaultValue="">
            <option value="" disabled>
              Choose a size
            </option>
            <option>1–3 people</option>
            <option>4–10 people</option>
            <option>11–30 people</option>
            <option>31+ people</option>
          </select>
        </label>
      </div>
      <label>
        A starting point
        <select
          name="plan"
          value={plan}
          onChange={(event) => setPlan(event.target.value)}
        >
          <option value="">Let’s discuss what fits</option>
          {site.pricing.plans.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      {selected && (
        <div className="contact-plan">
          <div>
            <span>{selected.name}</span>
            <b>
              {money(selected[billing])}
              <small> / month</small>
            </b>
          </div>
          <label>
            Billing
            <select
              value={billing}
              onChange={(event) => setBilling(event.target.value as Billing)}
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Yearly</option>
            </select>
          </label>
          <p>
            <TextMorph>
              {billing === "annual"
                ? `${money(selected.annual * 12)} billed once a year. Save ${money((selected.monthly - selected.annual) * 12)} annually.`
                : `${money(selected.monthly)} billed monthly.`}
            </TextMorph>
          </p>
        </div>
      )}
      <label>
        What would you like to bring together?
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your relationships, your team and the work you want to make a little easier."
          required
          maxLength={1500}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      <button
        className="button button-dark form-submit"
        type="submit"
        disabled={status === "sending"}
      >
        <TextMorph>{label}</TextMorph>
        <span className="button-icon">
          {mode === "local" ? (
            <Download size={15} />
          ) : mode === "email" ? (
            <Mail size={15} />
          ) : (
            <ArrowUpRight size={15} />
          )}
        </span>
      </button>
      <div className="form-status" role="status" aria-live="polite">
        {status === "saved" && (
          <span>
            <Check size={13} />
            Request saved to your device. Nothing has been sent.
          </span>
        )}
        {status === "draft" && (
          <span>
            <Mail size={13} />
            Email draft opened. Review it in your mail app before sending.
          </span>
        )}
        {status === "sent" && (
          <span>
            <Check size={13} />
            {site.contact.success}
          </span>
        )}
        {status === "error" && <span className="form-error">{error}</span>}
      </div>
      <p className="form-privacy">
        {mode === "local"
          ? "This preview saves a plain-text request on your device. No personal details are transmitted."
          : mode === "email"
            ? "This opens your mail app. Your request is sent only when you send the email."
            : "Your details are used to respond to this request."}
      </p>
    </form>
  );
}
