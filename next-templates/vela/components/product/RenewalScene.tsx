import { ArrowUpRight } from "lucide-react";
import { accounts } from "@/data/preview";
import { NumberRoll } from "@/components/ui/NumberRoll";
import { Avatar } from "@/components/ui/Primitives";
export function RenewalScene() {
  return (
    <div className="renewal-scene scene">
      <div className="scene-toolbar">
        <span>
          <i className="status-dot" />A clearer horizon
        </span>
        <span className="scene-caption">Next 90 days</span>
      </div>
      <div className="renewal-summary">
        <div>
          <small>Renewal value in focus</small>
          <strong>
            <NumberRoll value={54000} prefix="$" countIn />
          </strong>
        </div>
        <span className="growth-pill">
          <ArrowUpRight size={13} />3 conversations ahead
        </span>
      </div>
      <div className="renewal-timeline">
        <div className="timeline-months">
          <span>July</span>
          <span>August</span>
          <span>September</span>
        </div>
        {accounts.map((account, index) => (
          <div className="renewal-lane" key={account.name}>
            <div
              className={`renewal-chip tone-${account.color}`}
              style={{ marginLeft: `${12 + index * 15}%` }}
            >
              <Avatar initials={account.initials} tone={account.color} />
              <b>{account.name}</b>
              <span>{account.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="renewal-bottom">
        <span className="healthy health-pill">
          <i />
          Keep the conversation going
        </span>
        <span>Context before the calendar</span>
      </div>
    </div>
  );
}
