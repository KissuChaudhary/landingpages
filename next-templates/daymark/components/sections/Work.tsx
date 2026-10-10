import { site } from "@/site.config";
import { campaigns, type Campaign } from "@/data/campaigns";
import { asset, href } from "@/lib/urls";
import { Heading } from "../ui/Heading";
import { Arrow } from "../ui/Arrow";
export function CampaignCard({
  campaign,
  index,
}: {
  campaign: Campaign;
  index: number;
}) {
  return (
    <a
      href={href("/work/" + campaign.slug)}
      className={"campaign-card campaign-" + index}
      data-reveal
    >
      <div className={"campaign-image tone-" + campaign.color}>
        <img
          src={asset(campaign.image)}
          alt={campaign.alt}
          width={campaign.slug === "sola" ? "1122" : "1400"}
          height={campaign.slug === "sola" ? "1402" : "933"}
          loading="lazy"
        />
        <span className="campaign-index">0{index + 1} / Campaign concept</span>
        <span className="card-arrow">
          <Arrow diagonal />
        </span>
      </div>
      <div className="campaign-copy">
        <div className="campaign-meta">
          <span>{campaign.brand}</span>
          <span>{campaign.category}</span>
        </div>
        <h3>{campaign.title}</h3>
        {index === 2 && <p>{campaign.summary}</p>}
        <span className="campaign-link">
          Explore the idea <Arrow />
        </span>
      </div>
    </a>
  );
}
export function Work() {
  return (
    <section className="section wrap" id="work">
      <Heading {...site.work} />
      <div className="campaign-grid">
        {campaigns.map((campaign, index) => (
          <CampaignCard campaign={campaign} index={index} key={campaign.slug} />
        ))}
      </div>
    </section>
  );
}
