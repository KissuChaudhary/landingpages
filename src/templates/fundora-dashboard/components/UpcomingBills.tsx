'use client';

import { Plus, ChevronRight } from 'lucide-react';
import { mockData } from '@/templates/fundora-dashboard/lib/data';

export function UpcomingBills() {
  const { upcomingBills } = mockData;

  const getLogoColors = (name: string) => {
    switch (name) {
      case 'Netflix Subscription':
        return 'bg-red-50 text-red-600 font-bold';
      case 'Spotify Premium':
        return 'bg-green-50 text-green-500 font-bold';
      case 'Adobe Creative Cloud':
        return 'bg-red-50 text-red-500 font-bold';
      default:
        return 'bg-gray-100 text-gray-600 font-bold';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-medium text-gray-900">Upcoming Bill & Payment</h2>
        <button className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 space-y-4 mb-4">
        {upcomingBills.map((bill) => (
          <div key={bill.id} className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 group cursor-pointer hover:border-gray-200 hover:shadow-sm transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${getLogoColors(bill.name)}`}>
                  {bill.logo}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors">{bill.name}</h4>
                  <p className="text-xs text-gray-500">{bill.date}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity -mr-1" />
            </div>
            <div className="flex justify-between items-center bg-gray-50/50 rounded-xl p-3 border border-gray-50/50">
              <span className="text-sm font-semibold text-gray-900">${bill.price}</span>
              <span className="text-[11px] font-medium text-gray-600 px-2.5 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
                {bill.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-auto py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
        View All
      </button>
    </div>
  );
}
