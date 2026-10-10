import type { Metadata } from "next";
import { campaigns } from "@/data/campaigns";
import { site } from "@/site.config";
import { CampaignCard } from "@/components/sections/Work";
import { Closing } from "@/components/sections/Closing";
export const metadata: Metadata = { title: "Our work" };
export default function WorkPage() {
  return (
    <>
      <div className="page-intro wrap">
        <p className="eyebrow">
          <span />
          {site.work.eyebrow}
        </p>
        <h1>{site.work.title}</h1>
        <p>{site.work.description}</p>
      </div>
      <section className="directory wrap" aria-label="Campaign concepts">
        <div className="campaign-grid">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              campaign={campaign}
              index={index}
              key={campaign.slug}
            />
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
