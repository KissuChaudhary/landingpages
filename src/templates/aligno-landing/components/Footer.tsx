import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#030303] border-t border-white/10 pt-20 pb-10 px-4 relative overflow-hidden">
             {/* Bottom Ambient Glow */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-black rounded-full" />
                            </div>
                            <span className="text-xl font-semibold text-white tracking-tight">Elpino</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-light">
                            Empowering teams to achieve more with clarity, speed, and precision. The future of project management is here.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="col-span-1 md:col-span-2 md:col-start-6 space-y-6">
                        <h4 className="text-white font-medium">Product</h4>
                        <ul className="space-y-4">
                            {['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-muted-foreground text-sm hover:text-[#FFDAC2] transition-colors font-light">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <h4 className="text-white font-medium">Company</h4>
                         <ul className="space-y-4">
                            {['About', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-muted-foreground text-sm hover:text-[#FFDAC2] transition-colors font-light">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div className="col-span-2 md:col-span-2 space-y-6">
                         <h4 className="text-white font-medium">Legal</h4>
                         <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-muted-foreground text-sm hover:text-[#FFDAC2] transition-colors font-light">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm font-light">
                        © {new Date().getFullYear()} Aligno Inc. All rights reserved.
                    </p>
                    
                    {/* System Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-white/60 font-medium">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
