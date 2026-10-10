import { site } from "@/site.config";
import { briefText, emailDraft, type Brief } from "@/lib/contact";
import { Arrow } from "../ui/Arrow";
import type { BriefStatus } from "./useBrief";
export function BriefResult({
  brief,
  status,
}: {
  brief: Brief;
  status: BriefStatus;
}) {
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([briefText(brief, site.brand)], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-brief.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="form-status" aria-live="polite" role="status">
      {status === "ready" && (
        <>
          <h3>Your next move, ready.</h3>
          <p>
            Your brief is prepared. Open the draft to send it from your email
            app, or download a complete copy.
          </p>
          <div>
            <a
              className="text-link"
              href={emailDraft(site.email, brief, site.brand)}
            >
              Open email draft
              <Arrow />
            </a>
            <button type="button" className="download-link" onClick={download}>
              Download your brief
            </button>
          </div>
        </>
      )}
      {status === "sent" && (
        <>
          <h3>Thanks for starting the conversation.</h3>
          <p>
            Your brief was accepted. We will reply using the email address you
            provided.
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <h3>We couldn't send that just yet.</h3>
          <p>
            Your details are still here. Try again, or{" "}
            <a href={emailDraft(site.email, brief, site.brand)}>
              send your complete brief by email
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
