import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { TEMPLATES } from '@/data/templates';
import { SITE_NAME, SITE_URL } from '@/data/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME}: ${TEMPLATES.length} production-ready Next.js and Tailwind templates`,
  description:
    'A curated marketplace of high-converting landing pages for AI tools, SaaS products, studios and agencies, with live interactive demos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
