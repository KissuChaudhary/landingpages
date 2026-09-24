"use client";

import { useState } from "react";
import { Sidebar } from "@/templates/apex-dashboard/components/Sidebar";
import { Menu, X } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-bg-canvas text-primary font-sans overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer / Desktop Fixed */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        {/* Mobile Header for Menu Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-bg-canvas sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-orange flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(255,138,0,0.4)]">
              O
            </div>
            <span className="font-semibold text-lg tracking-tight">Orbit</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-6 md:px-6 lg:px-8">
          <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6 lg:gap-8 pb-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
