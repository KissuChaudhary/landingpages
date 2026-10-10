"use client";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { briefText, emailDraft, type Brief } from "@/lib/contact";
import { Arrow } from "./ui/Arrow";

const empty: Brief = {
  name: "",
  email: "",
  company: "",
  service: "",
  engagement: "",
  budget: "",
  message: "",
};
export function ContactForm() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [status, setStatus] = useState<
    "idle" | "sending" | "ready" | "sent" | "error"
  >("idle");
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const engagement = search.get("engagement");
    const service = search.get("service");
    setBrief((value) => ({
      ...value,
      engagement: site.plans.some((plan) => plan.id === engagement)
        ? engagement!
        : "",
      service: site.services.some((item) => item.name === service)
        ? service!
        : "",
    }));
  }, []);
  const update = (key: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
    if (status !== "sending") setStatus("idle");
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (const key of ["name", "message"] as const) {
      if (!brief[key].trim()) {
        const field = event.currentTarget.elements.namedItem(key) as
          | HTMLInputElement
          | HTMLTextAreaElement;
        field.setCustomValidity(
          key === "name"
            ? "Please enter your name."
            : "Tell us a little about your project.",
        );
        field.reportValidity();
        field.addEventListener("input", () => field.setCustomValidity(""), {
          once: true,
        });
        return;
      }
    }
    if (!site.links.contactEndpoint) {
      setStatus("ready");
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...brief, text: briefText(brief) }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([briefText(brief)], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-brief.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
            value={brief.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            autoComplete="email"
            type="email"
            placeholder="alex@yourstudio.com"
            required
            maxLength={254}
            value={brief.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
      </div>
      <label>
        Company <span>(optional)</span>
        <input
          name="company"
          autoComplete="organization"
          placeholder="Your company or project"
          maxLength={150}
          value={brief.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </label>
      <div className="form-row">
        <label>
          What do you have in mind?
          <select
            name="service"
            value={brief.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Let's figure it out</option>
            {site.services.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Ways to work together
          <select
            name="engagement"
            value={brief.engagement}
            onChange={(e) => update("engagement", e.target.value)}
          >
            <option value="">Open to a conversation</option>
            {site.plans.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Indicative budget
        <select
          name="budget"
          value={brief.budget}
          onChange={(e) => update("budget", e.target.value)}
        >
          <option value="">Let's discuss</option>
          <option>£2,000–£5,000</option>
          <option>£5,000–£10,000</option>
          <option>£10,000–£25,000</option>
          <option>£25,000+</option>
        </select>
      </label>
      <label>
        A little about your ambition
        <textarea
          name="message"
          placeholder="What are you building? What would you like to change? Tell us a little about your goals and timing."
          rows={5}
          required
          maxLength={5000}
          value={brief.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </label>
      <div className="form-foot">
        <p>
          We'll use these details to discuss your enquiry.{" "}
          <a href={href("/privacy")}>Privacy details</a>
        </p>
        <button
          className="button"
          type="submit"
          disabled={status === "sending"}
        >
          <span>
            {status === "sending"
              ? "Sending your brief…"
              : site.links.contactEndpoint
                ? "Send project brief"
                : "Prepare email draft"}
          </span>
          <span className="button-icon">
            <Arrow />
          </span>
        </button>
      </div>
      <div
        aria-live="polite"
        className={`form-status ${status === "idle" || status === "sending" ? "empty" : ""}`}
      >
        {status === "ready" && (
          <>
            <h3>Your next conversation, ready.</h3>
            <p>
              Your brief is prepared. Open the email draft to send it from your
              email app, or keep a copy.
            </p>
            <div>
              <a className="text-link" href={emailDraft(site.email, brief)}>
                Open email draft <Arrow />
              </a>
              <button
                type="button"
                className="download-link"
                onClick={download}
              >
                Download your brief
              </button>
            </div>
          </>
        )}
        {status === "sent" && (
          <>
            <h3>Thanks for starting the conversation.</h3>
            <p>
              Your project brief was sent. We'll reply using the email you
              provided.
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <h3>We couldn't send that just yet.</h3>
            <p>
              Your details are still here. Try again, or{" "}
              <a href={emailDraft(site.email, brief)}>
                send your brief by email
              </a>
              .
            </p>
          </>
        )}
      </div>
    </form>
  );
}
