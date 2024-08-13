import { IAPIWeather } from '@/common/types/weather';
import baseApi from '@/services/api';
const storageKey = import.meta.env.VITE_STORAGE_KEY;

const getWeatherByQuery = async (q: string): Promise<IAPIWeather> => {
  const response = await baseApi.get(`weather?q=${q}`);
  return response.data;
};

const getWatchedWeathers = async (): Promise<IAPIWeather[]> => {
  const ids = localStorage.getItem(storageKey);
  if (!ids) return [];

  const response = await baseApi.get(`group?id=${ids}`);
  return response.data.list;
};

const getWeatherById = async (id: number): Promise<IAPIWeather> => {
  const response = await baseApi.get(`weather?id=${id}`);
  return response.data;
};

export default {
  getWatchedWeathers,
  getWeatherById,
  getWeatherByQuery,
};
