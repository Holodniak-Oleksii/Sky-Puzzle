import { EMETRIC_TYPE } from '@/common/types/enums';
import { IList } from '@/common/types/weather';
import { getMetricData } from '@/utils/helpers';

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.3)',
      },
    },
  },
};

export const getChartData = (
  days: Record<string, IList[]>,
  dayKeys: string[],
  selectedDay: number,
  selectedMetric: EMETRIC_TYPE
) => ({
  labels: days[dayKeys[selectedDay]].map((entry) =>
    new Date(entry.dt * 1000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  ),
  datasets: [
    {
      label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
      data: days[dayKeys[selectedDay]].map((entry) =>
        getMetricData(selectedMetric, entry)
      ),
      fill: true,
      borderColor: 'rgb(75, 95, 192)',
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, 'rgba(75, 89, 192, 0.2)');
        gradient.addColorStop(1, 'rgba(75, 97, 192, 0.5)');
        return gradient;
      },
      tension: 0.1,
    },
  ],
});
