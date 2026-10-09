'use client';

import React from 'react';
import { ComparisonTable, type ComparisonGroup, type ComparisonPlan } from '../registry/comparison-table';

const PLANS: ComparisonPlan[] = [
  { id: 'free', name: 'Free', price: 0, description: 'For a first shop finding its feet.', cta: { label: 'Start free' } },
  { id: 'growth', name: 'Growth', price: { monthly: 24, yearly: 19 }, description: 'For shops with a queue out the door.', featured: true, badge: 'Popular', cta: { label: 'Start a trial' } },
  { id: 'scale', name: 'Scale', price: { monthly: 79, yearly: 63 }, description: 'For several shops and a kitchen.', cta: { label: 'Start a trial' } },
  { id: 'enterprise', name: 'Enterprise', price: null, description: 'For chains with their own IT team.', cta: { label: 'Talk to us' } },
];

const GROUPS: ComparisonGroup[] = [
  {
    title: 'Orders and stock',
    rows: [
      { label: 'Orders a month', values: { free: '500', growth: '10,000', scale: 'Unlimited', enterprise: 'Unlimited' } },
      { label: 'Shops', values: { free: '1', growth: '3', scale: '10', enterprise: 'Unlimited' } },
      { label: 'Stock alerts', hint: 'A nudge before a flavour runs out', values: { free: true, growth: true, scale: true, enterprise: true } },
      { label: 'Batch planning', values: { free: false, growth: true, scale: true, enterprise: true } },
    ],
  },
  {
    title: 'Team',
    rows: [
      { label: 'Seats', values: { free: '2', growth: '10', scale: '50', enterprise: 'Unlimited' } },
      { label: 'Roles and permissions', values: { free: false, growth: true, scale: true, enterprise: true } },
      { label: 'Shift scheduling', values: { free: false, growth: false, scale: true, enterprise: true } },
    ],
  },
  {
    title: 'Security and support',
    rows: [
      { label: 'Single sign-on', values: { free: false, growth: false, scale: true, enterprise: true } },
      { label: 'Audit log', values: { free: false, growth: false, scale: '90 days', enterprise: 'Unlimited' } },
      { label: 'Support', values: { free: 'Email', growth: 'Email, 1 day', scale: 'Chat, 4 hours', enterprise: 'Named contact' } },
    ],
  },
];

export default function ComparisonTableDemo() {
  return (
    <div className="w-full max-w-[880px]">
      <ComparisonTable plans={PLANS} groups={GROUPS} yearlyBadge="Save 20%" />
    </div>
  );
}
