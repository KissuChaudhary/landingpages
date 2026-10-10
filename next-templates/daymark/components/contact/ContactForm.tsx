"use client";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Arrow } from "../ui/Arrow";
import { useBrief } from "./useBrief";
import { BriefFields } from "./BriefFields";
import { BriefResult } from "./BriefResult";
export function ContactForm() {
  const { brief, status, update, submit } = useBrief();
  return (
    <form className="contact-form" onSubmit={submit}>
      <BriefFields
        brief={brief}
        update={update}
        disabled={status === "sending"}
      />
      <div className="form-foot">
        <p>
          We will use these details to discuss your enquiry.{" "}
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
      <BriefResult brief={brief} status={status} />
      <noscript>
        <p>
          To share a brief without JavaScript, email{" "}
          <a href={"mailto:" + site.email}>{site.email}</a>.
        </p>
      </noscript>
    </form>
  );
}
