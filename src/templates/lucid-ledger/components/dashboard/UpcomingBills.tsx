'use client';

import React from 'react';
import { 
  Plus, 
  ChevronRight,
  Monitor,
  Music,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/templates/lucid-ledger/lib/utils';

const bills = [
  {
    id: 1,
    name: 'Netflix Subcription',
    date: 'June 28, 2026',
    amount: '$15.99',
    status: 'Scheduled',
    logo: 'https://images.ctfassets.net/4cd45et68cgf/4nBn7ncuGueuCHuzbi7N3w/4397a4ff55404abc3755a3311915e840/Netflix-Brand-Logo.png?w=684&h=456',
    icon: Monitor,
    color: 'bg-red-50 text-red-500'
  },
  {
    id: 2,
    name: 'Spotify Premium',
    date: 'June 30, 2025',
    amount: '$9.99',
    status: 'Scheduled',
    logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
    icon: Music,
    color: 'bg-green-50 text-green-500'
  },
  {
    id: 3,
    name: 'Adobe Creative Cloud',
    date: 'July 4, 2025',
    amount: '$52.99',
    status: 'Scheduled',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_logo.svg/640px-Adobe_Creative_Cloud_logo.svg.png',
    icon: CreditCard,
    color: 'bg-orange-50 text-orange-500'
  }
];

export default function UpcomingBills() {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-50 flex flex-col h-full transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-500">Upcoming Bill & Payment</h3>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {bills.map((bill) => (
          <div 
            key={bill.id} 
            className="group p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-100 bg-white flex items-center justify-center overflow-hidden p-1.5 grayscale group-hover:grayscale-0 transition-all">
                  <div className="relative w-full h-full">
                    <Image 
                      src={bill.logo} 
                      alt={bill.name} 
                      fill 
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#141414] mb-0.5">{bill.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{bill.date}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-all" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#141414]">{bill.amount}</span>
              <span className="px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-500 bg-white">
                {bill.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2.5 rounded-xl border border-blue-100 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-all">
        View All
      </button>
    </div>
  );
}
