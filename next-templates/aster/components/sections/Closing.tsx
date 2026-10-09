import { site } from "@/site.config";
import { SectionHead, AppButton, Art } from "../ui/Primitives";
import { InboxPreview } from "../product/InboxPreview";
export function Closing() {
  return (
    <section className="closing section container">
      <div className="closing-copy">
        <SectionHead
          label={site.closing.label}
          lines={site.closing.heading}
          text={site.closing.text}
        />
        <AppButton>{site.closing.cta}</AppButton>
      </div>
      <div className="closing-stage">
        <Art name="blossom" />
        <div className="closing-inbox">
          <InboxPreview compact />
        </div>
      </div>
    </section>
  );
}
