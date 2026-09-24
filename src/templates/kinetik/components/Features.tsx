import React from 'react';
import { Plus, Users, ArrowUpRight, CheckCircle2, BarChart3, PieChart, MousePointer2, MessageCircle } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24 md:py-32">
      
      {/* Section Header */}
      <div className="mb-20 md:mb-32 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-kinetik-black mb-6 leading-[1.1] tracking-tight">
          Powerful features for <br />
          <span className="text-gray-400">modern product teams.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl leading-relaxed">
          Everything you need to manage projects, collaborate with your team, and track productivity in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Feature 1 - Easy Setup */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-framer border border-gray-100 flex flex-col h-[480px] md:h-[540px] overflow-hidden transition-all duration-500 hover:shadow-framer-lg hover:-translate-y-1">
          <div className="relative z-20 mb-auto">
             <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-gray-200">
                <Plus size={24} />
             </div>
             <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Easy setup</h3>
             <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-[260px]">
               Create your workspace and invite your team. Get everything ready in minutes.
             </p>
          </div>
          
          {/* Visual: Floating UI Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-gray-50/50 to-transparent">
             <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] h-[240px] bg-white rounded-t-3xl shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 flex flex-col gap-4 group-hover:translate-y-[-10px] transition-transform duration-500">
                {/* Simulated Input */}
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Add Team Members</span>
                   <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full">3 Left</span>
                </div>
                <div className="flex gap-2">
                   <div className="flex-1 h-10 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-3 text-xs text-gray-400">
                      email@company.com
                   </div>
                   <div className="h-10 px-4 bg-gray-900 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-gray-200 cursor-pointer hover:bg-black transition-colors">
                      Invite
                   </div>
                </div>
                {/* Simulated List */}
                <div className="space-y-3 mt-2">
                   {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: `${i * 200}ms` }}>
                         <div className={`w-8 h-8 rounded-full ${i===1 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'} flex items-center justify-center text-[10px] font-bold`}>
                            {i===1 ? 'JD' : 'AS'}
                         </div>
                         <div className="flex-1">
                            <div className="h-2 w-20 bg-gray-100 rounded-full mb-1.5"></div>
                            <div className="h-1.5 w-12 bg-gray-50 rounded-full"></div>
                         </div>
                         <div className="text-green-500"><CheckCircle2 size={16} /></div>
                      </div>
                   ))}
                </div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute top-10 right-10 bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-50 flex items-center gap-2 animate-bounce duration-[3000ms]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-600">Active</span>
             </div>
          </div>
        </div>

        {/* Feature 2 - Collaborate */}
        <div className="group relative bg-[#f8f7f4] rounded-[2.5rem] p-8 md:p-10 border border-gray-100/50 flex flex-col h-[480px] md:h-[540px] overflow-hidden transition-all duration-500 hover:shadow-framer-lg hover:-translate-y-1">
           <div className="relative z-20 mb-auto">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 text-gray-900 shadow-sm border border-gray-100">
                <Users size={24} />
             </div>
             <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Collaborate</h3>
             <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-[260px]">
               Assign tasks and keep communication clear. Everyone stays aligned.
             </p>
           </div>

           {/* Visual: Chat/Cursor Simulation */}
           <div className="absolute inset-0 top-[180px] flex items-center justify-center pointer-events-none">
              {/* Card Container */}
              <div className="relative w-[260px] md:w-[280px] h-[320px] bg-white rounded-3xl shadow-framer p-5 transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-500 border border-gray-100">
                 {/* Header */}
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                       <span className="text-xs font-bold text-gray-700">Design System</span>
                    </div>
                    <div className="flex -space-x-1">
                       <div className="w-5 h-5 rounded-full bg-gray-100 border border-white"></div>
                       <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
                    </div>
                 </div>
                 {/* Content Lines */}
                 <div className="space-y-3 mb-6 opacity-30">
                    <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-gray-200 rounded-full"></div>
                    <div className="h-2 w-4/6 bg-gray-200 rounded-full"></div>
                    <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                 </div>

                 {/* Comment Bubble */}
                 <div className="absolute top-20 right-[-20px] bg-gray-900 text-white px-4 py-3 rounded-2xl rounded-bl-none shadow-xl transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-start gap-2 max-w-[140px]">
                    <MessageCircle size={12} className="shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium leading-normal">Let's make this section pop a bit more!</p>
                 </div>
                 
                 {/* Cursor User 1 */}
                 <div className="absolute bottom-24 left-[-10px] transform transition-transform duration-700 group-hover:translate-x-4 group-hover:-translate-y-4">
                     <MousePointer2 className="w-5 h-5 text-blue-500 fill-blue-500 stroke-white stroke-[2px] drop-shadow-md" />
                     <div className="ml-4 -mt-1 bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">Mike</div>
                 </div>

                 {/* Cursor User 2 */}
                 <div className="absolute top-32 right-8 transform transition-transform duration-700 delay-100 group-hover:-translate-x-4 group-hover:translate-y-2 opacity-0 group-hover:opacity-100">
                     <MousePointer2 className="w-5 h-5 text-amber-500 fill-amber-500 stroke-white stroke-[2px] drop-shadow-md" />
                     <div className="ml-4 -mt-1 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">Sarah</div>
                 </div>

                 <div className="absolute bottom-6 right-6 w-32 bg-gray-50 rounded-xl p-2 flex items-center gap-2 border border-gray-100">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-[8px] font-bold text-purple-600">SJ</div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Feature 3 - Track Growth */}
        <div className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-framer border border-gray-100 flex flex-col h-[480px] md:h-[540px] overflow-hidden transition-all duration-500 hover:shadow-framer-lg hover:-translate-y-1">
           <div className="relative z-20 mb-auto">
             <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 shadow-sm border border-orange-100/50">
                <BarChart3 size={24} />
             </div>
             <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Track growth</h3>
             <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-[260px]">
               Use dashboards to monitor progress, trends, and what matters most.
             </p>
           </div>

           {/* Visual: Charts */}
           <div className="absolute bottom-0 right-0 w-full h-[320px] overflow-hidden">
              {/* Background Chart (Faded) */}
              <div className="absolute bottom-[-20px] right-[-30px] opacity-[0.03] transform scale-150 pointer-events-none">
                 <PieChart size={240} />
              </div>

              {/* Main Floating Chart Card */}
              <div className="absolute bottom-8 right-8 left-8 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end mb-6">
                     <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-wider">Weekly Visits</div>
                        <div className="text-3xl font-display font-bold text-gray-900">24.5k</div>
                     </div>
                     <div className="text-green-600 bg-green-50 px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                        <ArrowUpRight size={14} /> 12.5%
                     </div>
                  </div>
                  
                  {/* Bars */}
                  <div className="flex items-end justify-between gap-3 h-28">
                     {[35, 55, 45, 70, 50, 85, 60].map((h, i) => (
                        <div key={i} className="flex-1 bg-gray-50 rounded-t-sm relative group/bar overflow-hidden rounded-b-sm">
                           {/* Static Bar */}
                           <div className="absolute bottom-0 left-0 right-0 bg-gray-100 h-full rounded-sm"></div>
                           
                           {/* Animated Fill */}
                           <div 
                              className="absolute bottom-0 left-0 right-0 bg-gray-900 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) rounded-sm" 
                              style={{ 
                                height: `${h}%`, 
                                opacity: 0,
                                animation: 'rise 1s forwards',
                                animationDelay: `${i * 100}ms`
                              }}
                           ></div>
                           
                           {/* Hover effect hack - using inline styles for dynamic hover state is tricky in pure JSX/Tailwind without arbitrary values or CSS, utilizing group-hover on parent to trigger all */}
                           <div className="absolute inset-0 bg-gray-900 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ height: `${h}%` }}></div>
                        </div>
                     ))}
                  </div>
                  
                  {/* X-Axis Labels */}
                  <div className="flex justify-between mt-3 px-1">
                     {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <span key={i} className="text-[10px] font-bold text-gray-300">{d}</span>
                     ))}
                  </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};