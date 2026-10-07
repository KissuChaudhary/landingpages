"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

import { EASE, usePlayback, useSequence } from "@/components/motion/hooks";

const HEADERS = [
  { name: "ferry-id", value: "msg_2Lx9QkH1cV" },
  { name: "ferry-timestamp", value: "1767225600" },
];
const SIGNATURE = { name: "ferry-signature", value: "v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9" };
const CHECKS = ["Signature matches", "Timestamp within 5 min"];
const BEATS = [600, 1300, 700, 3200] as const;

/** A signed request arriving: the signature writes itself in, then both checks pass. */
export function SignatureCheck() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing, reduced } = usePlayback(ref, 0.4);
  const [sequence] = useSequence(BEATS, playing);
  const step = reduced ? BEATS.length - 1 : sequence;

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col justify-between bg-night p-5 font-mono text-[12px] leading-[1.9] sm:p-6">
      <div>
        <p className="mb-2 text-code-muted">
          <span className="text-code-function">POST</span> /webhooks <span className="text-code-muted/70">HTTP/1.1</span>
        </p>
        {HEADERS.map((header) => (
          <p key={header.name} className="truncate">
            <span className="text-code-keyword">{header.name}</span>
            <span className="text-code-muted">: </span>
            <span className="text-code-string">{header.value}</span>
          </p>
        ))}
        <p className="flex min-w-0">
          <span className="shrink-0 text-code-keyword">{SIGNATURE.name}</span>
          <span className="shrink-0 text-code-muted">:&nbsp;</span>
          <motion.span
            initial={false}
            animate={{ clipPath: step >= 1 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={step >= 1 ? { duration: 1.1, ease: "linear" } : { duration: 0 }}
            className="truncate text-code-string"
          >
            {SIGNATURE.value}
          </motion.span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 font-sans">
        {CHECKS.map((check, index) => (
          <motion.span
            key={check}
            initial={false}
            animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.45, delay: step >= 2 ? index * 0.15 : 0, ease: EASE }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-300"
          >
            <ShieldCheck className="size-3.5" />
            {check}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
