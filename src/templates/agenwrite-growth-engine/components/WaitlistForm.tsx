import React, { useState } from 'react';
import { Mail, Loader2, Check, ChevronUp } from 'lucide-react';

interface WaitlistFormProps {
  variant?: 'light' | 'dark';
  id?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ variant = 'light', id }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const isDark = variant === 'dark';

  return (
    <div id={id} className="flex w-full items-center justify-center">
      {/* Outer Muted Wrapper (The Border/Padding Layer) */}
      <div className={`
        relative p-1 overflow-hidden w-full max-w-[340px] rounded-[14px]
        shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04)]
        transition-colors duration-300
        ${isDark ? 'bg-stone-800' : 'bg-stone-100'}
      `}>
        
        {/* Top Notch Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 z-20 flex justify-center pointer-events-none">
            <div className={`w-8 h-4 rounded-b-lg border-b border-x ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-200/50'} flex items-center justify-center`}>
                <ChevronUp className={`w-3 h-3 ${isDark ? 'text-stone-500' : 'text-stone-400'}`} />
            </div>
        </div>

        {/* Inner White Card */}
        <div className={`
           relative border rounded-[10px] overflow-hidden transition-all h-full
           ${isDark ? 'bg-stone-900 border-stone-700' : 'bg-white border-stone-200'}
        `}>
           {status === 'success' ? (
              <div className="p-8 text-center py-12 flex flex-col items-center justify-center h-full min-h-[180px]">
                 <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                    <Check className="w-5 h-5" />
                 </div>
                 <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>You're on the list!</h3>
                 <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>We'll be in touch soon.</p>
              </div>
           ) : (
             <form onSubmit={handleSubmit} className="p-4">
                
                {/* Header Section */}
                <div className="mb-4 space-y-2">
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium mb-1 pl-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}
                  >
                    Join Waitlist
                  </label>
                  
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`
                        w-full px-3 py-2 border rounded-md shadow-sm outline-none transition-all
                        placeholder:text-stone-400
                        ${isDark 
                          ? 'bg-stone-950 border-stone-800 text-white focus:border-stone-600 focus:ring-1 focus:ring-stone-600' 
                          : 'bg-white border-stone-200 text-stone-900 focus:border-stone-400 focus:ring-1 focus:ring-stone-400'
                        }
                      `}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail className={`size-4 ${isDark ? 'text-stone-600' : 'text-stone-400'}`} />
                    </div>
                  </div>

                  <p className={`text-xs tracking-tight pl-1 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                    Get 30 days of answer-based strategy.
                  </p>
                </div>

                {/* Premium Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`
                    flex h-9 w-full items-center justify-center overflow-hidden rounded-md px-3 text-xs font-semibold text-white transition-all
                    disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]
                    bg-gradient-to-b from-stone-800 to-stone-950
                    hover:from-stone-700 hover:to-stone-900
                    shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#ea580c]
                    ${isDark ? 'border border-stone-700' : ''}
                  `}
                >
                  {status === 'loading' ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
             </form>
           )}
        </div>
      </div>
    </div>
  );
};