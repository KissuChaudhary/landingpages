"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { calculateQuote, money } from "@/lib/quote";
import { createBrief, type ContactDetails } from "@/lib/brief";
import { useBrief } from "@/components/BriefProvider";
import { BrandMark } from "@/components/ui/Brand";
import { BriefReview } from "./BriefReview";

const emptyDetails: ContactDetails = {
  name: "",
  email: "",
  brand: "",
  deadline: "",
  message: "",
};

export function Contact() {
  const { options } = useBrief();
  const quote = calculateQuote(options);
  const [details, setDetails] = useState<ContactDetails>(emptyDetails);
  const [prepared, setPrepared] = useState<{
    details: ContactDetails;
    brief: string;
  } | null>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (prepared)
      reviewRef.current?.querySelector<HTMLElement>(".brief-review")?.focus();
  }, [prepared]);
  const field = (key: keyof ContactDetails) => ({
    value: details[key],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setDetails((current) => ({ ...current, [key]: event.target.value })),
  });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = Object.fromEntries(
      Object.entries(details).map(([key, value]) => [key, value.trim()]),
    ) as unknown as ContactDetails;
    // Native constraints handle format and length; this also rejects whitespace-only values.
    for (const key of ["name", "brand", "message"] as const) {
      if (!clean[key]) {
        const input = event.currentTarget.elements.namedItem(
          key,
        ) as HTMLInputElement;
        input.setCustomValidity("Please add a little detail here.");
        input.reportValidity();
        return;
      }
    }
    setPrepared({ details: clean, brief: createBrief(clean, options) });
  };
  const edit = () => {
    setPrepared(null);
    requestAnimationFrame(() => nameRef.current?.focus());
  };
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">{site.contact.eyebrow}</p>
          <h2>
            {site.contact.lead}
            <br />
            <em>{site.contact.accent}</em>
          </h2>
          <p>{site.contact.description}</p>
          <div className="contact-email">
            <span>{site.contact.note}</span>
            <a href={`mailto:${site.brand.email}`}>
              {site.brand.email}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <BrandMark className="contact-star" />
          <p className="contact-response">{site.contact.response}</p>
        </div>
        <div className="contact-form-panel" ref={reviewRef}>
          {prepared ? (
            <BriefReview {...prepared} onEdit={edit} />
          ) : (
            <form
              onSubmit={submit}
              onInput={(event) => {
                const target = event.target as HTMLInputElement;
                if (target.setCustomValidity) target.setCustomValidity("");
              }}
            >
              <div className="form-title">
                <p className="eyebrow">A few details to start</p>
                <span className="eyebrow">Project enquiry</span>
              </div>
              <div className="form-row">
                <label htmlFor="brief-name">
                  Your name
                  <input
                    ref={nameRef}
                    id="brief-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Alex Morgan"
                    {...field("name")}
                  />
                </label>
                <label htmlFor="brief-email">
                  Email address
                  <input
                    id="brief-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={180}
                    placeholder="alex@yourbrand.com"
                    {...field("email")}
                  />
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="brief-brand">
                  Brand / company
                  <input
                    id="brief-brand"
                    name="brand"
                    autoComplete="organization"
                    required
                    maxLength={120}
                    placeholder="Your brand name"
                    {...field("brand")}
                  />
                </label>
                <label htmlFor="brief-deadline">
                  Target launch date <span>(optional)</span>
                  <input
                    id="brief-deadline"
                    name="deadline"
                    type="date"
                    {...field("deadline")}
                  />
                </label>
              </div>
              <label htmlFor="brief-message">
                A little about your project
                <textarea
                  id="brief-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={1600}
                  rows={4}
                  placeholder="What are you making? Where will the images live? Tell us what you have in mind."
                  {...field("message")}
                />
              </label>
              <div className="form-estimate">
                <div>
                  <span className="eyebrow">From your shoot planner</span>
                  <p>
                    {quote.format.name} · {quote.products}{" "}
                    {quote.products === 1 ? "product" : "products"} ·{" "}
                    {quote.images} images
                  </p>
                </div>
                <strong>{money(quote.total)}</strong>
                <a href="#investment">Adjust ↗</a>
              </div>
              <button type="submit" className="button">
                {site.contact.submit}
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <p className="form-note">
                Review your brief before sharing it. Your details stay in this
                browser until you choose to email them.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
