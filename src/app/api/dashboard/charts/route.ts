import { NextResponse } from 'next/server';
import { SalesData, UserGrowthData, CategoryData } from '@/lib/types';

export async function GET() {

  const salesData: SalesData[] = [];
  const currentDate = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    salesData.push({
      date: monthYear,
      revenue: Math.floor(Math.random() * 50000) + 30000, 
      transactions: Math.floor(Math.random() * 500) + 300, 
    });
  }
  
  
  const userGrowthData: UserGrowthData[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    userGrowthData.push({
      month: monthYear,
      newUsers: Math.floor(Math.random() * 800) + 200, 
      activeUsers: Math.floor(Math.random() * 1500) + 500, 
    });
  }
  
  
  const categoryData: CategoryData[] = [
    {
      name: 'Electronics',
      value: 35,
      color: '#8884d8',
    },
    {
      name: 'Clothing',
      value: 25,
      color: '#82ca9d',
    },
    {
      name: 'Home & Kitchen',
      value: 18,
      color: '#ffc658',
    },
    {
      name: 'Books',
      value: 12,
      color: '#ff8042',
    },
    {
      name: 'Others',
      value: 10,
      color: '#0088fe',
    },
  ];
  
  return NextResponse.json({
    salesData,
    userGrowthData,
    categoryData,
  });
}