import { ArrowUpRight, ChevronDown } from "lucide-react";
import { accounts } from "@/data/preview";
import { Avatar } from "@/components/ui/Primitives";
export function AccountScene() {
  return (
    <div className="account-scene scene">
      <div className="scene-toolbar">
        <span>
          <i className="status-dot" />
          Account overview
        </span>
        <span className="scene-caption">
          3 in focus <ChevronDown size={12} />
        </span>
      </div>
      <div className="account-columns">
        <span>Company</span>
        <span>Relationship</span>
        <span>Renewal</span>
      </div>
      {accounts.map((account) => (
        <div className="account-row" key={account.name}>
          <div className="account-company">
            <Avatar initials={account.initials} tone={account.color} />
            <div>
              <b>{account.name}</b>
              <small>{account.person}</small>
            </div>
          </div>
          <span
            className={`health-pill ${account.health === "Healthy" ? "healthy" : "check-in"}`}
          >
            <i />
            {account.health}
          </span>
          <span className="renewal-date">
            {account.date}
            <ArrowUpRight size={13} />
          </span>
        </div>
      ))}
      <div className="account-detail">
        <div className="account-detail-top">
          <Avatar initials="MC" />
          <div>
            <b>Maya Chen</b>
            <small>Client director · Layers</small>
          </div>
          <span className="detail-label">Latest conversation</span>
        </div>
        <p>
          “The launch went well. Let’s talk about what the next quarter could
          look like.”
        </p>
        <div className="detail-footer">
          <span>Conversation saved to Layers</span>
          <span>
            <i className="status-dot" />
            Shared with the team
          </span>
        </div>
      </div>
    </div>
  );
}
