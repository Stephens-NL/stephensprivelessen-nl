'use client';

import dynamic from 'next/dynamic';
import { ChartDataPoint, ChartType, PieChartDataPoint } from '../../data';

const FeedbackChartsInner = dynamic(
  () => import('./FeedbackChartsInner').then((mod) => mod.FeedbackChartsInner),
  { ssr: false, loading: () => <div className="h-[300px] flex items-center justify-center text-gray-500">Loading chart...</div> }
);

interface FeedbackChartsProps {
  chartData: ChartDataPoint[];
  pieChartData: PieChartDataPoint[];
  selectedChart: ChartType;
}

export function FeedbackCharts({
  chartData,
  pieChartData,
  selectedChart,
}: FeedbackChartsProps) {
  return (
    <FeedbackChartsInner
      chartData={chartData}
      pieChartData={pieChartData}
      selectedChart={selectedChart}
    />
  );
}
