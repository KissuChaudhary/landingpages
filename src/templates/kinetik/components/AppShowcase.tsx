import React from 'react';
import { Search, Plus, Bell, MoreHorizontal, Filter, ChevronDown, Moon, Zap } from 'lucide-react';

export const AppShowcase: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-20 md:pb-32 relative">
      
      {/* Main App Interface Container */}
      <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-framer-xl border border-gray-100 overflow-hidden relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        
        {/* App Header Simulation */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
           <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
               <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <Zap size={10} className="text-white" fill="currentColor" />
               </div>
               <span className="font-bold text-sm">Kinetik</span>
             </div>
             <div className="hidden md:flex items-center text-gray-400 text-xs gap-4">
               <span className="hover:text-black cursor-pointer">File</span>
               <span className="hover:text-black cursor-pointer">Edit</span>
               <span className="hover:text-black cursor-pointer">View</span>
             </div>
           </div>
           
           {/* Search Bar Simulation */}
           <div className="flex-1 max-w-md mx-8 hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-500">
             <Search size={14} className="mr-2 opacity-50" />
             Search for anything...
           </div>

           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <img key={i} src={`https://picsum.photos/seed/${i + 10}/50/50`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-500">+2</div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg"><Bell size={16} className="text-gray-400" /></button>
           </div>
        </div>

        {/* App Body Simulation */}
        <div className="flex h-[600px] md:h-[700px]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-100 p-6 hidden md:flex flex-col gap-6 bg-white">
             <div className="space-y-1">
               {['Home', 'Messages', 'Tasks', 'Members', 'Settings'].map((item, i) => (
                 <div key={item} className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-3 ${i === 2 ? 'bg-gray-50 text-black' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <div className={`w-4 h-4 rounded ${i===2 ? 'bg-black' : 'bg-gray-200'}`}></div>
                    {item}
                 </div>
               ))}
             </div>

             <div className="pt-4 border-t border-gray-100">
                <p className="px-3 text-xs font-semibold text-gray-400 mb-3">PROJECTS</p>
                {['App Design', 'Website Redesign', 'Design System', 'Wireframes'].map((item, i) => (
                  <div key={item} className="px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${i===0 ? 'bg-yellow-400' : 'bg-transparent border border-gray-300'}`}></div>
                     {item}
                  </div>
                ))}
             </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-50/50 p-8 overflow-hidden">
             <div className="flex justify-between items-end mb-8">
               <div>
                 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                   App Design 
                   <div className="flex gap-1 text-gray-300"><div className="w-4 h-4 bg-gray-200 rounded-full"/></div>
                 </h1>
               </div>
               <div className="flex gap-3">
                  <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-2">
                    <Filter size={12} /> Filter <ChevronDown size={12} />
                  </button>
                  <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-2">
                    Today <ChevronDown size={12} />
                  </button>
               </div>
             </div>

             {/* Kanban Board Simulation */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
               {/* Column 1 */}
               <div className="space-y-4">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-semibold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-gray-300 rounded-full"></div>To Do</span>
                   <span className="text-xs text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">4</span>
                 </div>
                 <TaskCard tag="Low" tagColor="bg-orange-100 text-orange-600" title="Brainstorming" image={false} />
                 <TaskCard tag="High" tagColor="bg-rose-100 text-rose-600" title="Research" image={true} imgSrc="https://picsum.photos/seed/arch/300/200" />
               </div>

               {/* Column 2 */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-semibold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div>On Progress</span>
                   <span className="text-xs text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">3</span>
                 </div>
                 <TaskCard tag="Low" tagColor="bg-yellow-100 text-yellow-700" title="Onboarding Illustrations" image={true} imgSrc="https://picsum.photos/seed/illu/300/200" />
                 <TaskCard tag="Low" tagColor="bg-orange-100 text-orange-600" title="Moodboard" image={true} imgSrc="https://picsum.photos/seed/mood/300/150" />
               </div>

               {/* Column 3 */}
               <div className="space-y-4 hidden md:block">
                  <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-semibold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Done</span>
                   <span className="text-xs text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded">2</span>
                 </div>
                 <TaskCard tag="Completed" tagColor="bg-green-100 text-green-700" title="Desktop App Design" image={true} imgSrc="https://picsum.photos/seed/desk/300/200" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ tag, tagColor, title, image, imgSrc }: any) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${tagColor} inline-block mb-3`}>{tag}</span>
    <h4 className="text-sm font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-[10px] text-gray-400 mb-3 line-clamp-2">Brainstorming brings team members' diverse experience into play.</p>
    {image && (
      <div className="rounded-lg overflow-hidden mb-3 h-32 w-full">
        <img src={imgSrc} alt="Task" className="w-full h-full object-cover" />
      </div>
    )}
    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
       <div className="flex -space-x-1.5">
         <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
         <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
       </div>
       <div className="flex gap-3 text-[10px] text-gray-400">
         <span>12 comments</span>
         <span>0 files</span>
       </div>
    </div>
  </div>
);
