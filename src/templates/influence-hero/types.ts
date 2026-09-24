import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialStat {
  icon: React.ReactNode;
  label: string;
  value: string;
  position: string; // Tailwind class for positioning
}