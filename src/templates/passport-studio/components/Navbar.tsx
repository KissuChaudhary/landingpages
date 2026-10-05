import Link from 'next/link'
import { LogIn } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl md:w-auto md:max-w-fit">
      <div className="relative p-1 bg-stone-100/80 backdrop-blur-md rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.08)]">
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200 rounded-[12px] px-2 py-2 flex items-center justify-between md:justify-start gap-2">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 pl-3 pr-2 md:pr-6 group">
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 tracking-tight text-sm leading-none">Biometric</span>
              <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest leading-none mt-0.5">
                Mirror
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-stone-50 rounded-lg p-1 border border-stone-100">
            {['About', 'Features', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide text-stone-500 hover:text-stone-900 hover:bg-white transition-all hover:shadow-sm"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/studio"
              className="px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide text-stone-500 hover:text-stone-900 hover:bg-white transition-all hover:shadow-sm"
            >
              Studio
            </Link>
          </div>

          {/* Auth CTA */}
          <div className="ml-auto md:ml-2">
            <Link
              href="#start"
              className="bg-[#e78468] hover:brightness-110 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              Start Studio <LogIn className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
