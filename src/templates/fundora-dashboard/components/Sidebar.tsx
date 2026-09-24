import { LayoutDashboard, Wallet, PieChart, ArrowLeftRight, Settings, Repeat, DollarSign, MessageSquare, Headphones, LogOut, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  return (
    <aside className="w-[260px] bg-white h-full flex flex-col pt-6 pb-6 shadow-sm z-20">
      {/* Logo Area */}
      <div className="px-6 mb-8 flex text-[#2563EB] font-bold text-xl items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center border-4 border-white shadow-sm ring-1 ring-black/5">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.562 6.8125C13.8824 6.8125 14.1039 7.15175 13.9634 7.425L7.4634 20.0625C7.30792 20.3648 6.8125 20.2526 6.8125 19.875V11.1875H0.437996C0.117559 11.1875 -0.103857 10.8483 0.0366055 10.575L6.53661 -2.0625C6.69208 -2.36481 7.1875 -2.25265 7.1875 -1.875V6.8125H13.562Z" fill="currentColor"/>
          </svg>
        </div>
        <span className="text-[#111827]">Fundora</span>
      </div>

      {/* Search */}
      <div className="px-6 mb-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400 border border-gray-200 rounded bg-gray-50 px-1.5 py-0.5">
            <span>⌘</span><span>K</span>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 space-y-8">
        {/* Main Menu */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">Main Menu</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#111827] text-white">
                <LayoutDashboard className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <Wallet className="w-5 h-5" />
                <span className="text-sm font-medium">Wallets</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <PieChart className="w-5 h-5" />
                <span className="text-sm font-medium">Analytics</span>
                <span className="ml-auto bg-[#2563EB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">20</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <ArrowLeftRight className="w-5 h-5" />
                <span className="text-sm font-medium">Transactions</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-sm font-medium">Invoices</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">Features</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <Repeat className="w-5 h-5" />
                <span className="text-sm font-medium">Recurring</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Subscriptions</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Feedback</span>
              </a>
            </li>
          </ul>
        </div>

        {/* General */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">General</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <Headphones className="w-5 h-5" />
                <span className="text-sm font-medium">Help Desk</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors mt-2">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Upgrade Plan */}
      <div className="px-4 mt-auto">
        <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-gray-900">Starter Plan</h4>
            <p className="text-[11px] text-gray-500 mt-1 mb-3 leading-relaxed">Upgrade to the enterprise plan & get attractive discounts</p>
            <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
