import { EAPI_KEY, EAPI_STATUS } from '@/common/types/enums';
import { IShortCityWeatherModel } from '@/common/types/models';
import { IAPIWeather } from '@/common/types/weather';

export interface ICityState {
  data: IShortCityWeatherModel[];
  status: EAPI_STATUS;
  error: string | null;
}

export interface ICacheState extends Pick<ICityState, 'error' | 'status'> {
  data: IAPIWeather[];
}

export interface IStoreTypes {
  [EAPI_KEY.CITY]: ICityState;
  [EAPI_KEY.CACHE]: ICacheState;
}
