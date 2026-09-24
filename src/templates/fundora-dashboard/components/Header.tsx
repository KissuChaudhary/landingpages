import Image from 'next/image';

export function Header() {
  return (
    <header className="h-[80px] flex items-center justify-between px-8 bg-[#F8F9FA] z-10 shrink-0">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Welcome back, Sujon <span className="text-xl">👋</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm relative">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors shadow-sm relative">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-[10px] right-[10px] w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 relative">
            <Image src="https://picsum.photos/seed/sujon/100/100" alt="Sujon Hossain" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors line-clamp-1">Sujon Hossain</p>
            <p className="text-[11px] text-gray-500">sujon.hossain758</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </header>
  );
}
