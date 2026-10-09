"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/site.config";
import { integrations } from "@/data/integrations";
import { money } from "@/data/campaigns";
import { href } from "@/lib/urls";
import { Modal } from "./ui/Modal";
import { Report } from "./product/Report";
import { Dashboard } from "./product/Dashboard";
type DialogState =
  | { type: "report"; question: string }
  | { type: "tour" }
  | { type: "plan"; plan: number; annual: boolean }
  | { type: "integration"; id: string }
  | null;
const Context = createContext({
  open: (_state: Exclude<DialogState, null>) => {},
});
export const useExperience = () => useContext(Context);
export function Experience({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null);
  const plan = dialog?.type === "plan" ? site.plans[dialog.plan] : null;
  const integration =
    dialog?.type === "integration"
      ? integrations.find((i) => i.id === dialog.id)
      : null;
  const title =
    dialog?.type === "report"
      ? "Your campaign review"
      : dialog?.type === "tour"
        ? "Explore the workspace"
        : plan
          ? `${plan.name} plan review`
          : integration
            ? integration.name
            : "";
  return (
    <Context.Provider value={{ open: setDialog }}>
      {children}
      {dialog && (
        <Modal
          key={dialog.type}
          title={title}
          onClose={() => setDialog(null)}
          wide={dialog.type === "tour" || dialog.type === "report"}
        >
          {dialog.type === "report" && <Report question={dialog.question} />}
          {dialog.type === "tour" && (
            <div className="tour-dialog">
              <p className="eyebrow">A working local preview</p>
              <h2>A place for the whole picture.</h2>
              <p>
                Switch channels and periods. Export the campaign data whenever
                you need it.
              </p>
              <Dashboard interactive />
            </div>
          )}
          {plan && dialog.type === "plan" && (
            <div className="plan-review">
              <p className="eyebrow">Your starting point</p>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <strong>
                {money(dialog.annual ? plan.annual * 12 : plan.monthly)}
                <span>
                  {" "}
                  /{" "}
                  {plan.monthly === 0
                    ? "free"
                    : dialog.annual
                      ? "year"
                      : "month"}
                </span>
              </strong>
              <p>
                {plan.monthly === 0
                  ? "Explore the example workspace for free."
                  : dialog.annual
                    ? `${money(plan.annual)} per month, billed as ${money(plan.annual * 12)} once a year.`
                    : "Billed monthly. The yearly option is available on the pricing page."}
              </p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className="button button-dark"
                href={
                  plan.checkout[dialog.annual ? "annual" : "monthly"] ||
                  href("/contact")
                }
              >
                {plan.checkout[dialog.annual ? "annual" : "monthly"]
                  ? "Continue to checkout"
                  : "Discuss this plan"}
                <ArrowUpRight size={15} />
              </a>
              <small>
                {plan.checkout[dialog.annual ? "annual" : "monthly"]
                  ? "Your configured provider handles checkout."
                  : "Example plan review. No account is created or payment collected."}
              </small>
            </div>
          )}
          {integration && (
            <div className="integration-review">
              <p className="eyebrow">Connection blueprint</p>
              <h2>{integration.name}</h2>
              <p>{integration.description}</p>
              <h3>Suggested data scope</h3>
              <ul>
                {integration.fields.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="quiet-note">
                This is an example connection guide. Configure your own
                provider, authentication and access scope before connecting a
                live account.
              </p>
              <a className="button button-dark" href={href("/contact")}>
                Plan your connection
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </Modal>
      )}
    </Context.Provider>
  );
}
export function StartButton({
  children = site.hero.primary,
  light = false,
}: {
  children?: ReactNode;
  light?: boolean;
}) {
  const { open } = useExperience();
  return site.links.app ? (
    <a
      className={`button ${light ? "button-light" : "button-dark"}`}
      href={site.links.app}
    >
      {children}
    </a>
  ) : (
    <button
      className={`button ${light ? "button-light" : "button-dark"}`}
      onClick={() => open({ type: "report", question: site.hero.prompt })}
    >
      {children}
    </button>
  );
}
