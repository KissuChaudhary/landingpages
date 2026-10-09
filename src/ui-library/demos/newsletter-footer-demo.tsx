'use client';

import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { NewsletterFooter } from '../registry/newsletter-footer';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export default function NewsletterFooterDemo() {
  return (
    <div className="w-full max-w-[1040px] overflow-hidden rounded-[22px] border border-border">
      <NewsletterFooter
        className="border-t-0"
        brand={{
          name: 'Kept',
          tagline: 'The till that knows your Saturdays. Orders, stock and rotas for small shops.',
          logo: <span className="grid size-6 place-items-center rounded-[7px] bg-primary text-[12px] font-semibold text-primary-foreground">K</span>,
        }}
        newsletter={{
          onSubscribe: async (email) => {
            await wait(1100);
            if (email.includes('fail')) throw new Error('That address bounced last time. Try another?');
          },
        }}
        columns={[
          { title: 'Product', links: [{ label: 'Point of sale', href: '#' }, { label: 'Stock', href: '#' }, { label: 'Rotas', href: '#' }, { label: 'Changelog', href: '#', badge: 'New' }] },
          { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Customers', href: '#' }, { label: 'Careers', href: '#', badge: 'Hiring' }, { label: 'Contact', href: '#' }] },
          { title: 'Help', links: [{ label: 'Help centre', href: '#' }, { label: 'Guides', href: '#' }, { label: 'API', href: '#' }, { label: 'Status', href: '#' }] },
        ]}
        legal={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Cookie settings', onClick: () => {} },
        ]}
        status={{ state: 'operational', href: '#' }}
        socials={[
          { label: 'Kept on GitHub', href: '#', icon: <Github /> },
          { label: 'Kept on X', href: '#', icon: <Twitter /> },
          { label: 'Kept on LinkedIn', href: '#', icon: <Linkedin /> },
        ]}
      />
    </div>
  );
}
