import { NextResponse } from 'next/server';
import { TableData } from '@/lib/types';

export async function GET() {

  const tableData: TableData[] = [
    {
      id: '1',
      customerName: 'John Smith',
      product: 'Premium Plan',
      amount: 599.99,
      status: 'completed',
      date: '2025-05-01T10:30:00.000Z',
    },
    {
      id: '2',
      customerName: 'Alice Johnson',
      product: 'Basic Plan',
      amount: 199.99,
      status: 'completed',
      date: '2025-05-02T14:45:00.000Z',
    },
    {
      id: '3',
      customerName: 'Robert Davis',
      product: 'Enterprise Plan',
      amount: 999.99,
      status: 'pending',
      date: '2025-05-03T09:15:00.000Z',
    },
    {
      id: '4',
      customerName: 'Emily Wilson',
      product: 'Basic Plan',
      amount: 199.99,
      status: 'failed',
      date: '2025-05-04T16:20:00.000Z',
    },
    {
      id: '5',
      customerName: 'Michael Brown',
      product: 'Premium Plan',
      amount: 599.99,
      status: 'completed',
      date: '2025-05-05T11:10:00.000Z',
    },
    {
      id: '6',
      customerName: 'Sarah Taylor',
      product: 'Enterprise Plan',
      amount: 999.99,
      status: 'completed',
      date: '2025-05-06T13:30:00.000Z',
    },
    {
      id: '7',
      customerName: 'James Anderson',
      product: 'Basic Plan',
      amount: 199.99,
      status: 'pending',
      date: '2025-05-07T15:45:00.000Z',
    },
    {
      id: '8',
      customerName: 'Jennifer Martinez',
      product: 'Premium Plan',
      amount: 599.99,
      status: 'failed',
      date: '2025-05-08T10:05:00.000Z',
    },
    {
      id: '9',
      customerName: 'David Miller',
      product: 'Enterprise Plan',
      amount: 999.99,
      status: 'completed',
      date: '2025-05-09T09:20:00.000Z',
    },
    {
      id: '10',
      customerName: 'Lisa Garcia',
      product: 'Basic Plan',
      amount: 199.99,
      status: 'pending',
      date: '2025-05-10T14:15:00.000Z',
    },
  ];

  return NextResponse.json(tableData);
}