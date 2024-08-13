import { EAPI_KEY } from '@/common/types/enums';
import weatherService from '@/services/api/weather';
import createThunk from '@/utils/thunk';

const getWeatherByIdThunk = createThunk(
  EAPI_KEY.CACHE,
  'getWeatherByIdThunk',
  async (id: number, { getState }) => {
    const state = getState();
    const isExist = state.cache.data.some((c) => c.id === id);

    if (isExist) {
      return null;
    }

    return await weatherService.getWeatherById(id);
  }
);

const getDailyForecastByCityThunk = createThunk(
  EAPI_KEY.CACHE,
  'getDailyForecastByCityThunk',
  async (id: number, { getState }) => {
    const state = getState();
    const city = state.cache.data.find((c) => c.id === id);

    if (city?.forecast) {
      return null;
    }

    return await weatherService.getDailyForecastByCity(id);
  }
);
export default {
  getWeatherByIdThunk,
  getDailyForecastByCityThunk,
};
