"use client";

import { PremiumCard } from "./PremiumCard";
import { FileText, Edit3, Folder, X } from "lucide-react";

export function MetricsRow() {
  const metrics = [
    { title: "Active Contracts", value: "25", change: "+5", isPositive: true, Icon: FileText },
    { title: "Pending Signatures", value: "09", change: "+6", isPositive: true, Icon: Edit3 },
    { title: "Total Contracts", value: "36", change: "+7", isPositive: true, Icon: Folder },
    { title: "Cancelled Contracts", value: "3", change: "-2", isPositive: false, Icon: X },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <PremiumCard key={i} className="flex flex-row justify-between pt-[28px] pb-[28px]">
          <div className="flex flex-col justify-between">
            <span className="text-muted text-[13px] font-medium tracking-wide uppercase mb-1">{m.title}</span>
            <div className="text-[48px] font-semibold tracking-[-0.04em] leading-none mb-4 mt-2">
              {m.value}
            </div>
            <div className="flex items-center gap-2 font-mono text-[13px]">
              <span className={m.isPositive ? "text-accent-green" : "text-accent-red"}>
                {m.change}
              </span>
              <span className="text-muted opacity-80">vs last month</span>
            </div>
          </div>
          
          <div className="relative">
            {/* The abstract glass icons in the background */}
            <div className="absolute -right-2 top-0 opacity-20 w-24 h-24 border border-white/20 rounded-2xl transform rotate-12 bg-white/5 backdrop-blur-sm" />
            <div className="absolute -right-8 -bottom-4 opacity-10 w-20 h-20 border border-white/20 rounded-[10px] transform -rotate-6 bg-white/10" />
            <div className="relative z-10 w-12 h-12 bg-white/5 border border-white/10 rounded-[14px] flex items-center justify-center shadow-lg backdrop-blur-md">
              <m.Icon className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </PremiumCard>
      ))}
    </div>
  );
}
