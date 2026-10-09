"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Download } from "lucide-react";
import { site } from "@/site.config";
import { Button, Frame, SectionHead } from "./ui/Primitives";
type Brief = { name: string; email: string; team: string; workflow: string };
export function ContactContent() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [draft, setDraft] = useState<Brief | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [download, setDownload] = useState("");
  useEffect(() => {
    if (!brief) return;
    const content = `${site.brand.toUpperCase()} WORKFLOW BRIEF\n\nName: ${brief.name}\nEmail: ${brief.email}\nTeam: ${brief.team || "Not specified"}\n\nWorkflow\n${brief.workflow}\n\n${site.links.contactEndpoint ? "Submitted to the configured contact endpoint." : "Prepared locally. Not sent to a server."}\n`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    setDownload(url);
    return () => URL.revokeObjectURL(url);
  }, [brief]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    const next: Brief = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      team: String(data.get("team")).trim(),
      workflow: String(data.get("workflow")).trim(),
    };
    setDraft(next);
    if (!next.name || !next.email || !next.workflow) {
      setError("Please enter your name, email and workflow.");
      setPending(false);
      return;
    }
    try {
      if (site.links.contactEndpoint) {
        const response = await fetch(site.links.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (!response.ok) throw new Error("Submission failed");
      }
      setBrief(next);
    } catch {
      setError(
        "Your brief could not be submitted. Please try again; the fields have been kept.",
      );
    } finally {
      setPending(false);
    }
  };
  return (
    <Frame className="section contact-page">
      <div>
        <SectionHead
          level={1}
          label="Start a conversation"
          title="What would you like to put to work?"
        />
        <p className="page-description">
          A repetitive task. A complicated handoff. An idea you have been
          waiting to try. Tell us where you would like to begin.
        </p>
        <div className="contact-expectations">
          <p>
            <ArrowRight size={16} />
            Start with your team and your context.
          </p>
          <p>
            <ArrowRight size={16} />
            Find one useful workflow to explore.
          </p>
          <p>
            <ArrowRight size={16} />
            Keep the next step clear and considered.
          </p>
        </div>
      </div>
      <div>
        {brief ? (
          <div className="contact-success" role="status">
            <Check size={28} />
            <h3>
              {site.links.contactEndpoint
                ? "Your brief is on its way."
                : "Your workflow brief is ready."}
            </h3>
            <p>
              {site.links.contactEndpoint
                ? "Thank you. Your message was submitted to the configured team."
                : "This preview prepares your brief locally. Nothing has been sent. You can save it and share it with your team."}
            </p>
            <a
              className="button button-solid"
              href={download || undefined}
              download="conduit-workflow-brief.txt"
            >
              <Download size={16} />
              Save the brief
            </a>
            <button className="text-action" onClick={() => setBrief(null)}>
              Edit your brief
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <label>
              Your name
              <input
                name="name"
                defaultValue={draft?.name}
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                defaultValue={draft?.email}
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label>
              Company or team<span className="optional">Optional</span>
              <input
                name="team"
                defaultValue={draft?.team}
                autoComplete="organization"
                maxLength={150}
              />
            </label>
            <label>
              The workflow you have in mind
              <textarea
                name="workflow"
                defaultValue={draft?.workflow}
                rows={5}
                required
                maxLength={3000}
                placeholder="We spend a lot of time on…"
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={pending}>
              {pending
                ? "Preparing…"
                : site.links.contactEndpoint
                  ? "Send your brief"
                  : "Prepare your brief"}
            </Button>
            <p className="fine-print">
              {site.links.contactEndpoint
                ? "Your details will be sent to the configured contact destination."
                : "Local preview. Your details stay in this browser unless you choose to export them."}
            </p>
          </form>
        )}
      </div>
    </Frame>
  );
}
