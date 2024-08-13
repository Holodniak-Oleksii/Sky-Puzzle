import { IShortCityWetherModel } from '@/common/types/models';
import { IAPIWeather } from '@/common/types/weather';

export const formatShortCityWether = (
  weather: IAPIWeather
): IShortCityWetherModel => ({
  description: weather.weather[0].description,
  icon: weather.weather?.[0].icon || '',
  name: weather.name,
  id: weather.id,
});
