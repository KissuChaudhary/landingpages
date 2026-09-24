import React from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import Button from './Button';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center relative z-20 px-4 min-h-[80vh] animate-in fade-in duration-500">
      
      {/* 
        Back Button 
        Positioned relative to the viewport/container for easy exit
      */}
      <div className="absolute top-0 left-0 w-full max-w-6xl mx-auto px-4 md:px-8">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors group py-4"
        >
            <div className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center group-hover:border-stone-300 shadow-sm transition-all group-hover:-translate-x-1">
                <ArrowLeft size={14} />
            </div>
            <span className="font-sans text-sm font-medium">Back to Home</span>
        </button>
      </div>

      {/* 
        Login Card Container 
        Using the "Dual Border" aesthetic from Navbar/Footer
      */}
      <div className="w-full max-w-[420px] bg-white border border-stone-300/60 rounded-[24px] p-1.5 shadow-2xl shadow-stone-200/40">
         
         {/* Inner Core */}
         <div className="w-full bg-stone-50/50 backdrop-blur-xl rounded-[20px] border border-stone-100 p-8 md:p-10 flex flex-col items-center">
            
            {/* Brand Logo */}
            <div className="mb-8">
               <span className="font-serif font-bold text-3xl tracking-tight text-stone-900">FlipAEO</span>
            </div>

            {/* Headline */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-2xl text-stone-900 mb-2">Welcome back</h1>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                    Enter your email to receive a magic link <br/> for password-free sign in.
                </p>
            </div>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-600 hover:text-stone-900 font-medium text-sm rounded-xl py-3 px-4 transition-all duration-200 shadow-sm mb-6 group relative overflow-hidden">
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="relative z-10">Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="w-full flex items-center gap-3 mb-6">
                <div className="h-px bg-stone-200 flex-1"></div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Or</span>
                <div className="h-px bg-stone-200 flex-1"></div>
            </div>

            {/* Email Form */}
            <form className="w-full flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider ml-1">Email</label>
                    <div className="relative group">
                         <input 
                            type="email" 
                            placeholder="name@company.com"
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 pl-11 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 transition-all font-sans text-sm shadow-sm"
                         />
                         <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
                    </div>
                </div>

                <Button variant="purple" className="w-full justify-center py-3 text-base shadow-lg shadow-violet-200/50 mt-2">
                    Send Magic Link
                </Button>
            </form>

            {/* Footer Terms */}
             <p className="mt-8 text-center text-[11px] text-stone-400 leading-relaxed max-w-xs">
                By clicking continue, you agree to our <br/>
                <a href="#" className="underline hover:text-stone-600 decoration-stone-300">Terms of Service</a> and <a href="#" className="underline hover:text-stone-600 decoration-stone-300">Privacy Policy</a>.
            </p>

         </div>
      </div>
      
      {/* Decorative Lock Icon indicating Security */}
      <div className="mt-8 flex items-center gap-1.5 text-stone-300">
          <Lock size={12} />
          <span className="text-[10px] font-medium tracking-wide">256-BIT ENCRYPTED</span>
      </div>

    </div>
  );
};

export default LoginPage;