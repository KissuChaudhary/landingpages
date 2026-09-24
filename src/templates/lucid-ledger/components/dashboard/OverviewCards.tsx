'use client';

import React from 'react';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';
import { Info, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { cn } from '@/templates/lucid-ledger/lib/utils';

const earningData = [
  { month: 'Jan', value: 12000 },
  { month: 'Feb', value: 18000 },
  { month: 'Mar', value: 35000 },
  { month: 'Apr', value: 25000 },
  { month: 'May', value: 20000 },
  { month: 'Jun', value: 42000 },
];

export function EarningOverview() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex flex-col h-full group transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-500">Earning Overview</h3>
          <Info size={14} className="text-slate-300" />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          This Month <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold text-[#141414]">$20,520.32</span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#141414] text-white text-[10px] font-bold">
          +1.5% <TrendingUp size={10} />
        </div>
      </div>

      <div className="flex-1 min-h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={earningData}>
            <defs>
              <linearGradient id="earningGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0].value !== undefined) {
                  return (
                    <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 text-[11px]">
                      <p className="text-slate-400 mb-0.5">May 2025</p>
                      <p className="font-bold text-[#141414]">${Number(payload[0].value).toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <XAxis 
              dataKey="month" 
              hide 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#earningGradient)" 
              dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-4 px-2">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
          <span key={m} className="text-[10px] font-medium text-slate-400">{m}</span>
        ))}
      </div>
    </div>
  );
}

export function SpendingOverview() {
  const categories = [
    { name: 'House Rent', amount: '$2,000.00', color: 'bg-blue-600', width: '45%' },
    { name: 'Foods', amount: '$1,500.00', color: 'bg-blue-300', width: '30%' },
    { name: 'Others', amount: '$800.00', color: 'bg-slate-100', width: '25%' },
  ];

  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex flex-col h-full transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-slate-500">Spending Overview</h3>
          <Info size={14} className="text-slate-300" />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          This Month <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-baseline gap-3 mb-8">
        <span className="text-3xl font-bold text-[#141414]">$20,520.32</span>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[10px] font-bold">
          +1.5% <TrendingDown size={10} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase mb-4">Spending Breakdown</h4>
        
        {/* Legend */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {categories.map((cat) => (
            <div key={cat.name} className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={cn("w-2 h-2 rounded-full", cat.color === 'bg-slate-100' ? 'bg-slate-200' : cat.color)}></div>
                <span className="text-[11px] font-bold text-[#141414]">{cat.name}</span>
              </div>
              <p className="text-[10px] text-slate-400 pl-4">{cat.amount}</p>
            </div>
          ))}
        </div>

        {/* Stacked Bar */}
        <div className="flex h-10 w-full rounded-xl overflow-hidden shadow-inner">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className={cn("h-full", cat.color)} 
              style={{ width: cat.width }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
