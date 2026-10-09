"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Download, X } from "lucide-react";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
import { stories } from "@/data/stories";
import { site } from "@/site.config";
import { planQuote } from "@/lib/billing";
import { route } from "@/lib/urls";
import { Button, Label } from "./Primitives";
export type OverlayValue =
  | { kind: "blueprint"; key: BlueprintKey }
  | { kind: "story"; index: number }
  | { kind: "plan"; index: number; annual: boolean };
export function Overlay({
  value,
  close,
}: {
  value: OverlayValue | null;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [download, setDownload] = useState("");
  useEffect(() => {
    if (value) {
      ref.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      ref.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [value]);
  useEffect(() => {
    if (!value || value.kind !== "blueprint") {
      setDownload("");
      return;
    }
    const url = URL.createObjectURL(
      new Blob(
        [JSON.stringify({ example: true, ...blueprints[value.key] }, null, 2)],
        { type: "application/json" },
      ),
    );
    setDownload(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);
  return (
    <dialog
      ref={ref}
      className="overlay"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="overlay-body">
        <button
          className="close-dialog"
          aria-label="Close dialog"
          onClick={close}
        >
          <X size={22} />
        </button>
        {value?.kind === "blueprint" && (
          <>
            <Label>Example blueprint</Label>
            <h2 id="dialog-title">{blueprints[value.key].name}</h2>
            <p>{blueprints[value.key].prompt}</p>
            <ol className="dialog-steps">
              {blueprints[value.key].steps.map((step) => (
                <li key={step}>
                  <Check size={16} />
                  {step}
                </li>
              ))}
            </ol>
            <div className="dialog-note">
              <strong>Decision boundary</strong>
              <p>{blueprints[value.key].rule}</p>
            </div>
            <p className="fine-print">
              A local example. No tools are connected and no external actions
              are taken.
            </p>
            <a
              className="button button-solid"
              href={download || undefined}
              download={`conduit-${value.key}-blueprint.json`}
            >
              <Download size={17} />
              Export blueprint
            </a>
          </>
        )}
        {value?.kind === "story" && (
          <>
            <Label>Illustrative workflow story</Label>
            <h2 id="dialog-title">{stories[value.index].title}</h2>
            <p>{stories[value.index].details}</p>
            <div className="dialog-note">
              <strong>
                {stories[value.index].stat} · {stories[value.index].metric}
              </strong>
            </div>
            <p className="fine-print">
              Fictional example identity and editorial commentary, not a
              customer testimonial.
            </p>
            <Button href={`${route("/")}#solution`}>Try the examples</Button>
          </>
        )}
        {value?.kind === "plan" &&
          (() => {
            const plan = site.pricing.plans[value.index];
            const quote = planQuote(plan, value.annual);
            const price = quote.monthlyRate;
            return (
              <>
                <Label>Plan review</Label>
                <h2 id="dialog-title">{plan.name}</h2>
                <p>{plan.description}</p>
                <p className="review-price">
                  ${price}
                  <span> / month</span>
                </p>
                <p>
                  {price === 0
                    ? "Free to explore."
                    : value.annual
                      ? `$${quote.due} billed annually.`
                      : `$${price} billed monthly.`}
                </p>
                <ul className="dialog-steps">
                  {plan.features.map((item) => (
                    <li key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="fine-print">
                  This is a template preview. No payment is collected and no
                  account is created. Connect your checkout destination to
                  enable purchases.
                </p>
                <Button href={route("/contact")}>Discuss this plan</Button>
              </>
            );
          })()}
      </div>
    </dialog>
  );
}
