import type {Metadata} from 'next';
import { Instrument_Serif, Barlow } from 'next/font/google';
import './globals.css'; // Global styles

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-heading',
});

const barlow = Barlow({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'AI Web Design Agency',
  description: 'A premium, dark-themed landing page for an AI-powered web design agency.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${barlow.variable}`}>
      <body className="bg-black text-white font-body antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
