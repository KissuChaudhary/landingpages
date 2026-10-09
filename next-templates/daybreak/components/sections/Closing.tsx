import { site } from "@/site.config";
import { asset, href } from "@/lib/urls";
import { StartButton } from "../Experience";
import { Frame, SectionHead } from "../ui/Primitives";
export function Closing() {
  return (
    <Frame className="closing-section">
      <div className="closing-art">
        <div className="closing-grid" aria-hidden="true" />
        <img
          src={asset("/images/hero.webp")}
          alt="A calm painted hillside looking toward the sea"
          width="1536"
          height="1024"
          loading="lazy"
        />
      </div>
      <div className="section-inner closing-copy">
        <SectionHead
          label={site.closing.label}
          title={site.closing.heading}
          text={site.closing.text}
          align="left"
        />
        <div className="closing-actions">
          <StartButton />
          <a className="button button-light" href={href("/contact")}>
            Talk to us
          </a>
        </div>
      </div>
    </Frame>
  );
}
