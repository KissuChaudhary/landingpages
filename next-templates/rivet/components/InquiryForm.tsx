"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { engagements } from "@/data/services";
import { downloadText } from "@/lib/download";
import { route } from "@/lib/urls";
import { Arrow } from "./ui/Mark";
type Fields = {
  name: string;
  email: string;
  company: string;
  engagement: string;
  budget: string;
  message: string;
};
const initial: Fields = {
  name: "",
  email: "",
  company: "",
  engagement: "Not sure yet",
  budget: "Let's discuss",
  message: "",
};
export function InquiryForm() {
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState<
    "idle" | "sending" | "ready" | "sent" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [brief, setBrief] = useState("");
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get("engagement");
    const selected = engagements.find((e) => e.id === requested);
    if (selected)
      setFields((current) => ({ ...current, engagement: selected.name }));
  }, []);
  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (status !== "sending") setStatus("idle");
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const clean = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value.trim()]),
    ) as Fields;
    if (
      !clean.name ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) ||
      clean.message.length < 20
    ) {
      setError(
        "Please add your name, a valid email, and at least 20 characters about your project.",
      );
      setStatus("error");
      return;
    }
    setError("");
    const prepared = `${site.brand} — Project inquiry\n\nName: ${clean.name}\nEmail: ${clean.email}\nCompany: ${clean.company || "Not provided"}\nEngagement: ${clean.engagement}\nBudget: ${clean.budget}\n\nProject\n${clean.message}\n`;
    setBrief(prepared);
    if (!site.links.contactEndpoint) {
      setStatus("ready");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      if (!response.ok)
        throw new Error(
          "The inquiry could not be accepted. Please try again or save your brief below.",
        );
      setStatus("sent");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We couldn’t send your inquiry. Please try again.",
      );
      setStatus("error");
    }
  }
  return (
    <div className="inquiry-form-wrap">
      <form className="inquiry-form" onSubmit={submit}>
        <fieldset disabled={status === "sending" || status === "sent"}>
          <div className="form-row">
            <label>
              Your name{" "}
              <input
                required
                autoComplete="name"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Alex Morgan"
                maxLength={100}
              />
            </label>
            <label>
              Email address{" "}
              <input
                required
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="alex@company.com"
                maxLength={200}
              />
            </label>
          </div>
          <label>
            Company{" "}
            <input
              autoComplete="organization"
              value={fields.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Your company or project (optional)"
              maxLength={150}
            />
          </label>
          <div className="form-row">
            <label>
              Where should we begin?{" "}
              <select
                value={fields.engagement}
                onChange={(e) => update("engagement", e.target.value)}
              >
                <option>Not sure yet</option>
                {engagements.map((e) => (
                  <option key={e.id}>{e.name}</option>
                ))}
                <option>Something else</option>
              </select>
            </label>
            <label>
              A budget in mind?{" "}
              <select
                value={fields.budget}
                onChange={(e) => update("budget", e.target.value)}
              >
                {[
                  "Let's discuss",
                  "£5,000—£15,000",
                  "£15,000—£30,000",
                  "£30,000+",
                  "Monthly partnership",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            What are you thinking?{" "}
            <textarea
              required
              minLength={20}
              maxLength={5000}
              rows={4}
              value={fields.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="A little about your idea, what you need, and when you’d like to begin."
            />
          </label>
          <div className="form-honey" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="form-submit" type="submit">
            <span>
              {status === "sending"
                ? "Sending your inquiry…"
                : status === "sent"
                  ? "Inquiry sent"
                  : site.links.contactEndpoint
                    ? "Send project inquiry"
                    : "Prepare project brief"}
            </span>
            <Arrow diagonal />
          </button>
        </fieldset>
        <p className="form-privacy">
          {site.links.contactEndpoint
            ? "We’ll use these details to respond to your inquiry."
            : "Review and save your brief before sharing it with us."}{" "}
          <a href={route("/privacy")}>Privacy information ↗</a>
        </p>
      </form>
      <div className="form-status" aria-live="polite" aria-atomic="true">
        {status === "sent" && (
          <p>Thanks for the introduction. Your inquiry has been received.</p>
        )}
        {status === "error" && <p className="form-error">{error}</p>}
      </div>
      {(status === "ready" || (status === "error" && brief)) && (
        <div className="brief-result">
          <span className="label-type">Your project, in a few words</span>
          <h3>Your brief is ready.</h3>
          <p>
            Save a copy for your team
            {site.email
              ? ", or open an email draft to introduce your project."
              : ". You can come back and refine the details whenever you’re ready."}
          </p>
          <pre>{brief}</pre>
          <div>
            <button
              onClick={() =>
                downloadText(
                  `${site.brand.toLowerCase()}-project-brief.txt`,
                  brief,
                )
              }
            >
              Save project brief <Arrow diagonal />
            </button>
            {site.email && (
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${fields.company || fields.name}`)}&body=${encodeURIComponent(brief)}`}
              >
                Open email draft <Arrow diagonal />
              </a>
            )}
          </div>
          <p className="brief-note">
            {status === "ready"
              ? "This brief has been prepared on your device. It hasn’t been sent."
              : "You can keep a copy while we resolve the delivery issue."}
          </p>
        </div>
      )}
    </div>
  );
}
