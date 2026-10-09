import { notFound } from "next/navigation";
import { pages } from "@/data/pages";
import { ResourcePage } from "@/components/ResourcePage";
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: pages[slug]?.title.replaceAll("\n", " ") || "Page not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!pages[slug]) notFound();
  return (
    <main id="main">
      <ResourcePage slug={slug} />
    </main>
  );
}
