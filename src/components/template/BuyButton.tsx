import React from 'react';

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors select-none h-11 px-6 text-sm';

const VARIANTS = {
  primary: 'bg-neutral-950 text-white hover:bg-neutral-800',
  secondary: 'border border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50',
  /** The blue, pressed button used on the home page. */
  brand:
    'border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] hover:bg-primary',
};

interface BuyButtonProps {
  /** Hosted checkout link. Empty while the payment provider is not connected. */
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

/** A checkout link. Without one it keeps its label but is dimmed and inert; say why next to it. */
export default function BuyButton({ href, children, variant = 'primary', className = '' }: BuyButtonProps) {
  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Checkout opens soon"
        className={`${BASE} ${VARIANTS[variant]} cursor-not-allowed opacity-40 ${className}`}
      >
        {children}
      </span>
    );
  }
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </a>
  );
}
