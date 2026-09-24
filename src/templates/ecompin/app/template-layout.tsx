import type {Metadata} from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Brainka - Discover Connections',
  description: 'Meet Brainka, and discover connections you didn\'t know existed.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-[#FAFAFA] text-[#111111] antialiased selection:bg-gray-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
