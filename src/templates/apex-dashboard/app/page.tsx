import { DashboardHeader } from "@/templates/apex-dashboard/components/DashboardHeader";
import { MetricsRow } from "@/templates/apex-dashboard/components/MetricsRow";
import { MainGrid } from "@/templates/apex-dashboard/components/MainGrid";
import { DashboardLayout } from "@/templates/apex-dashboard/components/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <MetricsRow />
      <MainGrid />
    </DashboardLayout>
  );
}
