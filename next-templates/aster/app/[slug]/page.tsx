import { notFound } from "next/navigation";
import { pages } from "@/data/pages";
import { ResourcePage } from "@/components/pages/ResourcePage";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: pages[slug]?.title || "Page not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!pages[slug]) notFound();
  return <ResourcePage slug={slug} />;
}
