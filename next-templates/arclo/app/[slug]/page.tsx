import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Primitives";
const policies = {
  privacy: {
    title: "Privacy",
    lead: "A starting point for your own privacy notice.",
    sections: [
      {
        heading: "About this template",
        text: "This page is placeholder content for the template owner to replace before launch. Describe the legal entity operating your service, its contact details and the privacy rules that apply to your business.",
      },
      {
        heading: "The included preview",
        text: "Workflow examples process sample data locally in the browser. The motion preference uses local storage. Forms keep entered details in current-page state unless a destination endpoint is configured. Downloads are created locally. The template doesn’t include tracking scripts.",
      },
      {
        heading: "Your production service",
        text: "Replace this section with your actual data collection, use, retention, providers, security practices, user rights and contact process. Review any analytics, account integrations and form providers you add.",
      },
    ],
  },
  terms: {
    title: "Terms",
    lead: "A starting point for your own terms of service.",
    sections: [
      {
        heading: "About this template",
        text: "These are placeholder sections, not a production agreement. Replace this page with terms appropriate to your business and service before accepting customers.",
      },
      {
        heading: "The demonstration",
        text: "Arclo is a fictional example product. Local workflow results, team stories, integrations and plan prices demonstrate the template. No live account, message delivery or subscription is created by the included preview.",
      },
      {
        heading: "Your service",
        text: "Describe your eligibility, account responsibilities, permitted use, subscriptions, cancellations, intellectual property, limitations and dispute process. Match every statement to how your actual service works.",
      },
    ],
  },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: policies[slug as keyof typeof policies]?.title };
}
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = policies[slug as keyof typeof policies];
  if (!page) notFound();
  return (
    <main id="main">
      <Section className="policy-page">
        <span className="eyebrow">Before launch · replace this page</span>
        <h1>{page.title}</h1>
        <p className="policy-lead">{page.lead}</p>
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </Section>
    </main>
  );
}
