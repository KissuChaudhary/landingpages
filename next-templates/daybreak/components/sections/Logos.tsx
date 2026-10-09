import { teams } from "@/data/teams";
import { CompanyMark } from "../ui/Brand";
export function Logos() {
  return (
    <div className="logo-strip">
      <div>
        {teams.map((t) => (
          <span key={t.name}>
            <CompanyMark kind={t.mark} />
            {t.name}
          </span>
        ))}
      </div>
      <p>A few fictional teams, to make the workspace feel familiar.</p>
    </div>
  );
}
