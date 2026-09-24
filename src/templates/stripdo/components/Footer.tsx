import React from 'react';
import { Feather } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] pt-20 pb-10 px-6 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-1">
                 <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-6">
                    <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                        <Feather size={18} strokeWidth={2.5} />
                    </div>
                    <span>CreatorFlow</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-medium mb-6">
                    Helping youtubers stand out with pro edits, fast delivery and what not!
                </p>
            </div>

            {/* Links Columns - Spacer */}
            <div className="hidden lg:block"></div>

            {/* Links Grid */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-slate-200 font-bold mb-6 text-lg">Company</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Home</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Services</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Works</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Reviews</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">FAQ</a></li>
                    </ul>
                </div>
                <div>
                     <h4 className="text-slate-200 font-bold mb-6 text-lg">Legal Pages</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Privacy Policy</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Terms of Services</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Refund Policy</a></li>
                    </ul>
                </div>
                <div>
                     <h4 className="text-slate-200 font-bold mb-6 text-lg">Socials</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">LinkedIn</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Discord</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Twitter</a></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-slate-500 text-sm font-medium">
                Copyright 2026 to CreatorFlow
            </p>
            <p className="text-slate-500 text-sm font-medium">
                Made with Framer & Love
            </p>
        </div>

      </div>
    </footer>
  );
}