import { ArrowDown, Check, Clock3, MessageSquare } from "lucide-react";
import { followups } from "@/data/preview";
import { Avatar } from "@/components/ui/Primitives";
export function FollowupScene() {
  return (
    <div className="followup-scene scene">
      <div className="conversation-card">
        <span className="scene-caption">
          <MessageSquare size={14} />A conversation becomes a next step
        </span>
        <p>“Could you send over the plan for next quarter?”</p>
        <div>
          <Avatar initials="MC" />
          <span>Maya at Layers</span>
          <small>10:42 AM</small>
        </div>
      </div>
      <div className="connector">
        <span />
        <ArrowDown size={16} />
        <span />
      </div>
      <div className="task-list">
        <div className="scene-toolbar">
          <span>
            <i className="status-dot" />
            Your next steps
          </span>
          <span className="scene-caption">
            {followups.filter((item) => !item.done).length} open
          </span>
        </div>
        {followups.map((task) => (
          <div
            className={`task-row ${task.done ? "is-done" : ""}`}
            key={task.title}
          >
            <span className="task-check">
              {task.done && <Check size={12} />}
            </span>
            <div>
              <b>{task.title}</b>
              <small>{task.account}</small>
            </div>
            <span className="task-due">
              <Clock3 size={11} />
              {task.date}
            </span>
            <Avatar initials={task.owner} tone="peach" />
          </div>
        ))}
      </div>
    </div>
  );
}
