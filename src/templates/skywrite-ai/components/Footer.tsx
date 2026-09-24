import React from 'react';
import { Send, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20">
       <div className="absolute top-0 left-0 w-full h-full bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
             
             {/* CTA Section */}
             <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white mb-20 relative overflow-hidden">
                <div className="relative z-10">
                   <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Ready to rank #1?</h2>
                   <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                      Join 10,000+ bloggers and agencies dominating the SERPs with SkyWrite.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl transition-transform hover:-translate-y-1 w-full sm:w-auto">
                         Start Free Trial
                      </button>
                      <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
                         <Send size={18} /> Contact Sales
                      </button>
                   </div>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-slate-800 rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-800 rounded-full"></div>
             </div>

             {/* Links */}
             <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-100 pt-12">
                <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   SkyWrite
                </div>
                
                <div className="flex gap-6 text-slate-600 font-medium">
                   <a href="#" className="hover:text-slate-900">Privacy</a>
                   <a href="#" className="hover:text-slate-900">Terms</a>
                   <a href="#" className="hover:text-slate-900">Blog</a>
                   <a href="#" className="hover:text-slate-900">Affiliates</a>
                </div>

                <div className="flex gap-4">
                   <a href="#" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      <Twitter size={20} />
                   </a>
                   <a href="#" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                      <Github size={20} />
                   </a>
                   <a href="#" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                      <Linkedin size={20} />
                   </a>
                </div>
             </div>
             
             <div className="text-center text-slate-400 text-sm mt-12">
                © 2024 SkyWrite AI. All rights reserved.
             </div>
          </div>
       </div>
       {/* Height spacer for absolute positioning */}
       <div className="h-[800px] md:h-[600px]"></div>
    </footer>
  );
};

export default Footer;