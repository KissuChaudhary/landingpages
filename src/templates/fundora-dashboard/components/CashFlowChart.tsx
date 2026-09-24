'use client';

import { Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import { mockData } from '@/templates/fundora-dashboard/lib/data';
import { useState } from 'react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const valueStr = payload[0].payload.valueExplicit 
      ? payload[0].payload.valueExplicit.toLocaleString('en-US', { minimumFractionDigits: 2 })
      : payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 });
      
    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-xs border border-gray-100 flex flex-col items-center gap-1 relative -top-2">
        <span className="text-gray-500">{label} 2025 :</span>
        <span className="font-semibold text-gray-900">${valueStr}</span>
        {/* Little triangle pointer */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45"></div>
      </div>
    );
  }
  return null;
};

// Custom shape to make the hovered/active bar blue and rounded
const CustomBarShape = (props: any) => {
  const { x, y, width, height, isActive } = props;
  const radius = width / 2;
  
  if (isActive) {
    return (
      <g>
        <Rectangle x={x} y={y} width={width} height={height} radius={[8, 8, 8, 8]} fill="#2563EB" />
        {/* Inner highlight simulating the light blue line in the active state */}
        <line x1={x + width / 2} y1={y + 8} x2={x + width / 2} y2={y + height - 8} stroke="#60A5FA" strokeWidth={2} strokeLinecap="round" />
        <circle cx={x + width / 2} cy={y + 12} r={3} fill="#fff" />
      </g>
    );
  }
  
  return <Rectangle x={x} y={y} width={width} height={height} radius={[8, 8, 8, 8]} fill="#F3F4F6" />;
};


export function CashFlowChart() {
  const { total, monthlyData } = mockData.cashFlow;
  // Default to August as active as seen in screenshot
  const [activeIndex, setActiveIndex] = useState(7); 

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
            <h2 className="text-sm font-medium">Cash Flow</h2>
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[32px] font-semibold tracking-tight text-gray-900">
              ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          {/* Segmented Control */}
          <div className="flex bg-gray-50 p-1 rounded-full items-center">
            <button className="px-4 py-1.5 text-xs font-semibold bg-gray-900 text-white rounded-full shadow-sm">Income</button>
            <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">Expanse</button>
            <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">Savings</button>
          </div>
        </div>
        
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer text-xs font-medium">
            <option>Yearly</option>
            <option>Monthly</option>
          </select>
          <svg className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      <div className="flex-1 mt-auto min-h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickFormatter={(value) => `${value / 1000}k`}
              ticks={[0, 10000, 20000, 30000]}
              dx={-10}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={false}
              position={{ y: -30 }}
            />
            <Bar 
              dataKey="value" 
              shape={(props: any) => <CustomBarShape {...props} isActive={props.index === activeIndex} />}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
