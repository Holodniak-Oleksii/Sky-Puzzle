import { EMETRIC_TYPE } from '@/common/types/enums';
import { IAPIForecast, IList } from '@/common/types/weather';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
} from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJs,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC, SetStateAction, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getChartData, options } from './data';

ChartJs.register(
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

interface ITemperatureChartProps {
  forecast: IAPIForecast;
}

const TemperatureChart: FC<ITemperatureChartProps> = ({ forecast }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedMetric, setSelectedMetric] = useState<EMETRIC_TYPE>(
    EMETRIC_TYPE.TEMPERATURE
  );

  const days = useMemo(
    () =>
      forecast.list.reduce<Record<string, IList[]>>((acc, entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
      }, {}),
    [forecast.list]
  );

  const dayKeys = Object.keys(days);

  const handleMetricChange = (event: SelectChangeEvent<string>) => {
    setSelectedMetric(event.target.value as EMETRIC_TYPE);
  };

  const handleDayChange = (_: any, newValue: SetStateAction<number>) => {
    setSelectedDay(newValue);
  };

  const renderDays = () => dayKeys.map((day) => <Tab key={day} label={day} />);
  const renderMetrics = () =>
    Object.values(EMETRIC_TYPE).map((metric, id) => (
      <MenuItem value={metric} key={id}>
        {metric}
      </MenuItem>
    ));

  return (
    <Box display={'flex'} flexDirection="column" gap={6}>
      <Box display={'flex'}>
        <Tabs
          value={selectedDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {renderDays()}
        </Tabs>
        <Box marginLeft="auto">
          <Select
            labelId="metric-select-label"
            id="metric-select"
            data-testid="metric-select"
            value={selectedMetric}
            onChange={handleMetricChange}
          >
            {renderMetrics()}
          </Select>
        </Box>
      </Box>

      <Line
        data={getChartData(days, dayKeys, selectedDay, selectedMetric)}
        options={options}
        height={100}
      />
    </Box>
  );
};

export default TemperatureChart;
