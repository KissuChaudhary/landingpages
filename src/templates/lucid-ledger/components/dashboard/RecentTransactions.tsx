'use client';

import React from 'react';
import { 
  Filter, 
  MoreHorizontal,
  Smartphone,
  Layout,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/templates/lucid-ledger/lib/utils';

const transactions = [
  {
    id: 1,
    activity: 'Mobile App Purchase',
    date: 'Wed 10:29 AM',
    amount: '+$25,500',
    status: 'Success',
    icon: Smartphone,
    color: 'text-blue-600 bg-blue-50'
  },
  {
    id: 2,
    activity: 'Software License',
    date: 'Wed 10:29 AM',
    amount: '+$25,500',
    status: 'Success',
    icon: Layout,
    color: 'text-red-500 bg-red-50'
  }
];

export default function RecentTransactions() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex flex-col transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-500">Recent Transaction</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          Filter <Filter size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Activity</th>
              <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Date</th>
              <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Total Amount</th>
              <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Status</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="group hover:bg-slate-50 transition-all">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105", tx.color)}>
                      <tx.icon size={18} />
                    </div>
                    <span className="text-[13px] font-bold text-[#141414]">{tx.activity}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-[13px] font-medium text-slate-500">{tx.date}</span>
                </td>
                <td className="py-4">
                  <span className="text-[13px] font-bold text-[#141414]">{tx.amount}</span>
                </td>
                <td className="py-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-600">
                    <CheckCircle2 size={14} />
                    <span className="text-[11px] font-bold">{tx.status}</span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button className="p-1 rounded-lg text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all">
                    <MoreHorizontal size={20} />
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
