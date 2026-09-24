import { Header } from '@/templates/fundora-dashboard/components/Header';
import { Sidebar } from '@/templates/fundora-dashboard/components/Sidebar';
import { EarningOverview } from '@/templates/fundora-dashboard/components/EarningChart';
import { SpendingOverview } from '@/templates/fundora-dashboard/components/SpendingBar';
import { CashFlowChart } from '@/templates/fundora-dashboard/components/CashFlowChart';
import { UpcomingBills } from '@/templates/fundora-dashboard/components/UpcomingBills';
import { RecentTransactions } from '@/templates/fundora-dashboard/components/RecentTransactions';

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header />
        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-0 custom-scrollbar">
          <div className="grid grid-cols-12 gap-6 w-full">
            {/* Top Row: Earning (7) and Spending (5) */}
            <div className="col-span-12 xl:col-span-7 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 min-h-[300px]">
              <EarningOverview />
            </div>
            <div className="col-span-12 xl:col-span-5 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 min-h-[300px]">
              <SpendingOverview />
            </div>

            {/* Middle Row: Cash Flow (7) and Upcoming Bills (5) */}
            <div className="col-span-12 xl:col-span-7 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 min-h-[400px]">
              <CashFlowChart />
            </div>
            
            {/* Right Column Bottom Area: Upcoming Bills spans the rest */}
            <div className="col-span-12 xl:col-span-5 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 xl:row-span-2 flex flex-col">
              <UpcomingBills />
            </div>

            {/* Bottom Row Left: Recent Transactions (7) */}
            <div className="col-span-12 xl:col-span-7 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 min-h-[250px]">
               <RecentTransactions />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
