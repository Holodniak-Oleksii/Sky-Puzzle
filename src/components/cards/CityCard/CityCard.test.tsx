import { LINK_TEMPLATES } from '@/common/constants/link-templates';
import { IShortCityWeatherModel } from '@/common/types/models';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import CityCard from './CityCard';

vi.mock('@/hooks/useCities', () => ({
  default: () => ({
    refetch: vi.fn(),
    removeCity: vi.fn(),
  }),
}));

vi.mock('@/utils/helpers', () => ({
  getImage: vi.fn().mockReturnValue('mocked-image-url'),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('CityCard', () => {
  const weather: IShortCityWeatherModel = {
    id: 1,
    icon: 'clear',
    description: 'Clear sky',
    weather: 'Sunny',
    temperature: 25,
    name: 'CityName',
    windSpeed: 10,
    humidity: 60,
    pressure: 1015,
  };

  it('should render the city card with weather data', () => {
    render(<CityCard weather={weather} />, { wrapper: MemoryRouter });

    expect(screen.getByAltText(weather.description)).toBeInTheDocument();
    expect(screen.getByText(weather.weather)).toBeInTheDocument();
    expect(screen.getByText(`${weather.temperature}°`)).toBeInTheDocument();
    expect(screen.getByText(weather.name)).toBeInTheDocument();
  });

  it('should handle card click and navigate to details page', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(<CityCard weather={weather} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId('card-navigate'));

    expect(navigate).toHaveBeenCalledWith(LINK_TEMPLATES.DETAILS(weather.id));
  });
});
