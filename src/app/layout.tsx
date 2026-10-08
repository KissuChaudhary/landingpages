import type { Metadata } from 'next';
import { TEMPLATES } from '@/data/templates';
import './globals.css';

export const metadata: Metadata = {
  title: `FounderDada — ${TEMPLATES.length} Production-Ready Next.js & Tailwind Templates`,
  description:
    'A curated marketplace of high-converting landing pages for AI tools, SaaS products, studios and agencies, with live interactive demos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
