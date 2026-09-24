"use client";

import { PremiumCard } from "./PremiumCard";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function LeadsDonut() {
  const data = [
    { name: 'New', value: 42, color: '#FF8A00' },
    { name: 'Contacted', value: 58, color: '#55555A' },
    { name: 'Qualified', value: 26, color: '#3A3A40' },
    { name: 'Closed', value: 16, color: '#25252A' },
  ];

  return (
    <PremiumCard className="h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-medium tracking-tight text-secondary">Leads by Status</h3>
        <button className="w-8 h-8 rounded-[8px] bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="mb-6 mt-2">
        <div className="text-[32px] font-semibold tracking-tight leading-none mb-2">142</div>
        <div className="flex items-center gap-2 font-mono text-[12px]">
          <span className="text-accent-green">+12</span>
          <span className="text-muted">vs last week</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center mt-2 relative gap-6 sm:gap-0">
        <div className="w-[140px] h-[140px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                stroke="rgba(0,0,0,0.5)"
                strokeWidth={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[18px] font-semibold text-white">142</span>
            <span className="text-[11px] text-muted">Total</span>
          </div>
        </div>

        <div className="flex-1 w-full sm:w-auto sm:pl-8 flex flex-col gap-4">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-secondary">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-primary">{item.value}</span>
                <span className="text-muted w-10 text-right">({Math.round((item.value / 142) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PremiumCard>
  );
}
