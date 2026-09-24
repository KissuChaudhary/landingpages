'use client';

import React, { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';
import { Info, ChevronDown } from 'lucide-react';
import { cn } from '@/templates/lucid-ledger/lib/utils';

const data = [
  { month: 'Jan', value: 15000 },
  { month: 'Feb', value: 12000 },
  { month: 'Mar', value: 20000 },
  { month: 'Apr', value: 15000 },
  { month: 'May', value: 25000 },
  { month: 'Jun', value: 22000 },
  { month: 'Jul', value: 18000 },
  { month: 'Aug', value: 30000, active: true },
  { month: 'Sep', value: 15000 },
  { month: 'Oct', value: 20000 },
  { month: 'Nov', value: 18000 },
  { month: 'Dec', value: 22000 },
];

export default function CashFlowChart() {
  const [activeTab, setActiveTab] = useState('Income');
  const tabs = ['Income', 'Expanse', 'Savings'];

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex flex-col h-full transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-500">Cash Flow</h3>
          <Info size={14} className="text-slate-300" />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          Yearly <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-4xl font-bold text-[#141414]">$342,323.44</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[11px] font-bold transition-all",
              activeTab === tab 
                ? "bg-[#141414] text-white" 
                : "text-slate-400 hover:bg-slate-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 40, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
              tickFormatter={(value) => `${value / 1000}k`}
              domain={[0, 35000]}
              ticks={[0, 10000, 20000, 30000]}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0].value !== undefined) {
                  return (
                    <div className="bg-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-100 text-center animate-in fade-in zoom-in duration-200">
                      <p className="text-[10px] text-slate-400 font-medium mb-1">August 2025 :</p>
                      <p className="text-sm font-bold text-[#141414]">${Number(payload[0].value).toLocaleString()}.20</p>
                    </div>
                  );
                }
                return null;
              }}
              position={{ y: -60 }}
            />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 6, 6]}
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.active ? '#2563eb' : '#f1f5f9'}
                  className={cn(
                    "transition-all duration-300 cursor-pointer",
                    entry.active ? "opacity-100" : "hover:fill-slate-200"
                  )}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
