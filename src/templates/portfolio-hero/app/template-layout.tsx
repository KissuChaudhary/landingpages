import type {Metadata} from 'next';
import { Inter, JetBrains_Mono, Caveat, Dela_Gothic_One, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwriting' });
const dela = Dela_Gothic_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Portfolio Hero',
  description: 'A stylish and highly responsive portfolio hero section matching the design perfectly.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${caveat.variable} ${dela.variable} ${space.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
