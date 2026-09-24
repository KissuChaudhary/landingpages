'use client';

import React from 'react';
import { 
  HelpCircle, 
  Mail, 
  Bell,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="h-[90px] px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold text-[#141414] flex items-center gap-2">
          Welcome back, Sujon <span className="animate-bounce-slow">👋</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
            <HelpCircle size={20} />
          </button>
          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
            <Mail size={20} />
          </button>
          <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-slate-100"></div>

        {/* User Profile */}
        <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
            <Image 
              src="https://picsum.photos/seed/user/200/200" 
              alt="Sujon Hossain" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#141414]">Sujon Hossain</p>
            <p className="text-[11px] text-slate-400">sujon.hossain758</p>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-[#141414] transition-colors" />
        </button>
      </div>
    </header>
  );
}
