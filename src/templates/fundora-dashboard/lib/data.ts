export const mockData = {
  earning: {
    total: 20520.32,
    percentChange: 1.5,
    chartData: [
      { name: 'Jan', value: 3000 },
      { name: 'Feb', value: 7000 },
      { name: 'Mar', value: 5000 },
      { name: 'Apr', value: 8689.20 },
      { name: 'May', value: 4000 },
      { name: 'Jun', value: 6500 },
    ],
  },
  spending: {
    total: 20520.32,
    percentChange: -1.5, // Note: The design shows positive formatting but arrow down, actually it says +1.5% with down red arrow. Let's stick to -1.5 for red color. Wait, screenshot says `+1.5% v` in red.
    breakdown: [
      { name: 'House Rent', value: 2000.00, color: '#2563EB' },
      { name: 'Foods', value: 1500.00, color: '#93C5FD' },
      { name: 'Others', value: 800.00, color: '#E5E7EB' },
    ],
  },
  cashFlow: {
    total: 342323.44,
    monthlyData: [
      { name: 'Jan', value: 15000 },
      { name: 'Feb', value: 28000 },
      { name: 'Mar', value: 12000 },
      { name: 'Apr', value: 22000 },
      { name: 'May', value: 18000 },
      { name: 'Jun', value: 29000 },
      { name: 'Jul', value: 15000 },
      { name: 'Aug', value: 35000, valueExplicit: 8689.20 }, // August is max roughly
      { name: 'Sep', value: 15000 },
      { name: 'Oct', value: 22000 },
      { name: 'Nov', value: 13000 },
      { name: 'Dec', value: 10000 },
    ]
  },
  upcomingBills: [
    { id: 1, name: 'Netflix Subscription', date: 'June 28, 2026', price: 15.99, status: 'Scheduled', logo: 'N' },
    { id: 2, name: 'Spotify Premium', date: 'June 30, 2025', price: 9.99, status: 'Scheduled', logo: 'S' },
    { id: 3, name: 'Adobe Creative Cloud', date: 'July 4, 2025', price: 52.99, status: 'Scheduled', logo: 'A' },
  ],
  recentTransactions: [
    { id: 1, activity: 'Mobile App Purchase', date: 'Wed 10:29 AM', amount: 25500, status: 'Success', isPositive: true },
    { id: 2, activity: 'Software License', date: 'Wed 10:29 AM', amount: 25500, status: 'Success', isPositive: true },
  ]
};
