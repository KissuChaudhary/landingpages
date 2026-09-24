import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FounderDada — 35+ Production-Ready Next.js & Tailwind Templates',
  description:
    'A curated marketplace of high-converting SaaS landing pages, financial analytics dashboards, animated bento grids, and modern hero sections with live interactive demos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Caveat:wght@400..700&family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@300..900&family=JetBrains+Mono:wght@400..700&family=Manrope:wght@400..800&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Outfit:wght@300..800&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@400..800&family=Silkscreen&family=Space+Grotesk:wght@400..700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
