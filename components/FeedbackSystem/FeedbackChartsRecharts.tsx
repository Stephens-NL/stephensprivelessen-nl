'use client';

import React, { useState, useEffect } from 'react';
import { ChartDataPoint, ChartType, PieChartDataPoint } from '../../data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface FeedbackChartsRechartsProps {
  chartData: ChartDataPoint[];
  pieChartData: PieChartDataPoint[];
  selectedChart: ChartType;
}

export function FeedbackChartsRecharts({
  chartData,
  pieChartData,
  selectedChart,
}: FeedbackChartsRechartsProps) {
  const [Recharts, setRecharts] = useState<typeof import('recharts') | null>(null);

  useEffect(() => {
    import('recharts').then(setRecharts);
  }, []);

  if (!Recharts) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        Loading chart...
      </div>
    );
  }

  const {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart: RePieChart,
    Pie,
    Cell,
  } = Recharts;

  if (selectedChart === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            name="Feedback Count"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgRating"
            stroke="#82ca9d"
            name="Avg Rating"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${entry.name}-${entry.value}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  );
}
