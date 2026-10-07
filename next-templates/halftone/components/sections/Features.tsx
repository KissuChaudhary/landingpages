import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { Reveal, SectionHeader } from "@/components/ui/Reveal";
import { LatencyChart } from "@/components/visuals/LatencyChart";
import { PortalPreview } from "@/components/visuals/PortalPreview";
import { RegionList } from "@/components/visuals/RegionList";
import { ReplayList } from "@/components/visuals/ReplayList";
import { RetryTimeline } from "@/components/visuals/RetryTimeline";
import { SignatureCheck } from "@/components/visuals/SignatureCheck";

/** A grey card with the product panel set into a white (or dark) inset above the text. */
function Card({
  title,
  body,
  visual,
  dark,
  className,
  delay = 0,
}: {
  title: string;
  body: string;
  visual: ReactNode;
  dark?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal y={30} delay={delay} className={cn("surface flex flex-col rounded-[30px] p-2", className)}>
      <div className={cn("h-[236px] overflow-hidden rounded-[24px] ring-1", dark ? "bg-night ring-black/10" : "bg-white ring-black/[0.05]")}>{visual}</div>
      <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
        <h3 className="text-[17px] font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-body">{body}</p>
      </div>
    </Reveal>
  );
}

export function Features() {
  const { features } = site;
  const { retries, signing, replay, latency, regions, portal } = features.items;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker={features.kicker} lead={features.lead} accent={features.accent} description={features.description} />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
          <Card {...retries} visual={<RetryTimeline />} className="md:col-span-2 lg:col-span-7" />
          <Card {...signing} visual={<SignatureCheck />} dark delay={0.08} className="lg:col-span-5" />
          <Card {...replay} visual={<ReplayList />} className="lg:col-span-4" />
          <Card {...latency} visual={<LatencyChart />} delay={0.08} className="lg:col-span-4" />
          <Card {...regions} visual={<RegionList />} delay={0.16} className="md:col-span-2 lg:col-span-4" />

          {/* The wide closing card: text on the left, your customer's view on the right. */}
          <Reveal y={30} className="surface grid grid-cols-1 gap-2 rounded-[30px] p-2 md:col-span-2 lg:col-span-12 lg:grid-cols-12">
            <div className="flex flex-col justify-center px-4 py-5 sm:px-6 lg:col-span-5 lg:px-8 lg:py-8">
              <h3 className="text-[22px] font-semibold leading-snug tracking-tight text-ink sm:text-[26px]">{portal.title}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">{portal.body}</p>
              <a
                href={portal.cta.href}
                className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition-opacity hover:opacity-70"
              >
                {portal.cta.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="h-[372px] overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.05] sm:h-[340px] lg:col-span-7">
              <PortalPreview />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
