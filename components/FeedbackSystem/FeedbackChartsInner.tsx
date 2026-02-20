'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ChartDataPoint, ChartType, PieChartDataPoint } from '../../data';

const FeedbackChartsRecharts = dynamic(
  () => import('./FeedbackChartsRecharts').then((mod) => mod.FeedbackChartsRecharts),
  { ssr: false, loading: () => <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart...</div> }
);

interface FeedbackChartsInnerProps {
  chartData: ChartDataPoint[];
  pieChartData: PieChartDataPoint[];
  selectedChart: ChartType;
}

export function FeedbackChartsInner({
  chartData,
  pieChartData,
  selectedChart,
}: FeedbackChartsInnerProps) {
  return (
    <FeedbackChartsRecharts
      chartData={chartData}
      pieChartData={pieChartData}
      selectedChart={selectedChart}
    />
  );
}
