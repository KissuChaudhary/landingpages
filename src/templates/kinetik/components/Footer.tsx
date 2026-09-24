import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
            <Zap size={12} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight">Kinetik</span>
        </div>
        <div className="text-sm text-gray-500">
          © 2024 Kinetik. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Terms</a>
          <a href="#" className="hover:text-black">Twitter</a>
        </div>
      </div>
    </footer>
  );
};