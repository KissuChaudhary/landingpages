import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { campaigns, findCampaign } from "@/data/campaigns";
import { asset, href } from "@/lib/urls";
import { Button, TextLink } from "@/components/ui/Button";
export const dynamicParams = false;
export const generateStaticParams = () =>
  campaigns.map((campaign) => ({ slug: campaign.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const campaign = findCampaign((await params).slug);
  return { title: campaign?.brand, description: campaign?.summary };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const campaign = findCampaign((await params).slug);
  if (!campaign) notFound();
  const next = campaigns[(campaigns.indexOf(campaign) + 1) % campaigns.length];
  return (
    <>
      <section className="case-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={href("/work")}>Our work</a>
          <span>/</span>
          <span>{campaign.brand}</span>
        </nav>
        <div className="case-heading">
          <div>
            <p className="eyebrow">
              <span />
              {campaign.brand} / {campaign.category}
            </p>
            <h1>{campaign.title}</h1>
          </div>
          <div>
            <span className="concept-label">Original campaign concept</span>
            <p>{campaign.summary}</p>
          </div>
        </div>
        <div className={"case-hero tone-" + campaign.color}>
          <img
            src={asset(campaign.image)}
            alt={campaign.alt}
            width={campaign.slug === "sola" ? "1122" : "1400"}
            height={campaign.slug === "sola" ? "1402" : "933"}
            fetchPriority="high"
          />
        </div>
      </section>
      <div className="case-body wrap">
        <aside className="case-aside">
          <span>The connected scope</span>
          <ul>
            {campaign.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <TextLink to="/contact">Discuss a similar challenge</TextLink>
        </aside>
        <div className="case-story">
          <section>
            <h2>The opportunity.</h2>
            <p>{campaign.challenge}</p>
          </section>
          <section>
            <h2>The connected idea.</h2>
            <p>{campaign.idea}</p>
          </section>
        </div>
      </div>
      <section
        className="case-moments wrap"
        aria-label="Customer journey moments"
      >
        {campaign.moments.map((moment, index) => (
          <div key={moment.title}>
            <span>0{index + 1} / Journey moment</span>
            <h3>{moment.title}</h3>
            <p>{moment.description}</p>
          </div>
        ))}
      </section>
      <section className="case-next wrap">
        <div>
          <p>Explore the next concept</p>
          <h2>{next.brand}</h2>
        </div>
        <Button to={"/work/" + next.slug}>View the idea</Button>
      </section>
    </>
  );
}
