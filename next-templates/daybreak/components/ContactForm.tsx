"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Download, Check } from "lucide-react";
import { site } from "@/site.config";
import { downloadText } from "@/lib/download";
import { Frame, SectionHead } from "./ui/Primitives";
export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    team: "",
    message: "",
  });
  const [state, setState] = useState<
    "editing" | "sending" | "prepared" | "sent"
  >("editing");
  const [error, setError] = useState("");
  function update(key: keyof typeof values, value: string) {
    setValues({ ...values, [key]: value });
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!values.name.trim() || !values.message.trim()) {
      setError("Please add your name and a short note about your team.");
      return;
    }
    if (!site.links.contactEndpoint) {
      setState("prepared");
      return;
    }
    setState("sending");
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error();
      setState("sent");
    } catch {
      setError(
        "We couldn't send your note. Your details are still here; please try again.",
      );
      setState("editing");
    }
  }
  function brief() {
    return `${site.brand} — conversation brief\n\nName: ${values.name}\nEmail: ${values.email}\nTeam: ${values.team || "Not specified"}\n\n${values.message}\n\nPrepared locally. This note has not been sent.\n`;
  }
  return (
    <Frame className="contact-section">
      <div className="section-inner contact-layout">
        <div>
          <SectionHead
            level={1}
            label="Start a conversation"
            title={"What does a brighter\nday look like for you?"}
            text="Tell us a little about your team and the work you want to make room for."
            align="left"
          />
          <ul className="contact-points">
            <li>
              <Check size={16} />
              Your tools, your working style
            </li>
            <li>
              <Check size={16} />A place for the whole team
            </li>
            <li>
              <Check size={16} />A thoughtful next step
            </li>
          </ul>
          {site.links.contactEmail && (
            <a
              className="text-button"
              href={`mailto:${site.links.contactEmail}`}
            >
              {site.links.contactEmail}
            </a>
          )}
        </div>
        <div className="contact-paper">
          {state === "prepared" || state === "sent" ? (
            <div className="contact-result" role="status">
              <span className="success-mark">
                <Check size={26} />
              </span>
              <h2>
                {state === "sent"
                  ? "Your note is with us."
                  : "A good beginning."}
              </h2>
              <p>
                {state === "sent"
                  ? "Thanks for sharing a little about your team. We'll take a look at your note."
                  : "Your brief is ready to save. This preview keeps it on your device; nothing has been sent."}
              </p>
              <dl>
                <dt>Your name</dt>
                <dd>{values.name}</dd>
                <dt>Your team</dt>
                <dd>{values.team || "A new beginning"}</dd>
                <dt>Your note</dt>
                <dd>{values.message}</dd>
              </dl>
              {state === "prepared" && (
                <button
                  className="button button-dark"
                  onClick={() =>
                    downloadText(
                      `${site.brand.toLowerCase()}-conversation.txt`,
                      brief(),
                    )
                  }
                >
                  <Download size={16} />
                  Save your brief
                </button>
              )}
              <button
                className="text-button"
                onClick={() => setState("editing")}
              >
                Edit your note
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                autoComplete="name"
                required
                maxLength={100}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Mara Singh"
              />
              <label htmlFor="contact-email">Work email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@yourteam.com"
              />
              <label htmlFor="contact-team">
                Team or studio <span>Optional</span>
              </label>
              <input
                id="contact-team"
                autoComplete="organization"
                maxLength={120}
                value={values.team}
                onChange={(e) => update("team", e.target.value)}
                placeholder="A little about your team"
              />
              <label htmlFor="contact-message">
                What would you like to make easier?
              </label>
              <textarea
                id="contact-message"
                required
                maxLength={2000}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                placeholder="Reporting, campaign decisions, a place to bring it all together…"
              />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button
                className="button button-dark"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Sending…"
                  : site.links.contactEndpoint
                    ? "Send your note"
                    : "Prepare your brief"}
                <ArrowRight size={16} />
              </button>
              <small>
                {site.links.contactEndpoint
                  ? "We'll use your details to respond to this note."
                  : "A local preview. Prepare a brief to save on your device."}
              </small>
            </form>
          )}
        </div>
      </div>
    </Frame>
  );
}
