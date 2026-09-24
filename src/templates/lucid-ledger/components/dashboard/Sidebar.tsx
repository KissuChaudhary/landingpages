'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  PieChart, 
  ArrowLeftRight, 
  FileText,
  Repeat,
  ShieldCheck,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '@/templates/lucid-ledger/lib/utils';
import { motion } from 'motion/react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

const NavItem = ({ icon: Icon, label, active, badge }: NavItemProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-[#141414] text-white shadow-lg" 
          : "text-slate-500 hover:bg-slate-100/80 hover:text-[#141414]"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-[#141414]")} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="px-4 mt-8 mb-3 text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">
    {children}
  </h3>
);

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col z-50">
      {/* Logo */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Zap fill="white" size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#141414]">Fundora</span>
        <div className="ml-auto w-6 h-6 border border-slate-200 rounded flex items-center justify-center text-slate-400">
          <span className="text-[10px]">⌘</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-slate-50 border border-transparent focus:border-blue-600/20 focus:bg-white rounded-xl py-3 pl-11 pr-12 text-sm outline-none transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-1 scrollbar-hide">
        <SectionHeader>Main Menu</SectionHeader>
        <NavItem icon={LayoutDashboard} label="Home" active />
        <NavItem icon={Wallet} label="Wallets" />
        <NavItem icon={PieChart} label="Analytics" badge={20} />
        <NavItem icon={ArrowLeftRight} label="Transactions" />
        <NavItem icon={FileText} label="Invoices" />

        <SectionHeader>Features</SectionHeader>
        <NavItem icon={Repeat} label="Recurring" />
        <NavItem icon={ShieldCheck} label="Subscriptions" />
        <NavItem icon={MessageSquare} label="Feedback" />

        <SectionHeader>General</SectionHeader>
        <NavItem icon={Settings} label="Settings" />
        <NavItem icon={HelpCircle} label="Help Desk" />
        <NavItem icon={LogOut} label="Log out" />

        {/* Upgrade Card */}
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-[#141414] mb-1">Starter Plan</h4>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
              Upgrade to the enterprise plan & get attractive discounts
            </p>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200">
              Upgrade Plan
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </aside>
  );
}
