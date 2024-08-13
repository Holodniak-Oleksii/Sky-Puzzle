import { EMETRIC_TYPE } from '@/common/types/enums';
import { IShortCityWeatherModel } from '@/common/types/models';
import { IList } from '@/common/types/weather';

const sourceURL = import.meta.env.VITE_IMAGE_SOURCE_URL;
const storageKey = import.meta.env.VITE_STORAGE_KEY;

export const getImage = (image?: string, size?: number) =>
  sourceURL.replace('IMAGE', image).replace('SIZE', size || 1);

export const saveCitiesToLocalStorage = (cities: IShortCityWeatherModel[]) => {
  try {
    const cityIds = cities.map((city) => city.id);
    localStorage.setItem(storageKey, cityIds.join(','));
  } catch (error) {
    console.error('Failed to save cities to localStorage:', error);
  }
};

export const getCardWidth = (gap: string, count: number) =>
  `calc(100% / ${count} - (${gap} - ${gap} / ${count}))`;

export const getMetricData = (metric: EMETRIC_TYPE, entry: IList) => {
  switch (metric) {
    case EMETRIC_TYPE.PRESSURE:
      return entry.main.pressure;
    case EMETRIC_TYPE.HUMIDITY:
      return entry.main.humidity;
    case EMETRIC_TYPE.WIND_SPEED:
      return entry.wind.speed;
    case EMETRIC_TYPE.TEMPERATURE:
    default:
      return entry.main.temp;
  }
};
