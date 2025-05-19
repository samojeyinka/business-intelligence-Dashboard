'use client';

import { useEffect, useState } from 'react';
import { Metric, SalesData, UserGrowthData, CategoryData, TableData } from '@/lib/types';
import MetricCard from '@/components/dashboard/MetricCard';
import ChartCard from '@/components/dashboard/ChartCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import DataTable from '@/components/dashboard/DataTable';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

     
        const metricsResponse = await fetch('/api/dashboard/metrics');
        if (!metricsResponse.ok) throw new Error('Failed to fetch metrics');
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData);

   
        const chartsResponse = await fetch('/api/dashboard/charts');
        if (!chartsResponse.ok) throw new Error('Failed to fetch chart data');
        const chartsData = await chartsResponse.json();
        setSalesData(chartsData.salesData);
        setUserGrowthData(chartsData.userGrowthData);
        setCategoryData(chartsData.categoryData);

      
        const tableResponse = await fetch('/api/dashboard/table-data');
        if (!tableResponse.ok) throw new Error('Failed to fetch table data');
        const tableData = await tableResponse.json();
        setTableData(tableData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
 
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            Export
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-offset-gray-900">
            Refresh
          </button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
        <ChartCard title="Sales Trend" subtitle="Last 12 months">
          <LineChart
            data={salesData}
            dataKeys={{
              xAxisKey: 'date',
              yAxisKeys: [
                { key: 'revenue', color: '#8884d8' },
              ],
            }}
          />
        </ChartCard>

    
        <ChartCard title="User Growth" subtitle="Last 6 months">
          <BarChart
            data={userGrowthData}
            dataKeys={{
              xAxisKey: 'month',
              yAxisKeys: [
                { key: 'newUsers', color: '#8884d8' },
                { key: 'activeUsers', color: '#82ca9d' },
              ],
            }}
          />
        </ChartCard>

        
        <ChartCard title="Category Distribution" subtitle="Sales by category">
          <PieChart
            data={categoryData}
            dataKey="value"
            nameKey="name"
          />
        </ChartCard>


        <ChartCard title="Revenue by Product" subtitle="Revenue distribution">
          <BarChart
            data={[
              { product: 'Basic Plan', revenue: 23500 },
              { product: 'Premium Plan', revenue: 45000 },
              { product: 'Enterprise Plan', revenue: 78000 },
            ]}
            dataKeys={{
              xAxisKey: 'product',
              yAxisKeys: [
                { key: 'revenue', color: '#8884d8' },
              ],
            }}
          />
        </ChartCard>
      </div>

   
      <div className="mt-6">
        <DataTable data={tableData} title="Recent Transactions" />
      </div>
    </div>
  );
}