"use client";

import { PremiumCard } from "./PremiumCard";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { name: 'Week 1', value: 45 },
  { name: '', value: 38 },
  { name: '', value: 55 },
  { name: '', value: 48 },
  { name: 'Week 2', value: 65 },
  { name: '', value: 58 },
  { name: '', value: 72 },
  { name: '', value: 68 },
  { name: 'Week 3', value: 85 },
  { name: '', value: 72 },
  { name: '', value: 105 },
  { name: '', value: 92 },
  { name: 'Week 4', value: 125 },
];

export function VisitsChart() {
  return (
    <PremiumCard className="h-full min-h-[400px] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-[14px] font-medium tracking-tight text-secondary">Content visits</h3>
        <button className="h-8 px-3 rounded-[8px] sm:self-auto self-start bg-white/5 border border-white/5 text-[12px] font-medium flex items-center gap-2 hover:bg-white/10 transition-colors pointer-events-auto z-10 relative">
          Filters
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="mb-4">
         <div className="flex items-end gap-3 mb-1">
           <div className="text-[32px] font-semibold tracking-tight leading-none text-white">102.45M</div>
           <div className="text-muted font-mono text-[12px] pb-[3px]">vs last month</div>
         </div>
         <div className="flex items-center gap-1 font-mono text-[12px] text-accent-green">
           +8.6% ↑
         </div>
      </div>

      <div className="flex-1 w-full relative mt-4 overflow-x-auto custom-scrollbar -mx-2 px-2">
        <div className="h-full min-w-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8A00" stopOpacity={0.25}/>
                <stop offset="100%" stopColor="#FF8A00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'var(--font-plex-mono)' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'var(--font-plex-mono)' }}
              ticks={[0, 50, 100, 150]}
              tickFormatter={(val) => val === 0 ? '0' : `${val}M`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#FFA62B" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVisits)" 
              style={{ filter: "drop-shadow(0 4px 15px rgba(255,138,0,0.3))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
    </PremiumCard>
  );
}
