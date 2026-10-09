import { Braces, Eye, GitPullRequest, PackageOpen } from "lucide-react";
import { site } from "@/site.config";
import { GridIntersections } from "@/components/ui/Grid";
const icons = [Braces, GitPullRequest, Eye, PackageOpen];
export function Capabilities() {
  return (
    <div className="capability-strip">
      <GridIntersections />
      {site.capabilities.map((item, index) => {
        const Icon = icons[index];
        return (
          <div className="capability-cell" key={item.title}>
            <span className="capability-icon">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
