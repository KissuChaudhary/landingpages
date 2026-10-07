import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Harvansh — Still beating.',
  description:
    'The honest portfolio of a 9-to-5 dad who builds software after the house goes quiet. 15 products in two years, 11 flatlined, 1 pays. Still beating.',
  openGraph: {
    title: 'Harvansh — Still beating.',
    description: '15 products. 11 flatlined. 1 pays. The honest portfolio of a solo builder.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@9to5_Dad',
  },
};

export const viewport: Viewport = {
  themeColor: '#050606',
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Martian+Mono:wdth,wght@75..112.5,100..800&family=Doto:ROND,wght@0..100,100..900&display=swap';

export default function HarvanshLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* React 19 hoists these into <head> */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      {children}
    </>
  );
}
