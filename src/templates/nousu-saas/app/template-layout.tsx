import type {Metadata} from 'next';
import { Inter, Caveat, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-cursive', weight: ['400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Nousu - Smart AI Support',
  description: 'Landing page for Nousu AI Support agent',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
