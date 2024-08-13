import { IShortCityWeatherModel } from '@/common/types/models';
import { IAPIWeather } from '@/common/types/weather';

export const formatShortCityWether = (
  weather: IAPIWeather
): IShortCityWeatherModel => ({
  description: weather.weather[0].description,
  icon: weather.weather?.[0].icon || '',
  name: weather.name,
  id: weather.id,
  humidity: weather.main.humidity,
  pressure: weather.main.pressure,
  temperature: +weather.main.temp.toFixed(0),
  windSpeed: weather.wind.speed,
  weather: weather.weather[0].main,
});
