import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const latencyData = [
  { time: '00:00', value: 120 },
  { time: '00:05', value: 132 },
  { time: '00:10', value: 101 },
  { time: '00:15', value: 154 },
  { time: '00:20', value: 90 },
  { time: '00:25', value: 180 },
  { time: '00:30', value: 110 },
  { time: '00:35', value: 140 },
  { time: '00:40', value: 120 },
];

const reqData = [
  { name: 'US-E', value: 4000 },
  { name: 'EU-W', value: 3000 },
  { name: 'AP-S', value: 2000 },
  { name: 'SA-E', value: 2780 },
];

export const LatencyChart: React.FC = () => {
  return (
    <div className="h-full w-full min-h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={latencyData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fff" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '12px' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#fff" 
            strokeWidth={1}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ThroughputChart: React.FC = () => {
   return (
    <div className="h-full w-full min-h-[100px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={reqData}>
          <Bar dataKey="value" fill="#27272a" radius={[2, 2, 0, 0]} />
          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '10px' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
   )
}
