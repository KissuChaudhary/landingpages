import { teams } from "@/data/teams";
import { TeamMark } from "../ui/Brand";
export function Logos({ small = false }: { small?: boolean }) {
  return (
    <div className={`logos container ${small ? "logos-small" : ""}`}>
      <div className="logo-row" aria-label="Four fictional example teams">
        {teams.map((t) => (
          <span key={t.name}>
            <TeamMark type={t.mark} />
            {t.name}
          </span>
        ))}
      </div>
      {!small && (
        <p className="small-note">
          A few fictional teams, to make the workspace feel familiar.
        </p>
      )}
    </div>
  );
}
