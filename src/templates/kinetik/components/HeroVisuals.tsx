import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { MoreVertical, Star, MessageSquare, Pencil } from 'lucide-react';
import { CUSTOMERS, CHART_DATA } from '../constants';

export const HeroVisuals: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] h-[400px] md:h-[500px] mx-auto md:mx-0 perspective-1000">
      
      {/* Card 1: Customers (Bottom Layer) */}
      <div className="absolute top-0 right-0 md:right-4 w-[90%] md:w-[95%] bg-white rounded-[2rem] p-6 shadow-framer border border-gray-100 z-10 transform transition-transform hover:scale-[1.02] duration-500">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900">Customers</h3>
          <div className="text-xs text-gray-500 font-medium flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg">
            Sort by Newest
          </div>
        </div>
        
        <div className="space-y-3">
          {CUSTOMERS.map((customer) => (
            <div key={customer.id} className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${customer.id === 1 ? 'bg-yellow-50/80' : 'hover:bg-gray-50'}`}>
              <div className={`w-10 h-10 rounded-full ${customer.avatarColor} flex items-center justify-center text-xs font-bold text-gray-700 overflow-hidden shrink-0`}>
                 {/* Simulate an image or use initials */}
                 <img src={`https://picsum.photos/seed/${customer.id + 50}/100/100`} alt={customer.name} className="w-full h-full object-cover opacity-90 mix-blend-multiply" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{customer.name}</p>
                <p className="text-xs text-gray-500 truncate">{customer.company}</p>
              </div>
              
              {/* Hover actions hidden/shown based on design cues, simplified here to static for aesthetic match */}
              <div className="flex gap-2 text-gray-400">
                <Pencil size={14} className="cursor-pointer hover:text-gray-600" />
                <Star size={14} className="cursor-pointer hover:text-gray-600" />
                <MessageSquare size={14} className="cursor-pointer hover:text-gray-600" />
                <MoreVertical size={14} className="cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center gap-1 text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-800">
           All customers <ArrowIcon />
        </div>
      </div>

      {/* Card 2: Analytics (Top Layer, Overlapping) */}
      <div className="absolute bottom-0 md:bottom-12 left-0 md:-left-8 w-[85%] md:w-[80%] bg-white rounded-[2rem] p-6 shadow-framer-lg border border-gray-100 z-20 transform hover:-translate-y-2 transition-transform duration-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Daily Average</p>
            <h3 className="text-3xl font-display font-bold text-gray-900">2h 20m</h3>
          </div>
          <div className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
            +30m <span className="text-gray-400 font-normal">this week</span>
          </div>
        </div>

        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} barSize={12}>
              <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between mt-2 px-2">
           {CHART_DATA.map((d, i) => (
             <span key={i} className="text-[10px] font-medium text-gray-400 w-3 text-center">{d.day}</span>
           ))}
        </div>
      </div>
    </div>
  );
};

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);