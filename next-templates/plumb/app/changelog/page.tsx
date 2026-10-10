import type { Metadata } from "next";
import { site } from "@/site.config";
import { releases } from "@/data/changelog";
import { ChangelogView } from "@/components/sections/ChangelogView";
import { Tag } from "@/components/ui/Primitives";

export const metadata: Metadata = { title: "Changelog", description: `Everything ${site.brand.name} has shipped, newest first.` };

export default function Changelog() {
  return (
    <>
      <header className="wrap page-head">
        <Tag>{site.shipped.tag}</Tag>
        <h1 className="page-title">Everything we&apos;ve shipped.</h1>
        <p className="lead" style={{ maxWidth: "34em" }}>
          {releases.length} releases, newest first. Filter by what changed, or link to any release.
        </p>
      </header>
      <div className="wrap page-body">
        <ChangelogView />
      </div>
    </>
  );
}
