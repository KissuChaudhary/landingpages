'use client';

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Info } from 'lucide-react';
import { mockData } from '@/templates/fundora-dashboard/lib/data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-xs border border-gray-100 flex items-center gap-1">
        <span className="text-gray-500">{label} 2025 :</span>
        <span className="font-semibold text-gray-900">${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
    );
  }
  return null;
};

export function EarningOverview() {
  const { total, percentChange, chartData } = mockData.earning;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <h2 className="text-sm font-medium">Earning Overview</h2>
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[32px] font-semibold tracking-tight text-gray-900">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-900 text-white">
              +{percentChange}% <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </span>
          </div>
        </div>
        
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer text-xs font-medium">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <svg className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      <div className="flex-1 mt-auto min-h-[160px] w-full -ml-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              dy={10}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563EB" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              activeDot={{ r: 4, fill: '#fff', stroke: '#2563EB', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
