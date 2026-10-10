"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Download, Check } from "lucide-react";
import { plants } from "@/data/plants";
import { spaces } from "@/data/spaces";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { type Brief, briefText, downloadBrief } from "@/lib/brief";
const initial: Brief = {
  name: "",
  email: "",
  space: "At home",
  light: "Not sure yet",
  plant: "",
  message: "",
  consent: false,
};
export function EnquiryForm() {
  const [brief, setBrief] = useState<Brief>(initial);
  const [stage, setStage] = useState<"edit" | "review" | "sent">("edit");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const review = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plant = plants.find((item) => item.slug === params.get("plant"));
    const space = spaces.find((item) => item.slug === params.get("space"));
    setBrief((current) => ({
      ...current,
      plant: plant?.botanical || "",
      space: space?.name || current.space,
    }));
  }, []);
  useEffect(() => {
    if (stage !== "edit") review.current?.focus();
  }, [stage]);
  const update = (key: keyof Brief, value: string | boolean) =>
    setBrief((current) => ({ ...current, [key]: value }));
  const send = async () => {
    if (!site.links.contactEndpoint || sending) return;
    setSending(true);
    setStatus("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Enquiry not accepted");
      setStage("sent");
    } catch {
      setStatus(
        "Your enquiry could not be sent. Your details are still here; try again or save your brief.",
      );
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  };
  if (stage === "sent")
    return (
      <div ref={review} tabIndex={-1} className="brief-review">
        <Check size={30} strokeWidth={1} />
        <p className="eyebrow">A new chapter</p>
        <h2>
          Thank you, <em>{brief.name}.</em>
        </h2>
        <p>
          Your enquiry has been sent. We look forward to getting to know your
          space.
        </p>
        <button
          className="button button-outline"
          onClick={() => {
            downloadBrief(brief);
            setStatus("Your brief has been downloaded.");
          }}
        >
          Keep a copy
          <Download size={16} />
        </button>
        <p className="form-status" role="status">
          {status}
        </p>
      </div>
    );
  if (stage === "review")
    return (
      <div ref={review} tabIndex={-1} className="brief-review">
        <p className="eyebrow">A considered starting point</p>
        <h2>
          Your space,
          <br />
          <em>in a few words.</em>
        </h2>
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
            <dt>Space & light</dt>
            <dd>
              {brief.space} · {brief.light}
            </dd>
          </div>
          <div>
            <dt>Greenery</dt>
            <dd>{brief.plant || "Open to suggestions"}</dd>
          </div>
        </dl>
        <p className="brief-message">{brief.message}</p>
        <div className="brief-actions">
          {site.links.contactEndpoint ? (
            <button className="button" disabled={sending} onClick={send}>
              {sending ? "Sending enquiry…" : "Send enquiry"}
              <ArrowUpRight size={16} />
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                downloadBrief(brief);
                setStatus(
                  "Your brief has been downloaded. It has not been sent.",
                );
              }}
            >
              Save project brief
              <Download size={16} />
            </button>
          )}
          <button
            className="edit-brief"
            onClick={() => {
              setStage("edit");
              setStatus("");
            }}
          >
            Edit your details
          </button>
        </div>
        {site.links.contactEndpoint ? (
          <button
            className="brief-save-secondary"
            onClick={() => {
              downloadBrief(brief);
              setStatus("A copy of your brief has been downloaded.");
            }}
          >
            Save a copy
          </button>
        ) : (
          <p className="brief-note">
            Save your brief and share it with your plant studio when you are
            ready.
          </p>
        )}
        {site.links.email && (
          <a
            className="brief-save-secondary"
            href={`mailto:${site.links.email}?subject=${encodeURIComponent("Botanical project enquiry")}&body=${encodeURIComponent(briefText(brief))}`}
          >
            Open in your email app ↗
          </a>
        )}
        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    );
  return (
    <form
      className="enquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        const message = event.currentTarget.elements.namedItem(
          "message",
        ) as HTMLTextAreaElement;
        if (brief.message.trim().length < 15) {
          message.setCustomValidity(
            "Please share at least 15 characters about your space.",
          );
          message.reportValidity();
          return;
        }
        setBrief((current) => ({
          ...current,
          name: current.name.trim(),
          email: current.email.trim(),
          message: current.message.trim(),
        }));
        setStage("review");
      }}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            pattern=".*\S.*"
            value={brief.name}
            onChange={(event) => update("name", event.target.value)}
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
            maxLength={254}
            value={brief.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="alex@example.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Your kind of space
          <select
            name="space"
            value={brief.space}
            onChange={(event) => update("space", event.target.value)}
          >
            {spaces.map((space) => (
              <option key={space.slug}>{space.name}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label>
          The light in your room
          <select
            name="light"
            value={brief.light}
            onChange={(event) => update("light", event.target.value)}
          >
            <option>Not sure yet</option>
            <option>Bright indirect light</option>
            <option>Gentle filtered light</option>
            <option>A darker corner</option>
          </select>
        </label>
      </div>
      <label>
        A plant you have in mind
        <select
          name="plant"
          value={brief.plant}
          onChange={(event) => update("plant", event.target.value)}
        >
          <option value="">Open to suggestions</option>
          {plants.map((plant) => (
            <option key={plant.slug} value={plant.botanical}>
              {plant.botanical}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tell us a little about your space
        <textarea
          name="message"
          rows={5}
          required
          minLength={15}
          maxLength={3000}
          value={brief.message}
          onChange={(event) => {
            event.target.setCustomValidity("");
            update("message", event.target.value);
          }}
          placeholder="The room, the feeling you are after, and anything we should know…"
        />
      </label>
      <label className="consent-label">
        <input
          name="consent"
          type="checkbox"
          required
          checked={brief.consent}
          onChange={(event) => update("consent", event.target.checked)}
        />
        <span>
          I agree to be contacted about this project.{" "}
          <a href={href("/privacy")}>Privacy details</a>
        </span>
      </label>
      <div className="form-submit">
        <button className="button" type="submit">
          Review your enquiry
          <ArrowUpRight size={17} />
        </button>
        <p>
          {site.links.contactEndpoint
            ? "You will review your details before sending."
            : "Prepare a brief to save and share. No details are sent."}
        </p>
      </div>
    </form>
  );
}
