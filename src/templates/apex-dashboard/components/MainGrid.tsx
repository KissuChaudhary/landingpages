import { PremiumCard } from "./PremiumCard";
import { RevenueChart } from "./RevenueChart";
import { RecentProjects } from "./RecentProjects";
import { LeadsDonut } from "./LeadsDonut";
import { VisitsChart } from "./VisitsChart";
import { TopClients } from "./TopClients";

export function MainGrid() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left main chart */}
        <div className="xl:col-span-7 h-full">
          <RevenueChart />
        </div>
        {/* Right side list */}
        <div className="xl:col-span-5 h-full">
          <RecentProjects />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bottom row sections */}
        <div className="h-full w-full">
          <LeadsDonut />
        </div>
        <div className="h-full w-full">
          <VisitsChart />
        </div>
        <div className="h-full w-full">
          <TopClients />
        </div>
      </div>
    </div>
  );
}
