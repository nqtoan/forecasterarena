'use client';

import { useEffect, useState } from 'react';
import PerformanceChartComponent from '@/components/charts/PerformanceChart';
import TimeRangeSelector, { TimeRange } from '@/components/charts/TimeRangeSelector';
import { MODELS } from '@/lib/constants';

export default function V2PortfolioChart() {
  const [chartData, setChartData] = useState<Array<{ date: string; [key: string]: number | string }>>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await fetch('/api/performance-data');
        if (res.ok) {
          const json = await res.json();
          setChartData(json.data || []);
        }
      } catch {
        console.log('Error fetching chart data');
      } finally {
        setLoading(false);
      }
    }
    fetchChartData();
  }, []);

  const modelConfigs = MODELS.map(m => ({
    id: m.id,
    name: m.displayName,
    color: m.color
  }));

  return (
    <section className="container-wide mx-auto px-6 py-8 md:py-10">
      <div className="chart-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <p className="text-[var(--accent-gold)] font-mono text-sm tracking-wider mb-2">PERFORMANCE</p>
            <h2 className="text-2xl md:text-3xl">Portfolio Value Over Time</h2>
          </div>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        <PerformanceChartComponent
          data={chartData}
          models={modelConfigs}
          height={380}
          showLegend={true}
          timeRange={timeRange}
        />
      </div>
    </section>
  );
}

