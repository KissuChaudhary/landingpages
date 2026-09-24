'use client';

import { Check, Filter, MoreHorizontal } from 'lucide-react';
import { mockData } from '@/templates/fundora-dashboard/lib/data';

export function RecentTransactions() {
  const { recentTransactions } = mockData;

  const getActivityIcon = (name: string) => {
    switch (name) {
      case 'Mobile App Purchase':
        return (
           <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
             <span className="font-bold text-sm">A</span>
           </div>
        );
      case 'Software License':
         return (
           <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
             <span className="font-bold text-sm">A</span>
           </div>
         );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
             <span className="font-bold text-sm">?</span>
           </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-medium text-gray-900">Recent Transaction</h2>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 px-2 py-1 bg-gray-50 hover:bg-gray-100 rounded border border-gray-100 transition-colors">
          Filter
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold first:rounded-l-lg">Activity</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Total Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold w-10 text-right last:rounded-r-lg"></th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {getActivityIcon(tx.activity)}
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{tx.activity}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">{tx.date}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className={`text-sm font-semibold ${tx.isPositive ? 'text-gray-900' : 'text-gray-900'}`}>
                    {tx.isPositive ? '+' : '-'}${tx.amount.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                    <Check className="w-3 h-3" />
                    <span className="text-xs font-semibold">{tx.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
