"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download, ArrowLeft } from "lucide-react";
import { site } from "@/site.config";
import { downloadText } from "@/lib/download";
type Brief = {
  name: string;
  email: string;
  company: string;
  plan: string;
  billing: string;
  message: string;
};
export function ContactForm() {
  const [brief, setBrief] = useState<Brief>({
    name: "",
    email: "",
    company: "",
    plan: "team",
    billing: "monthly",
    message: "",
  });
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setBrief((value) => ({
      ...value,
      plan: site.plans.some((p) => p.id === params.get("plan"))
        ? params.get("plan")!
        : value.plan,
      billing: params.get("billing") === "annual" ? "annual" : "monthly",
    }));
  }, []);
  const plan = site.plans.find((p) => p.id === brief.plan)!;
  const price = brief.billing === "annual" ? plan.annual : plan.monthly;
  function field(key: keyof Brief, value: string) {
    setBrief((b) => ({ ...b, [key]: value }));
    setError("");
  }
  async function submit() {
    if (!site.links.contactEndpoint) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      if (!response.ok) throw new Error("Submission did not complete.");
      setSent(true);
    } catch {
      setError(
        "Your brief is still here. Please try again or download a copy.",
      );
    } finally {
      setSending(false);
    }
  }
  if (ready)
    return (
      <div className="contact-review">
        <p className="eyebrow">
          {sent ? "Message received" : "Your conversation brief"}
        </p>
        <h2>{sent ? "Thanks for reaching out." : "A good place to begin."}</h2>
        <p>
          {sent
            ? "Your configured service accepted the brief."
            : "Review the details before sending or keeping a local copy."}
        </p>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{brief.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{brief.email}</dd>
          </div>
          <div>
            <dt>Company</dt>
            <dd>{brief.company || "Not provided"}</dd>
          </div>
          <div>
            <dt>Plan</dt>
            <dd>
              {plan.name} · {brief.billing}
              {price === null
                ? " · Custom"
                : price === 0
                  ? " · Free"
                  : brief.billing === "annual"
                    ? ` · $${price * 12} per year`
                    : ` · $${price} per month`}
            </dd>
          </div>
        </dl>
        <p className="brief-message">{brief.message}</p>
        <div className="contact-review-actions">
          {site.links.contactEndpoint && !sent && (
            <button className="button" disabled={sending} onClick={submit}>
              {sending ? "Sending…" : "Send the brief"}
              <ArrowUpRight size={15} />
            </button>
          )}
          <button
            className={`button ${site.links.contactEndpoint ? "button-light" : ""}`}
            onClick={() =>
              downloadText(
                "aster-conversation-brief.json",
                JSON.stringify(brief, null, 2),
                "application/json",
              )
            }
          >
            Download brief
            <Download size={15} />
          </button>
          {!sent && (
            <button className="text-button" onClick={() => setReady(false)}>
              <ArrowLeft size={15} />
              Edit details
            </button>
          )}
        </div>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <p className="small-note">
          {site.links.contactEndpoint
            ? "Submitting sends these details to the configured contact service."
            : "Prepared locally. Configure your contact endpoint to accept submissions."}
        </p>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const normalized = Object.fromEntries(
          Object.entries(brief).map(([key, value]) => [key, value.trim()]),
        ) as Brief;
        if (normalized.name.length < 2 || normalized.message.length < 10) {
          setError(
            "Please include your name and a little more detail about your question.",
          );
          return;
        }
        setBrief(normalized);
        setReady(true);
      }}
    >
      <div className="form-pair">
        <label>
          Your name
          <input
            required
            minLength={2}
            name="name"
            autoComplete="name"
            value={brief.name}
            onChange={(e) => field("name", e.target.value)}
            placeholder="Nina Shah"
          />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={brief.email}
            onChange={(e) => field("email", e.target.value)}
            placeholder="you@yourcompany.com"
          />
        </label>
      </div>
      <label>
        Company <span>Optional</span>
        <input
          name="company"
          autoComplete="organization"
          value={brief.company}
          onChange={(e) => field("company", e.target.value)}
          placeholder="Your team or product"
        />
      </label>
      <div className="form-pair">
        <label>
          A starting point
          <select
            value={brief.plan}
            onChange={(e) => field("plan", e.target.value)}
          >
            {site.plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Billing preference
          <select
            value={brief.billing}
            onChange={(e) => field("billing", e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </label>
      </div>
      <label>
        What would you like to explore?
        <textarea
          required
          minLength={10}
          name="message"
          rows={5}
          value={brief.message}
          onChange={(e) => field("message", e.target.value)}
          placeholder="Tell us a little about your support day."
        />
      </label>
      <button className="button" type="submit">
        Review your brief
        <ArrowUpRight size={15} />
      </button>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <p className="small-note">
        {site.links.contactEndpoint
          ? "Review your details before submitting."
          : "This example prepares a local brief. No message is sent."}
      </p>
    </form>
  );
}
