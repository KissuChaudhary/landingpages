"use client";

import { motion } from "motion/react";
import { 
  Building2, 
  ChevronDown, 
  FolderOpen, 
  LayoutDashboard, 
  LineChart, 
  Search, 
  Settings, 
  Users 
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderOpen, label: "Workspace" },
  { icon: Building2, label: "Business Hub" },
  { icon: Users, label: "Clients" },
  { icon: Building2, label: "Companies" },
  { icon: LineChart, label: "Growth Report" },
];

const favorites = [
  { name: "Apple", type: "COMPANY", icon: "🍎" },
  { name: "Google", type: "COMPANY", icon: "G" },
  { name: "Figma", type: "COMPANY", icon: "🎨" },
  { name: "Aman", type: "DESIGNER", icon: "👨‍🎨" },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div 
      className="w-[280px] h-screen flex flex-col flex-shrink-0"
      style={{
        background: "linear-gradient(180deg, rgba(18,18,20,1) 0%, rgba(12,12,14,1) 100%)",
      }}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-orange flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(255,138,0,0.4)]">
            O
          </div>
          <span className="font-semibold text-lg tracking-tight">Orbit</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-secondary hover:text-primary transition-colors p-2 -mr-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <button className="hidden lg:block text-secondary hover:text-primary transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="M9 3v18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-5 mb-8 mt-2">
        <div className="h-[42px] px-3 rounded-[14px] bg-white/5 border border-white/5 flex items-center gap-2 text-muted focus-within:text-primary focus-within:border-white/10 transition-colors group">
          <Search className="w-[18px] h-[18px] transition-colors" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent flex-1 outline-none text-sm font-medium placeholder:text-muted" 
          />
          <div className="border border-white/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider opacity-60">
            ⌘ K
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-8 scrollbar-hide">
        {/* Navigation */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-mono tracking-widest text-muted uppercase">Navigation</div>
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3 px-3 h-[44px] rounded-[16px] transition-all duration-220 ${
                  item.active 
                    ? "text-primary" 
                    : "text-secondary hover:text-primary hover:bg-white/5"
                }`}
                style={item.active ? {
                  background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.2)"
                } : {}}
              >
                <item.icon className={`w-[18px] h-[18px] ${item.active ? "text-accent-orange" : ""}`} strokeWidth={item.active ? 2.5 : 2} />
                <span className="font-medium text-[14px]">{item.label}</span>
                {i > 0 && <ChevronDown className="w-4 h-4 ml-auto opacity-40" />}
              </button>
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-mono tracking-widest text-muted uppercase">Favorites</div>
          <div className="space-y-1">
            {favorites.map((fav, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-3 px-3 h-[44px] rounded-[16px] text-secondary hover:text-primary hover:bg-white/5 transition-all duration-220"
              >
                <span className="w-5 flex items-center justify-center text-lg">{fav.icon}</span>
                <span className="font-medium text-[14px]">{fav.name}</span>
                <span className="ml-auto text-[10px] font-mono opacity-40 uppercase tracking-wider">{fav.type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 mt-auto">
        <div className="h-[60px] px-3 flex items-center gap-3 rounded-[16px] hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex-shrink-0 border border-white/10" />
          <div className="flex-1 overflow-hidden">
            <div className="font-medium text-[14px] truncate">Aman</div>
            <div className="text-[12px] text-muted truncate">aman@orbit.com</div>
          </div>
          <Settings className="w-[18px] h-[18px] text-muted group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  );
}
