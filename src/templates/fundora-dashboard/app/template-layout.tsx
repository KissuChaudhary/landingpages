import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Fundora | Financial Dashboard',
  description: 'Premium financial overview dashboard for managing earnings, spending, and cash flow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans text-[#111827] bg-[#eef2f6] min-h-screen p-4 md:p-8 flex items-center justify-center" suppressHydrationWarning>
        <div className="w-full max-w-[1440px] h-[90vh] min-h-[800px] bg-[#f8f9fa] rounded-[24px] shadow-2xl overflow-hidden flex border border-gray-200/50">
          {children}
        </div>
      </body>
    </html>
  );
}
