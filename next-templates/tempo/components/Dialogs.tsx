"use client";
import { ArrowUpRight, Check, Monitor, Smartphone } from "lucide-react";
import { site } from "@/site.config";
import { useTempo } from "./TempoProvider";
import { TempoMark } from "./ui/Brand";
import { Modal } from "./ui/Modal";

export function Dialogs() {
  const { dialog, close, session } = useTempo();
  if (!dialog) return null;
  if (dialog.type === "plan") {
    const { plan, yearly } = dialog;
    return (
      <Modal title="A little room for you" onClose={close}>
        <div className="plan-summary">
          <span className="dialog-flower" aria-hidden="true">
            ✳
          </span>
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
          <div className="summary-price">
            ${yearly ? plan.yearly / 12 : plan.monthly}
            <span> / month</span>
          </div>
          <p className="summary-billing">
            {plan.monthly === 0
              ? "Free membership"
              : yearly
                ? `$${plan.yearly} total · billed yearly`
                : `$${plan.monthly} total · billed monthly`}
          </p>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={14} />
                {feature}
              </li>
            ))}
          </ul>
          <p className="dialog-disclosure">
            This is an example membership. No account is created and no payment
            is collected.
          </p>
          <button className="button button-forest" onClick={close}>
            Keep exploring
            <ArrowUpRight size={15} />
          </button>
        </div>
      </Modal>
    );
  }
  const links = [
    {
      name: "App Store",
      href: site.links.ios,
      label: "For iPhone",
      icon: Smartphone,
    },
    {
      name: "Google Play",
      href: site.links.android,
      label: "For Android",
      icon: Smartphone,
    },
    {
      name: "Web app",
      href: site.links.app,
      label: "In your browser",
      icon: Monitor,
    },
  ];
  return (
    <Modal title="Find your little rhythm" onClose={close}>
      <div className="app-dialog">
        <span className="dialog-app-icon">
          <TempoMark />
        </span>
        <h2>
          A little space.
          <br />
          <em>Wherever you are.</em>
        </h2>
        <p>
          Tempo is a fictional app preview. Try the timer, routines and
          reflection right here.
        </p>
        <div className="store-links">
          {links.map(({ name, href, label, icon: Icon }) =>
            href ? (
              <a className="store-link" key={name} href={href}>
                <Icon size={22} />
                <span>
                  <small>{label}</small>
                  <strong>{name}</strong>
                </span>
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <div className="store-link unavailable" key={name}>
                <Icon size={22} />
                <span>
                  <small>{label}</small>
                  <strong>{name}</strong>
                </span>
                <span className="store-demo">Demo</span>
              </div>
            ),
          )}
        </div>
        <button
          className="button button-forest"
          onClick={() => {
            if (!session.running) session.toggle();
            close();
            document
              .getElementById("focus-demo")
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          Try a {session.minutes}-minute focus session
          <ArrowUpRight size={15} />
        </button>
        <p className="dialog-disclosure">
          A working local preview. No download or account needed.
        </p>
      </div>
    </Modal>
  );
}
