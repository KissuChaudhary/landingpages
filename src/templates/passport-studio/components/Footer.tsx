import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-stone-50 border-t border-stone-200 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white shadow-lg">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                            </div>
                            <span className="font-semibold text-stone-900 tracking-tight">Biometric<span className="opacity-40">Mirror</span></span>
                        </div>
                        <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                            Professional AI-powered passport photo generation. Ensuring 100% compliance with government standards through advanced biometric analysis.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-bold text-stone-900 text-xs uppercase tracking-widest mb-6">Product</h3>
                        <ul className="space-y-4">
                            {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-stone-500 hover:text-stone-900 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="font-bold text-stone-900 text-xs uppercase tracking-widest mb-6">Company</h3>
                        <ul className="space-y-4">
                            {['About', 'Careers', 'Legal', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-stone-500 hover:text-stone-900 text-sm transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-400 text-xs">
                        © {new Date().getFullYear()} BiometricMirror AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-stone-400 hover:text-stone-900 text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-stone-400 hover:text-stone-900 text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
