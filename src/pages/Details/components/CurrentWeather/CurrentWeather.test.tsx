import { IAPIWeather } from '@/common/types/weather';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CurrentWeather from './CurrentWeather';

const mockWeather: IAPIWeather = {
  coord: {
    lon: 139.6917,
    lat: 35.6895,
  },
  weather: [
    {
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d',
    },
  ],
  base: 'stations',
  main: {
    temp: 29.76,
    feels_like: 36.76,
    temp_min: 27.59,
    temp_max: 30.99,
    pressure: 1008,
    humidity: 80,
    sea_level: 1008,
    grnd_level: 1006,
  },
  visibility: 10000,
  wind: {
    gust: 0,
    speed: 3.6,
    deg: 170,
  },
  clouds: {
    all: 20,
  },
  dt: 1723585996,
  sys: {
    country: 'JP',
    sunrise: 1723579163,
    sunset: 1723627961,
  },
  timezone: 32400,
  id: 1850147,
  name: 'Tokyo',
  cod: 200,
};

describe('CurrentWeather', () => {
  it('should render weather data correctly', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText(/29.76°/)).toBeInTheDocument();

    expect(screen.getByText('Tokyo, few clouds')).toBeInTheDocument();

    expect(screen.getByText(/Feels Like:/)).toBeInTheDocument();
    expect(screen.getByText(/36.76°/)).toBeInTheDocument();

    expect(screen.getByText(/80%/)).toBeInTheDocument();

    expect(screen.getByText(/Wind Speed:/)).toBeInTheDocument();
    expect(screen.getByText(/3.6 m\/s/)).toBeInTheDocument();

    const weatherImage = screen.getByRole('img');
    expect(weatherImage).toBeInTheDocument();
    expect(weatherImage).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/02d@4x.png'
    );
  });
});
