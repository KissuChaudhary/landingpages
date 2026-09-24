import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  BarChart2, 
  Settings,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';

export const ProductMockup = () => {
  return (
    <div className="relative w-full mx-auto max-w-6xl group text-left font-sans">
      {/* Main Browser Window Frame - Sharp corners */}
      <div className="relative bg-white border border-ink shadow-brutalist-lg overflow-hidden flex flex-col transition-transform duration-700 ease-out group-hover:translate-y-[-4px]">
        
        {/* Browser Toolbar */}
        <div className="h-9 border-b border-ink bg-[#f5f5f5] flex items-center px-4 gap-4 flex-shrink-0 z-20">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-ink/20 border border-ink/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-ink/20 border border-ink/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-ink/20 border border-ink/40"></div>
            </div>
            <div className="flex-1 max-w-xs mx-auto bg-white h-5 rounded-sm border border-ink/10 flex items-center justify-center gap-2 px-3 opacity-60">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
                <span className="font-mono text-[9px] text-ink/40 tracking-widest uppercase">loomauth.com/users</span>
            </div>
        </div>

        {/* App Layout */}
        <div className="flex flex-1 relative bg-white min-h-[500px]">
            
            {/* Sidebar (Desktop) - Minimalist */}
            <div className="hidden md:flex w-56 border-r border-ink bg-[#FAFAFA] flex-col z-10 flex-shrink-0">
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-5 h-5 bg-ink text-white flex items-center justify-center font-serif font-bold italic text-xs rounded-sm">L</div>
                        <span className="font-serif font-bold text-base tracking-tight text-ink">LoomAuth</span>
                    </div>
                    
                    <div className="space-y-0.5">
                        <SidebarItem icon={<LayoutDashboard size={14} />} label="Overview" />
                        <SidebarItem icon={<Users size={14} />} label="Users" active />
                        <SidebarItem icon={<ShieldCheck size={14} />} label="Security" />
                        <SidebarItem icon={<Settings size={14} />} label="Configuration" />
                    </div>
                </div>
                
                <div className="mt-auto p-5 border-t border-ink/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-ink/40">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         SYSTEM OPERATIONAL
                    </div>
                </div>
            </div>

            {/* Main Content Area - The Table */}
            <div className="flex-1 flex flex-col bg-white w-full">
                
                {/* Header - Reverted to Previous "Action Oriented" Style */}
                <header className="px-6 py-6 border-b border-ink/10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="font-serif text-2xl font-bold text-ink mb-1">User Management</h1>
                        <p className="font-mono text-xs text-ink/50 flex items-center gap-2">
                            <ShieldCheck size={12} className="text-signal" />
                            Total Users: 14,203
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-ink text-xs font-mono font-bold hover:bg-paper transition-colors">
                            EXPORT LOGS
                        </button>
                        <button className="px-4 py-2 bg-ink text-white border border-ink text-xs font-mono font-bold hover:bg-signal transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                            + INVITE USER
                        </button>
                    </div>
                </header>

                {/* Table Header Row */}
                <div className="grid grid-cols-12 px-6 py-2 border-b border-ink/10 bg-[#fafafa] text-[10px] font-mono text-ink/40 uppercase tracking-wider">
                    <div className="col-span-12 md:col-span-5 pl-1">User Identity</div>
                    <div className="hidden md:block col-span-2">Role</div>
                    <div className="hidden md:block col-span-3">Last Active</div>
                    <div className="hidden md:block col-span-2 text-right pr-1">Action</div>
                </div>

                {/* Table Content - Fixed List */}
                <div className="flex-1">
                    
                    {/* Row 1: High Priority / Active */}
                    <div className="group grid grid-cols-12 px-6 py-4 border-b border-ink/10 hover:bg-[#fafafa] transition-colors items-center relative">
                        {/* Active Indicator Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-signal"></div>

                        {/* Col 1: Title & Desc */}
                        <div className="col-span-12 md:col-span-5 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[9px] font-bold text-signal bg-signal/10 px-1.5 py-0.5 uppercase tracking-wide">Admin</span>
                                <span className="font-mono text-[9px] text-ink/40">ID: #9921</span>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-ink mb-1 group-hover:text-signal transition-colors cursor-pointer">
                                alex@loomauth.com
                            </h3>
                            <p className="font-serif italic text-xs text-ink/50 line-clamp-1">
                                GitHub Provider • MFA Enabled
                            </p>
                        </div>

                        {/* Col 2: Tags */}
                        <div className="hidden md:flex col-span-2 flex-col gap-1 items-start">
                            <Tag>Super Admin</Tag>
                        </div>

                        {/* Col 3: Metrics */}
                        <div className="hidden md:flex col-span-3 flex-col gap-0.5 justify-center">
                            <Metric label="IP" value="192.168.1.1" />
                            <Metric label="LOC" value="US-EAST" />
                        </div>

                        {/* Col 4: Action */}
                        <div className="hidden md:flex col-span-2 justify-end">
                            <button className="flex items-center gap-2 px-4 py-2 bg-ink text-white font-mono text-xs font-bold hover:bg-signal transition-colors group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                MANAGE
                            </button>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="group grid grid-cols-12 px-6 py-4 border-b border-ink/10 hover:bg-[#fafafa] transition-colors items-center">
                        <div className="col-span-12 md:col-span-5 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[9px] text-ink/40">ID: #4421</span>
                            </div>
                            <h3 className="font-serif text-lg font-medium text-ink/90 mb-1 group-hover:text-ink transition-colors cursor-pointer">
                                sarah@techcorp.io
                            </h3>
                            <p className="font-serif italic text-xs text-ink/50 line-clamp-1">
                                Google Provider • Single Sign-On
                            </p>
                        </div>
                        <div className="hidden md:flex col-span-2 flex-col gap-1 items-start">
                            <Tag>Editor</Tag>
                        </div>
                        <div className="hidden md:flex col-span-3 flex-col gap-0.5 justify-center">
                            <Metric label="IP" value="10.0.0.52" />
                            <Metric label="LOC" value="EU-WEST" />
                        </div>
                        <div className="hidden md:flex col-span-2 justify-end">
                             <button className="px-3 py-1.5 border border-ink/20 text-ink/60 font-mono text-xs hover:border-ink hover:text-ink transition-colors">
                                DETAILS
                            </button>
                        </div>
                    </div>

                     {/* Row 3 */}
                     <div className="group grid grid-cols-12 px-6 py-4 border-b border-ink/10 hover:bg-[#fafafa] transition-colors items-center">
                        <div className="col-span-12 md:col-span-5 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[9px] text-ink/40">ID: #1293</span>
                            </div>
                            <h3 className="font-serif text-lg font-medium text-ink/90 mb-1 group-hover:text-ink transition-colors cursor-pointer">
                                dev@freelance.net
                            </h3>
                            <p className="font-serif italic text-xs text-ink/50 line-clamp-1">
                                Email Magic Link • Verified
                            </p>
                        </div>
                        <div className="hidden md:flex col-span-2 flex-col gap-1 items-start">
                            <Tag>Viewer</Tag>
                        </div>
                        <div className="hidden md:flex col-span-3 flex-col gap-0.5 justify-center">
                            <Metric label="IP" value="172.16.0.1" />
                            <Metric label="LOC" value="ASIA-SE" />
                        </div>
                        <div className="hidden md:flex col-span-2 justify-end">
                             <button className="px-3 py-1.5 border border-ink/20 text-ink/60 font-mono text-xs hover:border-ink hover:text-ink transition-colors">
                                DETAILS
                            </button>
                        </div>
                    </div>

                     {/* Row 4 */}
                     <div className="hidden md:grid group grid-cols-12 px-6 py-4 opacity-50 hover:opacity-100 transition-opacity items-center">
                        <div className="col-span-12 md:col-span-5 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[9px] text-ink/40">ID: #0022</span>
                            </div>
                            <h3 className="font-serif text-lg font-medium text-ink/90 mb-1">
                                bot@crawler.com
                            </h3>
                        </div>
                         <div className="hidden md:flex col-span-2 flex-col gap-1 items-start">
                            <Tag>Suspended</Tag>
                        </div>
                        <div className="hidden md:flex col-span-3 flex-col gap-0.5 justify-center">
                            <Metric label="IP" value="192.168.x.x" />
                        </div>
                        <div className="hidden md:flex col-span-2 justify-end">
                             <div className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-ink/20">
                                <MoreHorizontal size={12} />
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
      
      {/* Decorative Elements - Sharp corners */}
      <div className="absolute -z-10 top-12 -right-4 w-full h-full border border-dashed border-ink/20 bg-transparent"></div>
    </div>
  );
};

// --- Sub Components ---

const SidebarItem = ({ icon, label, active }: { icon: any, label: string, active?: boolean }) => (
    <div className={`
        flex items-center gap-3 px-3 py-2.5 mx-2 rounded-md cursor-pointer transition-all
        ${active 
            ? 'bg-ink text-white font-medium shadow-sm' 
            : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
        }
    `}>
        {icon}
        <span className="text-xs font-sans tracking-wide">{label}</span>
    </div>
);

const Tag = ({ children }: { children?: React.ReactNode }) => (
    <span className="px-1.5 py-0.5 text-[9px] font-mono border border-ink/10 text-ink/60 bg-white rounded-sm whitespace-nowrap">
        {children}
    </span>
);

const Metric = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center gap-2 font-mono text-[10px]">
        <span className="text-ink/30 w-6 text-right">{label}</span>
        <span className="font-bold text-ink/80">{value}</span>
    </div>
);