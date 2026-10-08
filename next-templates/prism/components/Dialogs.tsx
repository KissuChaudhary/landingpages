"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import {
  site,
  type Artwork,
  type HeroLayout,
  type Plan,
  type ThemeName,
} from "@/site.config";
import { asset } from "@/lib/assets";
import { Modal } from "@/components/ui/Modal";
import { Workspace } from "@/components/product/Workspace";
import { usePrism } from "@/components/PrismProvider";

export function Dialogs() {
  const { dialog, setDialog } = usePrism();
  if (!dialog) return null;
  const close = () => setDialog(null);
  if (dialog.kind === "workspace")
    return (
      <Modal
        key="workspace"
        title={site.workspace.title}
        onClose={close}
        className="workspace-modal"
      >
        <Workspace initial={dialog.artwork} compact />
        <p className="modal-note">
          Try a preset or edit the prompt. This preview shows example artwork.
        </p>
      </Modal>
    );
  if (dialog.kind === "gallery")
    return (
      <Modal
        key="gallery"
        title="The possibility index"
        onClose={close}
        className="gallery-modal"
      >
        <GalleryDetail artwork={dialog.artwork} />
      </Modal>
    );
  if (dialog.kind === "plan")
    return (
      <Modal
        key="plan"
        title="Your creative plan"
        onClose={close}
        className="plan-modal"
      >
        <PlanDetail plan={dialog.plan} annual={dialog.annual} />
      </Modal>
    );
  return (
    <Modal
      key="settings"
      title="Make it your own"
      onClose={close}
      className="settings-modal"
    >
      <Appearance />
    </Modal>
  );
}

function GalleryDetail({ artwork }: { artwork: Artwork }) {
  const { start } = usePrism();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(artwork.prompt);
      setCopied(true);
      setError("");
    } catch {
      setError("Select the visible prompt to copy it manually.");
    }
  }
  return (
    <div className="gallery-detail">
      <img
        className="detail-art"
        src={asset(`/images/${artwork.image}.webp`)}
        alt={artwork.alt}
        width="1200"
        height="1200"
      />
      <div className="detail-copy">
        <span className="eyebrow">{artwork.category}</span>
        <h2>{artwork.title}</h2>
        <div className="detail-tags">
          <span>{artwork.style}</span>
          <span>1:1</span>
          <span>Example art</span>
        </div>
        <p className="mono prompt-heading">THE IDEA</p>
        <p className="detail-prompt">{artwork.prompt}</p>
        <div className="detail-actions">
          <button
            className="button button-primary"
            onClick={() => start(artwork)}
          >
            Use this idea
            <ArrowUpRight size={16} />
          </button>
          <button className="button button-outline" onClick={copy}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <p className="modal-note" role="status">
          {error ||
            "Original demo artwork. Explore this preset in the workspace."}
        </p>
      </div>
    </div>
  );
}
function PlanDetail({ plan, annual }: { plan: Plan; annual: boolean }) {
  const { start } = usePrism();
  const amount = annual ? plan.annualMonthly : plan.monthly;
  return (
    <div className="plan-detail">
      <span className="plan-detail-icon">
        <Sparkles size={26} />
      </span>
      <h2>
        A little more room
        <br />
        for your imagination.
      </h2>
      <p>You selected the {plan.name} example plan.</p>
      <dl>
        <div>
          <dt>Plan</dt>
          <dd>{plan.name}</dd>
        </div>
        <div>
          <dt>Allowance</dt>
          <dd>{plan.credits}</dd>
        </div>
        <div>
          <dt>Billing</dt>
          <dd>{amount === 0 ? "Free" : annual ? "Yearly" : "Monthly"}</dd>
        </div>
        <div className="plan-total">
          <dt>
            {amount === 0 ? "Total" : annual ? "Annual total" : "Monthly total"}
          </dt>
          <dd>
            {site.pricing.currency}
            {annual ? amount * 12 : amount}
          </dd>
        </div>
      </dl>
      <p className="modal-note">
        This is a plan preview. No account is created and no payment is
        collected.
      </p>
      <button className="button button-primary" onClick={() => start()}>
        Try the workspace
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
function Appearance() {
  const { theme, layout, setTheme, setLayout } = usePrism();
  const themes: {
    id: ThemeName;
    name: string;
    description: string;
    colours: string[];
  }[] = [
    {
      id: "graphite",
      name: "Graphite",
      description: "Dark surfaces. Electric violet.",
      colours: ["#101015", "#292832", "#b29aff"],
    },
    {
      id: "paper",
      name: "Paper",
      description: "Clean white. Clear cobalt.",
      colours: ["#f8f9fc", "#dce3f4", "#345bd8"],
    },
    {
      id: "studio",
      name: "Studio",
      description: "Warm stone. Confident coral.",
      colours: ["#f5f1ea", "#e1d9ce", "#bf492d"],
    },
  ];
  const layouts: { id: HeroLayout; name: string }[] = [
    { id: "centered", name: "Centered launch" },
    { id: "split", name: "Split editorial" },
  ];
  return (
    <div className="appearance-panel">
      <h2>A different point of view.</h2>
      <p>Three complete palettes. Two ways to make an entrance.</p>
      <h3>Visual theme</h3>
      <div className="theme-options" role="group" aria-label="Visual theme">
        {themes.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={theme === option.id}
            onClick={() => setTheme(option.id)}
          >
            <span className="theme-swatch">
              {option.colours.map((colour) => (
                <i key={colour} style={{ background: colour }} />
              ))}
            </span>
            <span>
              <strong>{option.name}</strong>
              <span>{option.description}</span>
            </span>
            {theme === option.id && <Check size={17} />}
          </button>
        ))}
      </div>
      <h3>Hero composition</h3>
      <div
        className="layout-options"
        role="group"
        aria-label="Hero composition"
      >
        {layouts.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={layout === option.id}
            onClick={() => setLayout(option.id)}
          >
            <span
              className={`layout-drawing layout-${option.id}`}
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>
            {option.name}
            {layout === option.id && <Check size={14} />}
          </button>
        ))}
      </div>
      <p className="modal-note">
        Preferences stay in this browser. Every section follows the selected
        palette.
      </p>
    </div>
  );
}
