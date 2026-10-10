import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pages, type ContentPageKey } from "@/data/pages";
import { Frame, SectionHead, Button } from "@/components/ui/Primitives";
import { route, asset } from "@/lib/urls";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug as ContentPageKey]?.label || "Page not found" };
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as ContentPageKey];
  if (!page) notFound();
  return (
    <Frame className="section content-page">
      <SectionHead level={1} label={page.label} title={page.title} />
      <p className="content-intro">{page.intro}</p>
      {slug === "about" && (
        <div className="about-image">
          <img
            src={asset("/images/stage-orchestrate.webp")}
            alt="The workflow canvas: a lead routes through enrichment, a fit check, human review and a CRM handoff"
            width={2240}
            height={1440}
          />
        </div>
      )}
      <div className="content-chapters">
        {page.chapters.map((chapter) => (
          <article key={chapter.title}>
            <h3>{chapter.title}</h3>
            <p>{chapter.body}</p>
          </article>
        ))}
      </div>
      <Button href={route("/contact")}>Start a conversation</Button>
    </Frame>
  );
}
