import { ArrowUpRight } from "lucide-react";
import { asset, href } from "@/lib/urls";
import { Frame } from "../ui/Primitives";
export function Workspace() {
  return (
    <Frame className="workspace-section" id="demo">
      <div className="workspace-caption">
        <p className="eyebrow">The whole picture, together</p>
        <a className="text-button" href={href("/integrations")}>
          See what it connects to
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="workspace-landscape">
        <img
          src={asset("/images/landscape.webp")}
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
        />
        {/* The dashboard is a picture: a full layout on wide screens, its own phone layout on small ones. */}
        <picture className="workspace-preview" data-reveal>
          <source
            media="(max-width: 700px)"
            srcSet={asset("/images/dashboard-phone.webp")}
            width="1080"
            height="1452"
          />
          <img
            src={asset("/images/dashboard.webp")}
            alt="The Daybreak overview: attributed revenue, return on spend, conversions and spend for the month, a conversion trend, spend by channel and a table of five campaigns."
            width="2540"
            height="1486"
            loading="lazy"
          />
        </picture>
      </div>
    </Frame>
  );
}
