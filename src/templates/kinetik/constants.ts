import { NavLink, Customer, ChartDataPoint } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
];

export const CUSTOMERS: Customer[] = [
  { id: 1, name: 'Maggie Johnson', company: 'Oasis Organic Inc.', avatarColor: 'bg-orange-200', initials: 'MJ' },
  { id: 2, name: 'Chris Friedkly', company: 'Supermarket Villanova', avatarColor: 'bg-teal-200', initials: 'CF' },
  { id: 3, name: 'Gael Harry', company: 'New York Finest Fruits', avatarColor: 'bg-yellow-200', initials: 'GH' },
];

export const CHART_DATA: ChartDataPoint[] = [
  { day: 'M', value: 40, color: '#93c5fd' }, // blue-300
  { day: 'T', value: 65, color: '#fdba74' }, // orange-300
  { day: 'W', value: 45, color: '#fcd34d' }, // yellow-300
  { day: 'T', value: 80, color: '#6ee7b7' }, // emerald-300
  { day: 'F', value: 55, color: '#93c5fd' }, // blue-300
  { day: 'S', value: 30, color: '#fca5a5' }, // red-300
  { day: 'S', value: 45, color: '#fdba74' }, // orange-300
];

export const PARTNERS = [
  'BoxMedia', 'NovaTech', 'Pluto Inc', 'VitaHealth', 'BoxMedia', 'NovaTech'
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For early-stage teams',
    price: '$24',
    features: [
      'Access to core features',
      'Basic performance reporting',
      'Email support',
      'Strategy onboarding guide',
      'Monthly check-in summary'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Most popular',
    price: '$49',
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Priority support',
      'Unlimited projects'
    ]
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For fast-scaling startups',
    price: '$99',
    features: [
      'Everything in Growth',
      'Dedicated account manager',
      'Custom integrations',
      'SSO & audit logs'
    ]
  }
];