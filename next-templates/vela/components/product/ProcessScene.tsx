import {
  ArrowDown,
  Check,
  CheckCheck,
  ContactRound,
  Flag,
  Mail,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/ui/Primitives";
import { accounts } from "@/data/preview";
import { TextMorph } from "@/components/ui/TextMorph";
export function ProcessScene({ step }: { step: number }) {
  return (
    <div className="process-scene">
      <div className="process-scene-caption">
        <span>
          <i className="status-dot" />
          <TextMorph>
            {
              [
                "Contacts, connected",
                "A workflow that fits",
                "Your next step, in view",
              ][step]
            }
          </TextMorph>
        </span>
        <span>0{step + 1} / 03</span>
      </div>
      <div className="process-stage" key={step}>
        {step === 0 && (
          <>
            <div className="source-tiles">
              <span>
                <Mail size={19} />
                Conversations
              </span>
              <span>
                <ContactRound size={19} />
                Contacts
              </span>
              <span>
                <Users size={19} />
                Your team
              </span>
            </div>
            <div className="process-connector">
              <ArrowDown size={18} />
            </div>
            <div className="process-account">
              <span className="small-ui-title">
                One shared account list
                <CheckCheck size={15} />
              </span>
              {accounts.map((account) => (
                <div key={account.name}>
                  <Avatar initials={account.initials} tone={account.color} />
                  <b>{account.name}</b>
                  <span>{account.person}</span>
                  <Check size={13} />
                </div>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="stage-rail">
              <span>First hello</span>
              <i />
              <span className="selected-stage">Working together</span>
              <i />
              <span>What’s next</span>
            </div>
            <div className="workflow-card">
              <span className="small-ui-title">
                <Flag size={14} />
                When a project wraps up
              </span>
              <div className="workflow-action">
                <span className="workflow-line" />
                <span>
                  <Check size={14} />
                  Create a check-in
                </span>
                <span>
                  <Users size={14} />
                  Assign the account owner
                </span>
                <span>
                  <Mail size={14} />
                  Keep the team in the loop
                </span>
              </div>
              <small>A shared rhythm, without the guesswork.</small>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="next-step-card">
              <span className="small-ui-title">
                Your next conversation
                <span className="healthy health-pill">
                  <i />
                  Ready
                </span>
              </span>
              <div className="next-step-person">
                <Avatar initials="MC" />
                <div>
                  <b>Maya at Layers</b>
                  <small>Quarterly check-in · Thursday, 10:00</small>
                </div>
              </div>
              <p>
                Review the launch, share the next-quarter plan and talk about
                the renewal ahead.
              </p>
              <div className="next-step-context">
                <span>
                  <Check size={12} />
                  Latest conversation
                </span>
                <span>
                  <Check size={12} />
                  Project context
                </span>
                <span>
                  <Check size={12} />
                  Renewal date
                </span>
              </div>
              <div className="next-step-footer">
                <span>Everything you need, together.</span>
                <CheckCheck size={16} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="process-progress" aria-hidden="true">
        <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>
    </div>
  );
}
