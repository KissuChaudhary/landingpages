'use client';

import Sidebar from '@/templates/lucid-ledger/components/dashboard/Sidebar';
import Header from '@/templates/lucid-ledger/components/dashboard/Header';
import { EarningOverview, SpendingOverview } from '@/templates/lucid-ledger/components/dashboard/OverviewCards';
import CashFlowChart from '@/templates/lucid-ledger/components/dashboard/CashFlowChart';
import UpcomingBills from '@/templates/lucid-ledger/components/dashboard/UpcomingBills';
import RecentTransactions from '@/templates/lucid-ledger/components/dashboard/RecentTransactions';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-600">
      <Sidebar />
      <div className="pl-[280px]">
        <Header />
        <main className="p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Top Row: Earning & Spending */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <div className="col-span-12 lg:col-span-7">
              <EarningOverview />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <SpendingOverview />
            </div>
          </div>

          {/* Middle Row: Cash Flow & Upcoming Bills */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <div className="col-span-12 lg:col-span-8">
              <CashFlowChart />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <UpcomingBills />
            </div>
          </div>

          {/* Bottom Row: Recent Transactions */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <RecentTransactions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
