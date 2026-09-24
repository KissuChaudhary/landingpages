import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  BarChart3,
  CreditCard,
  FileText,
  Headphones,
  LayoutGrid,
  MessageSquare,
  Newspaper,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShoppingBag,
  User,
  UserPlus,
  Users,
  Wallet,
  Eye,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Clock,
  Sparkles,
  PieChart
} from "lucide-react";
import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans text-[#111]">
      <Sidebar />
      <main className="flex-1 p-[24px] sm:p-[32px] lg:p-[40px] xl:pr-[56px] pb-24 overflow-x-hidden">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          <PocketCard
            title="Main wallet"
            amount="$1,245.50"
            badgeText="+$120"
            badgeType="positive"
          />
          <PocketCard
            title="Saving pocket"
            amount="$3,820.00"
            badgeText="+$250"
            badgeType="positive"
          />
          <PocketCard
            title="Daily spending"
            amount="$48.50"
            badgeText="-$15"
            badgeType="negative"
          />
          <PocketCard
            title="Bills pocket"
            amount="$560.00"
            badgeText="2 bills due"
            badgeType="warning"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          <AssetBreakdownCard />
          <SummaryCard />
        </div>

        <div className="mt-8 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-[20px] font-semibold tracking-tight">Smart spending alerts</h2>
          <div className="flex items-center gap-2">
            <div className="relative h-[44px] flex items-center">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-[44px] w-[200px] pl-[44px] pr-[16px] rounded-full bg-white border border-black/5 text-[14px] focus:outline-none focus:ring-2 focus:ring-black/5 shadow-sm"
              />
            </div>
            <div className="h-[44px] px-[16px] flex items-center gap-2 rounded-full bg-white border border-black/5 cursor-pointer shadow-sm text-[14px]">
              <span className="text-gray-500 whitespace-nowrap">Sort by:</span>
              <span className="font-semibold whitespace-nowrap">Urgency</span>
              <ArrowDownToLine className="w-4 h-4 ml-1 opacity-50" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <AlertCard />
        </div>
      </main>
    </div>
  );
}

// -- Components --

function Sidebar() {
  return (
    <aside className="w-[260px] bg-[#F7F7F7] border-r border-[#EAEAEA] flex flex-col py-6 flex-shrink-0 sticky top-0 h-screen overflow-y-auto hidden lg:flex">
      <div className="px-6 pb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-mint flex items-center justify-center text-mint">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
        </div>
        <span className="text-[20px] font-bold tracking-tight">Minto</span>
      </div>

      <div className="px-4">
        <ul className="space-y-1">
          <NavItem icon={<LayoutGrid size={18} />} label="Dashboard" active />
          <NavItem icon={<User size={18} />} label="Account" />
          <NavItem icon={<CreditCard size={18} />} label="Cards" />
          <NavItem icon={<PieChart size={18} />} label="Transaction" />
          <NavItem icon={<RefreshCw size={18} />} label="Payees" />
          <NavItem icon={<Users size={18} />} label="Spend groups" />
        </ul>

        <div className="my-6 border-t border-dashed border-[#DFDFDF] mx-3" />

        <ul className="space-y-1">
          <NavItem icon={<FileText size={18} />} label="Invoices" />
          <NavItem icon={<BarChart3 size={18} />} label="Reports" />
          <NavItem icon={<UserPlus size={18} />} label="Community" />
          <NavItem icon={<Newspaper size={18} />} label="News" />
        </ul>

        <div className="mt-auto pt-10">
          <ul className="space-y-1">
            <NavItem icon={<MessageSquare size={18} />} label="Feedback" />
            <NavItem icon={<Headphones size={18} />} label="Help" />
            <NavItem icon={<Settings size={18} />} label="Setting" />
          </ul>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <li>
      <a
        href="#"
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-[16px] text-[15px] transition-colors font-medium",
          active ? "bg-[#ECECEC] text-[#111]" : "text-gray-500 hover:text-[#111] hover:bg-[#F2F2F2]"
        )}
      >
        <span className={cn(active ? "text-[#111] font-bold" : "text-gray-400 stroke-[2px]")}>{icon}</span>
        <span className={cn(active ? "font-bold" : "")}>{label}</span>
      </a>
    </li>
  );
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="text-[36px] xl:text-[42px] font-bold tracking-tight leading-none -ml-1">Dashboard overview</h1>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
        <HeaderButton icon={<ArrowDownToLine size={16} />} label="Deposit" />
        <HeaderButton icon={<ArrowUpFromLine size={16} />} label="Withdraw" />
        <HeaderButton icon={<ArrowRightLeft size={16} />} label="Transfer" />
        <button className="flex items-center gap-2 h-[44px] pl-2 pr-5 rounded-full bg-mint text-[#111] font-semibold text-[14px] hover:opacity-90 transition-opacity flex-shrink-0">
          <div className="w-[30px] h-[30px] rounded-full bg-black/10 flex items-center justify-center">
             <Plus size={16} className="text-[#111] stroke-[2.5px]" />
          </div>
          New transaction
        </button>
      </div>
    </div>
  );
}

function HeaderButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 h-[44px] pl-1.5 pr-4 rounded-full bg-white border border-black/5 hover:bg-gray-50 transition-colors flex-shrink-0 shadow-sm font-semibold text-[14px] text-[#111]">
      <div className="w-[32px] h-[32px] rounded-full bg-[#F5F5F5] flex flex-col items-center justify-center">
        <span className="text-gray-500">{icon}</span>
      </div>
      {label}
    </button>
  );
}

function PocketCard({
  title,
  amount,
  badgeText,
  badgeType,
}: {
  title: string;
  amount: string;
  badgeText: string;
  badgeType: "positive" | "negative" | "warning";
}) {
  return (
    <div className="bg-[#EFEFEF] rounded-[24px] overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="px-2 pt-2 pb-2">
        <div className="text-[13px] text-gray-500 font-medium px-4 py-1">{title}</div>
      </div>
      <div className="bg-white mx-2 mb-2 mt-0 rounded-[20px] p-5 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="text-[14px] text-gray-400 mb-1 font-medium">Balance</div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
          <div className="text-[26px] xl:text-[28px] font-bold tracking-tight text-[#111]">{amount}</div>
          <Badge text={badgeText} type={badgeType} />
        </div>
        <div className="mt-6 flex items-center cursor-pointer group text-[14px] font-semibold text-[#111]">
          View details 
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function Badge({ text, type }: { text: string; type: "positive" | "negative" | "warning" }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap overflow-hidden border border-black/5 shadow-sm",
        type === "positive" && "text-green-700 bg-white",
        type === "negative" && "text-red-500 bg-white",
        type === "warning" && "text-[#FF4F7B] bg-white"
      )}
    >
      {type === "positive" && <TrendingUp className="w-3.5 h-3.5 text-mint bg-[#DDF3D8] rounded-full p-[2px] stroke-[3px]" />}
      {type === "negative" && <TrendingDown className="w-3.5 h-3.5 text-[#FF4F7B] bg-[#FFE3EB] rounded-full p-[2px] stroke-[3px]" />}
      {type === "warning" && <ShieldAlert className="w-3.5 h-3.5 text-[#FF4F7B] bg-[#FFE3EB] rounded-full p-[2px]" />}
      <span>{text}</span>
    </div>
  );
}

function AssetBreakdownCard() {
  return (
    <div className="bg-[#EFEFEF] rounded-[24px] overflow-hidden flex flex-col">
      <div className="px-2 pt-2 pb-2">
        <div className="text-[13px] text-gray-500 font-medium px-4 py-1">Pocket asset breakdown</div>
      </div>
      
      <div className="bg-white mx-2 mb-2 mt-0 rounded-[20px] p-5 lg:p-6 flex-1">
        <div className="text-[14px] text-gray-500 mb-2 font-medium">
          Your money moved <span className="text-[#71D45B] font-semibold">+4.1%</span> compared to last month
        </div>
        <div className="text-[28px] font-bold tracking-tight mb-6">4 pockets</div>

        <div className="flex h-[20px] w-full rounded-full gap-1 mb-6">
          <div className="bg-[#DDF3D8] w-[44%] rounded-l-full relative cursor-pointer hover:opacity-90 transition-opacity overflow-hidden">
             <div className="absolute inset-x-0 bottom-0 h-1 bg-mint/20"></div>
          </div>
          <div className="bg-[#FBE4D4] w-[18%] cursor-pointer hover:opacity-90 transition-opacity"></div>
          <div className="bg-[#DDEFFC] w-[28%] cursor-pointer hover:opacity-90 transition-opacity"></div>
          <div className="bg-[#EAEAEA] w-[10%] rounded-r-full cursor-pointer hover:opacity-90 transition-opacity"></div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-6 px-1">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[40px] h-[40px] rounded-full bg-mint flex items-center justify-center text-white shadow-sm">
              <Wallet className="w-[18px] h-[18px] fill-white stroke-none" />
            </div>
            <span className="text-[13px] font-semibold text-[#111]">Main - 44%</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-[40px] h-[40px] rounded-full bg-[#F5A26A] flex items-center justify-center text-white shadow-sm">
              <Plane className="w-[18px] h-[18px] fill-white stroke-none" />
            </div>
            <span className="text-[13px] font-semibold text-[#111]">Trip - 18%</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-[40px] h-[40px] rounded-full bg-[#8CC8F5] flex items-center justify-center text-white shadow-sm">
              <ShoppingBag className="w-[18px] h-[18px] fill-white stroke-none" />
            </div>
            <span className="text-[13px] font-semibold text-[#111]">Daily - 28%</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-[40px] h-[40px] rounded-full bg-gray-300 flex items-center justify-center text-white shadow-sm">
              <LayoutGrid className="w-[18px] h-[18px] fill-white stroke-none" />
            </div>
            <span className="text-[13px] font-semibold text-[#111]">Other - 10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="bg-[#EFEFEF] rounded-[24px] overflow-hidden flex flex-col justify-between">
      <div className="px-2 pt-2 pb-2">
        <div className="text-[13px] text-gray-500 font-medium px-4 py-1">Summary and growth</div>
      </div>
      
      <div className="bg-white mx-2 mb-2 mt-0 rounded-[20px] p-5 lg:p-6 flex-1 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-[14px] text-gray-400 mb-1 font-medium">Total balance</div>
            <div className="text-[28px] font-bold tracking-tight leading-none">$4,800.00</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-[36px] px-3 rounded-full bg-white border border-black/5 hover:bg-gray-50 font-semibold text-[13px] transition-colors shadow-sm">
              <ArrowUpFromLine size={14} className="text-gray-500 stroke-[2.5px]" /> Share
            </button>
            <button className="flex items-center gap-1.5 h-[36px] px-3 rounded-full bg-white border border-black/5 hover:bg-gray-50 font-semibold text-[13px] transition-colors shadow-sm">
              <Settings size={14} className="text-gray-500 stroke-[2.5px]" /> Manage
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-semibold">Monthly saving goal</span>
            <span className="text-[14px] text-gray-500 font-semibold">$750 / $3,000 (25%)</span>
          </div>
          <div className="h-[20px] w-full rounded-full bg-[#DDF3D8] overflow-hidden flex items-center px-1">
            <div className="h-[12px] rounded-full bg-mint" style={{ width: '25%' }}></div>
          </div>
          <div className="mt-2 text-[13px] text-gray-500 font-medium">
            Saving goal set for Dream trip pocket
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCard() {
  return (
    <div className="bg-[#EFEFEF] rounded-[24px] overflow-hidden flex flex-col relative mt-2">
      <div className="px-2 pt-2 pb-2">
        <div className="text-[13px] text-gray-500 font-medium px-4 py-1">Pocket #003</div>
      </div>
      
      <div className="bg-white mx-2 mb-2 mt-0 rounded-[20px] p-5 shadow-sm flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-full bg-[#F5A26A] flex items-center justify-center text-white shadow-sm">
                <Plane className="w-[24px] h-[24px] fill-white stroke-none" />
            </div>
            <div>
              <div className="text-[24px] font-bold tracking-tight leading-none mb-1">Pocket #003</div>
              <div className="text-gray-500 text-[14px] font-medium">Trip</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 h-[40px] px-4 rounded-full bg-white border border-black/5 hover:bg-gray-50 font-semibold text-[14px] transition-colors shadow-sm">
              <UserPlus size={16} className="text-gray-500 stroke-[2px]" /> Add friend
            </button>
            <button className="flex items-center gap-1.5 h-[40px] px-4 rounded-full bg-white border border-black/5 hover:bg-gray-50 font-semibold text-[14px] transition-colors shadow-sm">
              <Eye size={16} className="text-gray-500 stroke-[2px]" /> Review
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col justify-center border border-black/5">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-1.5 font-medium">
              <Shield className="w-4 h-4 text-gray-400" />
              Risk level
            </div>
            <div className="font-semibold text-[15px] text-[#111]">High spending</div>
          </div>
          
          <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col justify-center border border-black/5">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-1.5 font-medium">
              <CircleDollarSign className="w-4 h-4 text-gray-400" />
              Daily spend
            </div>
            <div className="font-semibold text-[15px] text-[#111]">$120</div>
          </div>

          <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col justify-center border border-black/5">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-1.5 font-medium">
              <Clock className="w-4 h-4 text-gray-400" />
              Trend
            </div>
            <div className="font-semibold text-[15px] text-[#111]">Next 4 days</div>
          </div>

          <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col justify-center border border-black/5">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Confidence
            </div>
            <div className="font-semibold text-[15px] text-[#111]">55%</div>
          </div>
        </div>

        <div className="mt-4 text-[13px] text-gray-500 pl-1 font-medium">
          Transaction affected by trend
        </div>
      </div>
    </div>
  );
}
