"use client";
import { ArrowUpRight, Check, Braces } from "lucide-react";
import { usePatch } from "./PatchProvider";
import { Modal } from "./ui/Modal";
import { CommandMenu } from "./CommandMenu";
import { examples } from "@/data/examples";
import { site } from "@/site.config";
export function Dialogs() {
  const { dialog, close, explore } = usePatch();
  if (!dialog) return null;
  if (dialog.type === "command")
    return (
      <Modal
        title={site.dialogs.command.title}
        onClose={close}
        className="command-modal"
      >
        <CommandMenu />
      </Modal>
    );
  if (dialog.type === "app") {
    const content = site.dialogs.app;
    return (
      <Modal title={content.label} onClose={close}>
        <h2>{content.title}</h2>
        <p className="modal-description">{content.description}</p>
        <div className="app-example-list">
          {examples.map((example) => (
            <button key={example.id} onClick={() => explore(example.id)}>
              <Braces size={18} />
              <div>
                <strong>{example.label}</strong>
                <span>{example.file}</span>
              </div>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <p className="modal-note">{content.note}</p>
        <button className="text-link" onClick={close}>
          {site.actions.close} ↗
        </button>
      </Modal>
    );
  }
  const { plan, yearly } = dialog;
  const content = site.dialogs.plan;
  return (
    <Modal title={content.label} onClose={close}>
      <h2>{plan.name}</h2>
      <p className="modal-description">{plan.description}</p>
      <div className="modal-plan-total">
        <div>
          <span>{content.total}</span>
          <strong>${yearly ? plan.yearly : plan.monthly}</strong>
        </div>
        <span>
          {plan.monthly === 0
            ? content.free
            : yearly
              ? content.yearly
              : content.monthly}
        </span>
      </div>
      <ul className="modal-plan-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={14} />
            {feature}
          </li>
        ))}
      </ul>
      <p className="modal-note">{content.note}</p>
      <button
        className="button button-accent"
        onClick={() => explore("signup")}
      >
        {content.action}
        <ArrowUpRight size={16} />
      </button>
      <button className="text-link modal-close-link" onClick={close}>
        {site.actions.close} ↗
      </button>
    </Modal>
  );
}
