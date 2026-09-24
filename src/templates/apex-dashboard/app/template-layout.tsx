import type {Metadata} from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex-mono' });

export const metadata: Metadata = {
  title: 'Orbit Premium Dashboard',
  description: 'A premium, high-fidelity SaaS dashboard.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
