"use client";

import { Eye, Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Reel } from "@/components/ui/Reel";
import { siteConfig } from "@/site.config";

/** Counts a figure like "40k+" up from zero once, and shows the final value straight away with reduced motion. */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : "";
  const hasNumber = Boolean(match);
  // Starts at the final value so the page reads correctly before any script runs.
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!hasNumber) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - begin) / 1400, 1);
      setShown(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasNumber, target]);

  if (!match) return <>{value}</>;
  return (
    <>
      {Math.round(shown).toLocaleString("en-US")}
      {suffix}
    </>
  );
}

const chip =
  "absolute flex items-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2 text-[14px] font-bold text-ink backdrop-blur-md";

/** A phone playing one of the studio's videos, with live-looking metrics floating around it. */
export function HeroVisual() {
  const { phone } = siteConfig.hero;
  const behind = siteConfig.work.reels[1];
  const hook = phone.caption.map((part) => (part.mark ? `*${part.text}*` : part.text)).join(" ");

  return (
    <div className="relative mx-auto flex w-full max-w-[26rem] justify-center py-4 lg:max-w-none lg:justify-end">
      {/* A second video, tucked behind and tilted, for depth. */}
      <div aria-hidden className="absolute left-0 top-[18%] hidden w-[44%] -rotate-[7deg] sm:block lg:-left-2 lg:w-[38%]">
        <Reel look={behind} hook={behind.hook} handle={behind.handle} />
      </div>

      <div className="relative w-[18.5rem] sm:w-[21rem]">
        <div className="rounded-[2.75rem] bg-ink p-2">
          <div className="relative">
            <Reel look={phone.look} hook={hook} handle={phone.handle} size="lg" className="aspect-[9/17]" />

            <ul aria-label="Video stats" className="absolute bottom-[8.5rem] right-3 flex flex-col items-center gap-4 text-white">
              {[
                { Icon: Heart, value: phone.likes, fill: true },
                { Icon: MessageCircle, value: phone.comments, fill: false },
                { Icon: Send, value: phone.shares, fill: false },
              ].map(({ Icon, value, fill }) => (
                <li key={value} className="flex flex-col items-center gap-1 text-[12px] font-semibold">
                  <span className="flex size-10 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                    <Icon className={`size-[18px] ${fill ? "fill-pink text-pink" : ""}`} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${chip} -left-6 top-14 animate-[float_6s_ease-in-out_3s_infinite]`}>
          <MessageCircle className="size-4 text-ink-mid" />
          {phone.chips.comments}
        </div>
        <div className={`${chip} -right-7 top-[32%] animate-[float_6s_ease-in-out_infinite]`}>
          <Eye className="size-4 text-ink-mid" />
          <span className="money">
            <CountUp value={phone.chips.views} />
          </span>
        </div>
        <div className={`${chip} -left-8 bottom-[30%] animate-[float_6s_ease-in-out_3s_infinite]`}>
          <Heart className="size-4 fill-pink text-pink" />
          {phone.chips.likes}
        </div>
        <div className={`${chip} -bottom-2 -right-8 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] animate-[float_6s_ease-in-out_infinite]`}>
          <span className="relative">
            <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-orange text-[13px] font-bold">
              {phone.handle.slice(0, 1).toUpperCase()}
            </span>
            <span aria-hidden className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-pink" />
          </span>
          {phone.chips.followers}
        </div>
      </div>
    </div>
  );
}
