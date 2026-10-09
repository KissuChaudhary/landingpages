import { SectionHead } from "@/components/ui/Primitives";
import { IntegrationDirectory } from "@/components/pages/IntegrationDirectory";
export const metadata = { title: "Connections" };
export default function IntegrationsPage() {
  return (
    <main id="main" className="container directory-page">
      <SectionHead
        label="Bring your world in"
        lines={["The right context.", "In one shared space."]}
        text="Explore the creative tools and project workflows you can bring into your review space."
        primary
      />
      <IntegrationDirectory />
    </main>
  );
}
