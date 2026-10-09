import { SectionHead } from "@/components/ui/Primitives";
import { IntegrationDirectory } from "@/components/pages/IntegrationDirectory";
export const metadata = { title: "Connections" };
export default function IntegrationsPage() {
  return (
    <main id="main" className="container directory-page">
      <SectionHead
        label="Bring your world in"
        lines={["The right context.", "In one shared space."]}
        text="Explore the sources and channels that can shape your support workspace."
        primary
      />
      <IntegrationDirectory />
    </main>
  );
}
