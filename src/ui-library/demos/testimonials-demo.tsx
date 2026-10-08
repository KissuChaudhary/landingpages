'use client';

import React from 'react';
import { Testimonials } from '../registry/testimonials';

const ITEMS = [
  { quote: 'We shipped the new pricing page in an afternoon. The toggle alone got more replies than the launch post.', name: 'Maya Lindqvist', role: 'Founder, Northwind' },
  { quote: 'It looks like we hired a studio. We didn’t.', name: 'Daniel Okafor', role: 'Solo maker' },
  { quote: 'Every state is thought through: loading, empty, failed. Our support inbox noticed before we did.', name: 'Priya Raman', role: 'Product lead, Fernhill' },
  { quote: 'I stopped fighting the hero section and started writing the product.', name: 'Tom Becker', role: 'Indie developer' },
];

export default function TestimonialsDemo({ tab = 'Autoplay' }: { tab?: string }) {
  return (
    <div className="w-full max-w-[520px]">
      <Testimonials items={ITEMS} autoplay={tab === 'Autoplay' ? 5200 : undefined} />
    </div>
  );
}
