import { NextResponse } from 'next/server';
import { Metric } from '@/lib/types';

export async function GET() {

  const metrics: Metric[] = [
    {
      id: 'metric-1',
      title: 'Total Users',
      value: '12,345',
      change: 8.2,
      trend: 'up',
      icon: 'user-group',
    },
    {
      id: 'metric-2',
      title: 'Active Sessions',
      value: '843',
      change: 4.5,
      trend: 'up',
      icon: 'user-circle',
    },
    {
      id: 'metric-3',
      title: 'Sales Revenue',
      value: '$542,892',
      change: -2.4,
      trend: 'down',
      icon: 'currency-dollar',
    },
    {
      id: 'metric-4',
      title: 'Avg. Response Time',
      value: '1.2s',
      change: -10.8,
      trend: 'down',
      icon: 'clock',
    },
  ];
 
  return NextResponse.json(metrics);
}