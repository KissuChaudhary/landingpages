"use client";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/links";
import { Arrow } from "./ui";
type Brief = {
  name: string;
  email: string;
  company: string;
  engagement: string;
  message: string;
};
export function ContactForm() {
  const [engagement, setEngagement] = useState("");
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "draft" | "error"
  >("idle");
  const [draft, setDraft] = useState("");
  useEffect(() => {
    setEngagement(
      new URLSearchParams(window.location.search).get("engagement") || "",
    );
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("website") || "")) return;
    const brief: Brief = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      company: String(data.get("company") || "").trim(),
      engagement,
      message: String(data.get("message")).trim(),
    };
    if (!brief.name || !brief.email || !brief.message) return;
    if (!site.links.contactEndpoint) {
      const body = `Name: ${brief.name}\nEmail: ${brief.email}\nCompany: ${brief.company || "—"}\nEngagement: ${brief.engagement || "Let’s find the right fit"}\n\n${brief.message}`;
      setDraft(
        `mailto:${site.email}?subject=${encodeURIComponent(`A system brief from ${brief.name}`)}&body=${encodeURIComponent(body)}`,
      );
      setState("draft");
      return;
    }
    setState("sending");
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("sent");
    } catch {
      setState("error");
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        if (state !== "sending") setState("idle");
      }}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        Company <span className="optional">optional</span>
        <input
          name="company"
          autoComplete="organization"
          maxLength={200}
          placeholder="Where you do your work"
        />
      </label>
      <label>
        What are you considering?
        <select
          name="engagement"
          value={engagement}
          onChange={(event) => setEngagement(event.target.value)}
        >
          <option value="">Let’s find the right fit</option>
          <option>System sprint — project</option>
          <option>System sprint — ongoing</option>
          <option>Build partnership — project</option>
          <option>Build partnership — ongoing</option>
          <option>Something more specific</option>
          {engagement &&
            ![
              "System sprint — project",
              "System sprint — ongoing",
              "Build partnership — project",
              "Build partnership — ongoing",
              "Something more specific",
            ].includes(engagement) && <option>{engagement}</option>}
        </select>
      </label>
      <label>
        Where does the work get tangled?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="The task, the tools, the people — and what you’d like to change."
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        By sending a brief, you agree to be contacted about your inquiry.{" "}
        <a href={href("/privacy")}>Privacy notice</a>.
      </p>
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={state === "sending" || state === "sent"}
      >
        <span className="panel-morph" key={state}>
          {state === "sending"
            ? site.contact.sending
            : state === "sent"
              ? site.contact.sent
              : site.links.contactEndpoint
                ? "Send your brief"
                : site.contact.submit}
        </span>
        <span className="button-arrow">
          <Arrow diagonal />
        </span>
      </button>
      <div className="form-status" role="status" aria-live="polite">
        {state === "draft" && (
          <div className="draft-ready panel-morph">
            <p>
              {site.contact.draft} Your email app opens next; nothing has been
              sent yet.
            </p>
            <a href={draft} className="text-link">
              Open email draft <Arrow diagonal />
            </a>
          </div>
        )}
        {state === "sent" && (
          <p>
            Thank you. Your brief was accepted by the configured form service.
          </p>
        )}
        {state === "error" && (
          <p>
            We couldn’t send your brief. Please try again or{" "}
            <a href={`mailto:${site.email}`}>email us directly</a>.
          </p>
        )}
      </div>
    </form>
  );
}
