"use client";

import { PremiumCard } from "./PremiumCard";

const clients = [
  { name: "Apple", revenue: "$2,540.00", change: "+12.5%", isPositive: true, icon: "🍎" },
  { name: "Google", revenue: "$2,120.50", change: "+8.2%", isPositive: true, icon: "G" },
  { name: "Figma", revenue: "$1,840.20", change: "-3.6%", isPositive: false, icon: "🎨" },
  { name: "Microsoft", revenue: "$1,230.00", change: "+6.1%", isPositive: true, icon: "❖" },
  { name: "Amazon", revenue: "$1,020.30", change: "-1.2%", isPositive: false, icon: "a" },
];

export function TopClients() {
  return (
    <PremiumCard className="h-full min-h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-medium tracking-tight text-secondary">Top Clients</h3>
        <button className="h-8 px-3 rounded-[8px] bg-white/5 border border-white/5 text-[12px] font-medium flex items-center gap-2 hover:bg-white/10 transition-colors pointer-events-auto relative z-10">
          Filters
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar mt-2 -mx-2 px-2">
        <div className="flex flex-col gap-[6px] min-w-[340px]">
          {clients.map((c, i) => (
          <div key={i} className="flex items-center justify-between h-[48px] px-3 rounded-[12px] hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="w-6 flex items-center justify-center text-lg">{c.icon}</span>
              <span className="text-[14px] font-medium text-secondary group-hover:text-primary transition-colors">{c.name}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="font-mono text-[13px] text-primary">{c.revenue}</span>
              <span className={`font-mono text-[12px] w-[50px] text-right ${c.isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                {c.change}
              </span>
              
              {/* Mini sparkline indicator */}
              <div className="w-[40px] h-[20px]">
                 <svg viewBox="0 0 40 20" className="w-full h-full overflow-visible">
                    <polyline 
                      points={c.isPositive ? "0,15 10,8 20,12 30,5 40,2" : "0,5 10,12 20,8 30,15 40,18"} 
                      fill="none" 
                      stroke={c.isPositive ? "rgba(34, 197, 94, 0.7)" : "rgba(239, 68, 68, 0.7)"} 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                 </svg>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </PremiumCard>
  );
}
