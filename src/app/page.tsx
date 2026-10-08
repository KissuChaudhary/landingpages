import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TemplateCatalog from '@/components/TemplateCatalog';
import { Steps } from '@/components/Steps';
import PricingPlans from '@/components/PricingPlans';
import FAQSection from '@/components/FAQSection';
import { CtaBanner } from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS } from '@/data/template-details';
import { SITE_NAME, absoluteUrl } from '@/data/site';

const title = `${SITE_NAME}: Next.js landing page templates that look expensive`;
const description = `${TEMPLATES.length} production-ready Next.js and Tailwind CSS landing page templates for AI tools, SaaS products and studios. One config file each, live demos, commercial license.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title,
    description,
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: `${TEMPLATES.length} FounderDada landing page templates` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og/home.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${SITE_NAME} landing page templates`,
  itemListElement: TEMPLATES.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: TEMPLATE_DETAILS[t.slug]?.name ?? t.title,
    url: absoluteUrl(t.detailUrl),
  })),
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Navbar />
      <main>
        <Hero />
        <TemplateCatalog />
        <Steps />
        <PricingPlans />
        <FAQSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
