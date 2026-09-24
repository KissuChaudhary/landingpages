import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-4 md:px-6 pb-8 flex justify-center z-10 relative">
      {/* 
        Outer Shell - Exactly Matching Navbar Aesthetic 
        Navbar: border border-stone-300/50 rounded-[15px] p-1
      */}
      <div className="
        relative w-full max-w-[1126px]
        bg-white
        border border-stone-300/50
        rounded-[15px] p-1
        shadow-sm
      ">
        {/* 
           Inner Core - Exactly Matching Navbar Aesthetic
           Navbar: bg-stone-100/50 backdrop-blur-sm rounded-[12px] border border-stone-100
        */}
        <div className="
            w-full bg-stone-100/50 backdrop-blur-sm
            rounded-[12px] px-6 py-12 md:p-12 lg:p-16
            border border-stone-100
            relative overflow-hidden
        ">
             {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">

              {/* Brand Column */}
              <div className="lg:w-1/3 flex flex-col items-start gap-6">
                <div className="flex items-center gap-2">
                   <span className="font-serif font-bold text-2xl tracking-tight text-stone-900 leading-none">
                    FlipAEO
                  </span>
                </div>
                
                <p className="font-sans text-stone-500 text-sm leading-relaxed max-w-sm">
                  The first strategic content engine designed to reverse-engineer AI search models. Win the answer, not just the link.
                </p>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stone-200 rounded-full shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Systems Operational</span>
                </div>
              </div>

              {/* Navigation Columns */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">

                {/* Product */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-serif text-lg text-stone-900 font-medium">Product</h4>
                  <nav className="flex flex-col gap-3">
                    <FooterLink href="#">Benefits</FooterLink>
                    <FooterLink href="#">How it Works</FooterLink>
                    <FooterLink href="#">Features</FooterLink>
                    <FooterLink href="#">Pricing</FooterLink>
                  </nav>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-serif text-lg text-stone-900 font-medium">Company</h4>
                  <nav className="flex flex-col gap-3">
                    <FooterLink href="#">About Us</FooterLink>
                    <FooterLink href="#">Research Blog</FooterLink>
                    <FooterLink href="#">Careers</FooterLink>
                    <FooterLink href="mailto:support@flipaeo.com">Contact</FooterLink>
                  </nav>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-serif text-lg text-stone-900 font-medium">Legal</h4>
                  <nav className="flex flex-col gap-3">
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                  </nav>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 pt-8 border-t border-stone-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="font-sans text-sm text-stone-400">
                © {currentYear} FlipAEO Inc. All rights reserved.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-4">
                <SocialLink href="https://x.com/flipaeo" label="X (Twitter)">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialLink>
                <SocialLink href="mailto:support@flipaeo.com" label="Email">
                  <Mail className="w-4 h-4" />
                </SocialLink>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="font-sans text-sm text-stone-500 hover:text-orange-600 transition-colors duration-200 w-fit"
  >
    {children}
  </a>
);

const SocialLink: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-stone-400 hover:bg-orange-50 hover:text-orange-600 border border-stone-200 hover:border-orange-200 transition-all duration-300 shadow-sm"
  >
    {children}
  </a>
);

export default Footer;