"use client";

import { PremiumCard } from "./PremiumCard";
import { Search } from "lucide-react";
import Image from "next/image";

export function RecentProjects() {
  const projects = [
    { name: "Website Redesign", assignee: "Jullye", date: "08-03-2026", avatar: 1 },
    { name: "Dashboard", assignee: "Ismile", date: "15-03-2026", avatar: 2 },
    { name: "Branding", assignee: "Jordan", date: "20-03-2026", avatar: 3 },
    { name: "Motion", assignee: "Michel", date: "12-03-2026", avatar: 4 },
    { name: "Mobile design", assignee: "Lora", date: "22-03-2026", avatar: 5 },
    { name: "Mobile onboarding", assignee: "Smith", date: "25-03-2026", avatar: 6 },
  ];

  return (
    <PremiumCard className="h-full min-h-[460px] pb-6 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-[18px] font-medium tracking-tight">Recent Projects</h3>
        <div className="flex items-center gap-3">
          <div className="h-9 px-3 rounded-[12px] bg-white/5 border border-white/5 flex items-center gap-2 group focus-within:border-white/10 transition-colors w-[140px] flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-muted group-focus-within:text-white" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent flex-1 w-full outline-none text-sm placeholder:text-muted" 
            />
          </div>
          <button className="h-9 px-4 rounded-[12px] bg-white/5 border border-white/10 text-[13px] font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            Filters
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <div className="min-w-[480px]">
          <div className="grid grid-cols-12 text-[12px] font-mono text-muted uppercase tracking-wider px-4 mb-3 border-b border-white/5 pb-3">
            <div className="col-span-5">Project</div>
            <div className="col-span-4">Assignee</div>
            <div className="col-span-3 text-right">Due date</div>
          </div>

          <div className="flex flex-col gap-1">
            {projects.map((p, i) => (
              <div 
                key={i} 
                className="grid grid-cols-12 items-center px-4 h-[44px] rounded-[12px] text-[14px] hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted group-hover:text-primary transition-colors flex-shrink-0">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                  </svg>
                  <span className="font-medium text-secondary group-hover:text-primary transition-colors truncate">{p.name}</span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/10 overflow-hidden bg-white/10 flex-shrink-0 relative">
                     <Image src={`https://picsum.photos/seed/${p.avatar * 5}/50/50`} alt="" fill referrerPolicy="no-referrer" className="object-cover" />
                  </div>
                  <span className="text-secondary group-hover:text-primary transition-colors truncate">{p.assignee}</span>
                </div>
                <div className="col-span-3 text-right font-mono text-[13px] text-muted group-hover:text-secondary transition-colors">
                  {p.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-1">
         <button className="w-full h-[44px] rounded-[14px] border border-white/10 bg-white/5 text-[14px] font-medium hover:bg-white/10 transition-colors">
            View all projects
         </button>
      </div>
    </PremiumCard>
  );
}
