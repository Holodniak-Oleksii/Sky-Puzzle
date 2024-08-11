import { IAPIWeather } from '@/common/types/weather';
import baseApi from '@/services/api';
const storageKey = import.meta.env.VITE_STORAGE_KEY;

export const getWeatherByQuery = async (
  query: string
): Promise<IAPIWeather> => {
  const response = await baseApi.get('weather', {
    params: { q: query },
  });
  return response.data;
};

export const getWeatherForMultipleCities = async (): Promise<IAPIWeather[]> => {
  const ids = localStorage.getItem(storageKey);
  if (!ids) return [];

  const response = await baseApi.get(`group`, {
    params: {
      id: ids,
      units: 'metric',
    },
  });

  return response.data.list;
};
