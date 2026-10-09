import { Story, Perspectives } from "@/components/sections/Stories";
import { Closing } from "@/components/sections/Closing";
import { SectionHead } from "@/components/ui/Primitives";
export const metadata = { title: "Inside creative practices" };
export default function StudiosPage() {
  return (
    <main id="main">
      <section className="studios-intro container">
        <SectionHead
          label="Inside creative practices"
          lines={["Different disciplines.", "A considered process."]}
          text="Illustrative perspectives from creative practices working toward a shared direction."
          primary
        />
      </section>
      <Story />
      <Perspectives />
      <Closing />
    </main>
  );
}
