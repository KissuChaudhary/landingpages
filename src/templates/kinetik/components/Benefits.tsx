import React from 'react';
import { Shield, Smartphone, Zap, Activity, ArrowUp, Users, Lock, CheckCircle } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
      <div className="mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-kinetik-black mb-6 leading-tight">
          Built for speed,<br />designed for <span className="text-gray-400">scale.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(300px,auto)]">
        
        {/* Card 1: Unified Workflow (Span 2) */}
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-framer border border-gray-100 relative overflow-hidden group">
          <div className="relative z-10 max-w-md">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
               <Zap className="text-gray-900" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Unified Workflow</h3>
            <p className="text-gray-500 font-medium">Connect your entire team in one shared workspace. Automate routine tasks and focus on what matters.</p>
          </div>
          
          {/* Animation: Floating Cards Flow */}
          <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 w-[300px] h-[300px] hidden md:block">
             <div className="relative w-full h-full">
                {/* Card A */}
                <div className="absolute top-0 right-10 w-48 h-32 bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col justify-between animate-bounce" style={{ animationDuration: '3s' }}>
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><Users size={12} className="text-blue-600"/></div>
                      <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
                   </div>
                   <div className="space-y-2">
                      <div className="h-1.5 w-full bg-gray-50 rounded-full"></div>
                      <div className="h-1.5 w-2/3 bg-gray-50 rounded-full"></div>
                   </div>
                </div>
                {/* Card B */}
                <div className="absolute bottom-10 left-0 w-48 h-32 bg-white/80 backdrop-blur-sm rounded-xl shadow-framer border border-gray-100 p-4 flex flex-col justify-between z-10 animate-pulse" style={{ animationDuration: '4s' }}>
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle size={12} className="text-green-600"/></div>
                      <div className="h-2 w-16 bg-gray-100 rounded-full"></div>
                   </div>
                   <div className="flex items-center gap-3 mt-2">
                      <div className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">Completed</div>
                   </div>
                </div>
                {/* Connection Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" style={{ transform: 'rotate(-15deg)' }}>
                   <path d="M100,200 C150,150 150,150 200,100" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
             </div>
          </div>
        </div>

        {/* Card 2: Pocket Growth Monitor (Mobile Command Redesigned) */}
        <div className="row-span-2 bg-[#050505] rounded-[2.5rem] p-8 shadow-framer border border-gray-800 relative overflow-hidden group text-white flex flex-col">
           <div className="relative z-10 mb-8">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                <Smartphone className="text-white" size={24} />
             </div>
             <h3 className="text-2xl font-bold mb-3">Run Business on Mobile</h3>
             <p className="text-gray-400 font-medium text-sm">Monitor revenue, track customers, and manage subscriptions from anywhere.</p>
           </div>

           {/* UI: Pocket Dashboard */}
           <div className="flex-1 relative">
              <div className="absolute inset-x-0 bottom-[-20px] bg-gradient-to-t from-gray-900 to-gray-800/50 rounded-t-3xl p-5 border-t border-white/10 shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                 {/* Header */}
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">Total Revenue</div>
                       <div className="text-2xl font-display font-bold">$124,500</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-[10px] font-bold">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                       <span>+12%</span>
                    </div>
                 </div>

                 {/* Chart Simulation */}
                 <div className="flex items-end gap-2 h-16 mb-6 px-1">
                    {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
                       <div key={i} className="flex-1 bg-white/10 rounded-t-sm hover:bg-white/20 transition-colors relative group/bar" style={{ height: `${h}%` }}>
                          {i === 5 && (
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                $2.4k
                             </div>
                          )}
                       </div>
                    ))}
                 </div>

                 {/* Live Feed */}
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
                       <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-300">SJ</div>
                       <div className="flex-1">
                          <div className="text-xs font-medium text-white">Steve Jobs</div>
                          <div className="text-[10px] text-gray-500">Upgraded to Pro</div>
                       </div>
                       <div className="text-[10px] text-gray-400">2m ago</div>
                    </div>
                     <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 opacity-60">
                       <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-300">EM</div>
                       <div className="flex-1">
                          <div className="text-xs font-medium text-white">Elon Musk</div>
                          <div className="text-[10px] text-gray-500">New subscriber</div>
                       </div>
                       <div className="text-[10px] text-gray-400">5m ago</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Card 3: Enterprise Security */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-framer border border-gray-100 relative overflow-hidden group hover:shadow-framer-lg transition-shadow">
           <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Enterprise Security</h3>
              <p className="text-gray-500 text-sm font-medium">Bank-grade encryption and SSO support for peace of mind.</p>
           </div>
           <div className="absolute -bottom-12 -right-12 text-blue-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
              <Shield size={180} />
           </div>
        </div>

        {/* Card 4: Real-time Insights */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-framer border border-gray-100 relative overflow-hidden group hover:shadow-framer-lg transition-shadow">
           <div className="relative z-10">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Real-time Insights</h3>
              <p className="text-gray-500 text-sm font-medium">Visualize trends as they happen with live data updates.</p>
           </div>
           
           {/* Visual: Radial Gauge */}
           <div className="absolute bottom-6 right-6 w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                 <circle cx="48" cy="48" r="40" stroke="#f97316" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="60" className="transition-all duration-1000 ease-out group-hover:stroke-dashoffset-40" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-sm font-bold text-gray-900">78%</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};