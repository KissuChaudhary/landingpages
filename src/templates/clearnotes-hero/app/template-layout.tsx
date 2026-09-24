import type {Metadata} from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ClearNotes | Focused Thinking',
  description: 'Turn scattered thoughts into clear notes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased font-sans text-gray-800" suppressHydrationWarning>{children}</body>
    </html>
  );
}
