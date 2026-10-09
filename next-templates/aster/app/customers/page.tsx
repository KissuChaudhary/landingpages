import { Story, Perspectives } from "@/components/sections/Stories";
import { Closing } from "@/components/sections/Closing";
import { SectionHead } from "@/components/ui/Primitives";
export const metadata = { title: "A few familiar teams" };
export default function CustomersPage() {
  return (
    <main id="main">
      <section className="customers-intro container">
        <SectionHead
          label="A few familiar teams"
          lines={["Different people.", "One shared conversation."]}
          text="Illustrative perspectives on a support day with a little more room."
          primary
        />
      </section>
      <Story />
      <Perspectives />
      <Closing />
    </main>
  );
}
