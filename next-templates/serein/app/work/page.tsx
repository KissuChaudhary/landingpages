import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "A selection of brand identities, digital experiences and creative collaborations.",
};
export default function WorkPage() {
  return (
    <main id="main">
      <div className="page-intro container">
        <SectionHeading
          as="h1"
          label="Selected work"
          title={"Different ambitions.\nA shared point of view."}
          description="Identity, digital and the details in between."
        />
      </div>
      <section className="container work-page">
        <ProjectGrid />
      </section>
      <Closing />
    </main>
  );
}
