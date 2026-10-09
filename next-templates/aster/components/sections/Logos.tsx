import { teams } from "@/data/teams";
import { TeamMark } from "../ui/Brand";
export function Logos({ small = false }: { small?: boolean }) {
  return (
    <div className={`logos container ${small ? "logos-small" : ""}`}>
      <div className="logo-row" aria-label="Four fictional creative studios">
        {teams.map((t) => (
          <span key={t.name}>
            <TeamMark type={t.mark} />
            {t.name}
          </span>
        ))}
      </div>
      {!small && (
        <p className="small-note">
          An example review space for studios of every shape.
        </p>
      )}
    </div>
  );
}
