import { IntegrationDirectory } from "@/components/IntegrationDirectory";
import { Closing } from "@/components/sections/Closing";
export const metadata = { title: "Connections" };
export default function IntegrationsPage() {
  return (
    <main id="main">
      <IntegrationDirectory />
      <Closing />
    </main>
  );
}
