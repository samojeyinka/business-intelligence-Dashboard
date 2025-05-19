'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { UserGrowthData } from '@/lib/types';

interface BarChartProps {
  data: UserGrowthData[];
  dataKeys: {
    xAxisKey: string;
    yAxisKeys: { key: string; color: string }[];
  };
}

export default function BarChart({ data, dataKeys }: BarChartProps) {
  const { xAxisKey, yAxisKeys } = dataKeys;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey={xAxisKey} 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#9ca3af' }}
          axisLine={{ stroke: '#9ca3af' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#9ca3af' }}
          axisLine={{ stroke: '#9ca3af' }}
        />
        <Tooltip 
          formatter={(value: number) => [value.toLocaleString(), '']}
          contentStyle={{ 
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          fontSize={12}
        />
        {yAxisKeys.map((item, index) => (
          <Bar
            key={`bar-${index}`}
            dataKey={item.key}
            fill={item.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}