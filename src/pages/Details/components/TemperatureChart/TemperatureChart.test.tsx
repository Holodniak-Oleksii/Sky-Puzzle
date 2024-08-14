import { EMETRIC_TYPE } from '@/common/types/enums';
import { IAPIForecast } from '@/common/types/weather';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TemperatureChart from './TemperatureChart';

const mockForecast = {
  list: [
    {
      dt: 1723593600,
      main: {
        temp: 30.21,
        feels_like: 36.34,
        temp_min: 30.21,
        temp_max: 31.02,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 1006,
        humidity: 73,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: {
        all: 15,
      },
      wind: {
        speed: 4.13,
        deg: 171,
        gust: 3.94,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        country: 'US',
        sunrise: 0,
        sunset: 0,
      },
      dt_txt: '2024-08-14 00:00:00',
    },
  ],
} as IAPIForecast;

vi.mock('react-chartjs-2', () => ({
  Line: vi.fn(() => <div>Chart</div>),
}));

vi.mock('./data', () => ({
  getChartData: vi.fn(() => ({
    labels: ['Friday, 1'],
    datasets: [
      {
        label: 'Temperature',
        data: [30.21],
      },
    ],
  })),
  options: {},
}));

describe('TemperatureChart', () => {
  it('renders correctly with given forecast data', () => {
    render(<TemperatureChart forecast={mockForecast} />);

    expect(screen.getByText(EMETRIC_TYPE.TEMPERATURE)).toBeInTheDocument();
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });

  it('handles day change correctly', () => {
    render(<TemperatureChart forecast={mockForecast} />);

    const tab1 = screen.getByText('Wednesday 14');

    fireEvent.click(tab1);

    expect(tab1).toHaveClass('Mui-selected');
  });

  it('handles metric change correctly', () => {
    render(<TemperatureChart forecast={mockForecast} />);

    const select = screen.getByTestId('metric-select');
    fireEvent.mouseDown(select);

    const temperatureMetric = screen.getByText(EMETRIC_TYPE.TEMPERATURE);
    fireEvent.click(temperatureMetric);

    expect(select).toHaveTextContent(EMETRIC_TYPE.TEMPERATURE);
  });
});
