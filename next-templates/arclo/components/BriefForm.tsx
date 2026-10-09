"use client";
import { useState, type FormEvent } from "react";
import { Check, Download, Mail, Pencil } from "lucide-react";
import { site } from "@/site.config";
import { Button } from "./ui/Primitives";
import { downloadFile } from "@/lib/download";
export function BriefForm({ waitlist = false }: { waitlist?: boolean }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    team: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "editing" | "loading" | "review" | "sent"
  >("editing");
  const [error, setError] = useState("");
  const endpoint = waitlist
    ? site.links.waitlistEndpoint
    : site.links.contactEndpoint;
  const title = waitlist ? "Early access interest" : "Close walkthrough request";
  const content = `${title}\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.team || "Not provided"}\n\n${data.message}`;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      (!waitlist && !data.message.trim())
    ) {
      setError(
        "Add your name, a valid email and a short note about your close.",
      );
      return;
    }
    if (!endpoint) {
      setStatus("review");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          intent: waitlist ? "waitlist" : "contact",
        }),
      });
      if (!response.ok) throw new Error("Request was not accepted.");
      setStatus("sent");
    } catch {
      setStatus("editing");
      setError(
        "We couldn’t send your note. Your details are still here; please try again.",
      );
    }
  };
  if (status === "sent")
    return (
      <div className="surface form-success" role="status">
        <span className="icon-tile">
          <Check size={24} />
        </span>
        <h2>{waitlist ? "You’re on the list." : "Your note is on its way."}</h2>
        <p>
          {waitlist
            ? "Thanks for sharing your interest. We’ll be in touch using the email you provided."
            : "Thanks. Someone from the team will reply by email to find a time."}
        </p>
      </div>
    );
  if (status === "review")
    return (
      <div className="surface brief-review">
        <span className="eyebrow">
          <Check size={14} />
          Ready to keep
        </span>
        <h2>
          {waitlist ? "Your interest, noted." : "Your close, in a few lines."}
        </h2>
        <p className="muted">
          This is a local preview.{" "}
          {waitlist
            ? "You haven’t joined a live mailing list."
            : "Your brief hasn’t been sent."}{" "}
          Save it or open an email draft to take the next step.
        </p>
        <dl>
          <dt>Name</dt>
          <dd>{data.name}</dd>
          <dt>Email</dt>
          <dd>{data.email}</dd>
          {data.team && (
            <>
              <dt>Company</dt>
              <dd>{data.team}</dd>
            </>
          )}
          <dt>Your close</dt>
          <dd>{data.message || "Interested in early access."}</dd>
        </dl>
        <div className="brief-actions">
          <button
            className="button button-secondary"
            onClick={() =>
              downloadFile(
                waitlist ? "arclo-interest.txt" : "arclo-walkthrough.txt",
                content,
                "text/plain",
              )
            }
          >
            <Download size={15} /> Save brief
          </button>
          <a
            className="button button-glow"
            href={`mailto:${site.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(content)}`}
          >
            <Mail size={15} /> Open email draft
          </a>
        </div>
        <button className="text-link" onClick={() => setStatus("editing")}>
          <Pencil size={14} /> Edit your details
        </button>
      </div>
    );
  return (
    <form className="surface brief-form" onSubmit={submit}>
      <h2>
        {waitlist ? "Join the early group." : "Tell us how you close today."}
      </h2>
      <p>
        {waitlist
          ? "We’re opening multi-entity closes to a few groups at a time."
          : "A few lines are enough. We’ll come back with a walkthrough built around it."}
      </p>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={200}
            value={data.email}
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />
        </label>
      </div>
      <label>
        Company <span className="muted">(optional)</span>
        <input
          name="team"
          autoComplete="organization"
          placeholder="Company name and entities"
          maxLength={150}
          value={data.team}
          onChange={(event) => setData({ ...data, team: event.target.value })}
        />
      </label>
      <label>
        {waitlist
          ? "What slows your close down today? (optional)"
          : "What slows your close down today?"}
        <textarea
          name="message"
          placeholder="Number of entities, how many days the close takes, where it gets stuck…"
          required={!waitlist}
          maxLength={3000}
          rows={5}
          value={data.message}
          onChange={(event) =>
            setData({ ...data, message: event.target.value })
          }
        />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? "Sending…"
          : endpoint
            ? waitlist
              ? "Join the waitlist"
              : "Send your note"
            : "Review your brief"}
      </Button>
      <p className="form-note">
        {endpoint
          ? "Your details go to our team when you submit."
          : "Your details stay on this page. Review, save or prepare an email draft."}
      </p>
    </form>
  );
}
