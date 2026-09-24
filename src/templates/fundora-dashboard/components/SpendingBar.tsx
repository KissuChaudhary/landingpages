'use client';

import { Info } from 'lucide-react';
import { mockData } from '@/templates/fundora-dashboard/lib/data';

export function SpendingOverview() {
  const { total, percentChange, breakdown } = mockData.spending;
  
  // Calculate total for percentages
  const totalAmount = breakdown.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <h2 className="text-sm font-medium">Spending Overview</h2>
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[32px] font-semibold tracking-tight text-gray-900">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">
              {percentChange > 0 ? '+' : ''}{percentChange}% 
              <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
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

      <div className="mt-auto">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Spending Breakdown</h3>
        
        {/* Breakdown Items */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {breakdown.map((item, index) => (
            <div key={item.name} className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2h-2 rounded-full flex-shrink-0 w-2 h-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-xs font-medium text-gray-600 truncate">{item.name}</span>
              </div>
              <span className="text-xs text-gray-400 pl-3.5">${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>

        {/* Stacked Bar */}
        <div className="h-10 w-full rounded-xl overflow-hidden flex bg-gray-100 shadow-inner">
          {breakdown.map((item, index) => {
            const widthPercent = (item.value / totalAmount) * 100;
            return (
              <div 
                key={item.name}
                style={{ width: `${widthPercent}%`, backgroundColor: item.color }}
                className="h-full first:rounded-l-xl last:rounded-r-xl transition-all duration-500 ease-out"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
