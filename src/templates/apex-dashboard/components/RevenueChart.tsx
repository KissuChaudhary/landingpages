"use client";

import { PremiumCard } from "./PremiumCard";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from "recharts";

const data = [
  { name: 'Mon', value: 4.8 },
  { name: 'Tue', value: 8.2 },
  { name: 'Wed', value: 5.5 },
  { name: 'Thu', value: 10.4 },
  { name: 'Fri', value: 8.1 },
  { name: 'Sat', value: 5.1 },
  { name: 'Sun', value: 6.8 },
];

export function RevenueChart() {
  return (
    <PremiumCard className="h-full min-h-[460px] pb-6 flex flex-col justify-between overflow-x-auto custom-scrollbar">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4 min-w-[500px]">
        <div>
          <div className="text-[13px] font-medium tracking-wide uppercase text-muted mb-2">Revenue</div>
          <div className="text-[40px] font-semibold tracking-[-0.04em] leading-none mb-3">$10,985.56</div>
          <div className="text-[13px] font-mono flex items-center gap-2">
            <span className="text-accent-red">2.5% ↓</span>
            <span className="text-muted opacity-80">vs last week</span>
          </div>
        </div>
        <button className="h-9 px-4 rounded-[12px] bg-white/5 border border-white/10 text-[13px] font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
          Weekly
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="flex-1 w-full relative min-w-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 30, right: 0, left: -25, bottom: 0 }}>
            {/* Soft dashed grid */}
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: 'var(--font-plex-mono)' }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: 'var(--font-plex-mono)' }}
              domain={[0, 12.5]}
              ticks={[0, 2.5, 5.0, 7.5, 10.0, 12.5]}
            />
            {/* Custom Tooltip replacing standard to prevent white background flash */}
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return null; // The static custom label handles "Thu" naturally
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[18, 18, 0, 0]} maxBarSize={48}>
              {data.map((entry, index) => {
                const isActive = entry.name === 'Thu';
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isActive ? 'url(#colorActive)' : 'url(#colorInactive)'} 
                    style={isActive ? { filter: 'drop-shadow(0px -4px 15px rgba(255,138,0,0.5))' } : {}}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Abstract floating line connecting to Thursday data point */}
        <div className="absolute top-[30px] left-0 w-full right-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <line x1="45%" y1="0" x2="100%" y2="0" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" strokeWidth="1" />
          </svg>
        </div>
        
        {/* Floating tooltip simulation over Thursday */}
        <div className="absolute top-[0px] left-[52%] -translate-x-1/2 pointer-events-none">
           <div className="bg-[#1A1A1C] border border-white/10 text-white text-[12px] font-mono px-2 py-1 rounded-[6px] shadow-xl">
             $9,340
           </div>
        </div>

        {/* Gradients */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB14A" />
              <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </PremiumCard>
  );
}
