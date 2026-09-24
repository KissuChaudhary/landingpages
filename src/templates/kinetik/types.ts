import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Customer {
  id: number;
  name: string;
  company: string;
  avatarColor: string;
  initials: string;
}

export interface ChartDataPoint {
  day: string;
  value: number;
  color: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
}