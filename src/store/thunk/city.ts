import { EAPI_KEY } from '@/common/types/enums';
import weatherService from '@/services/api/weather';
import { addCachedCity } from '@/store/slice/cache';
import { formatShortCityWether } from '@/utils/formating';
import createThunk from '@/utils/thunk';

const getWatchedWeathersThunk = createThunk(
  EAPI_KEY.CITY,
  'getWatchedWeathersThunk',
  async (_, { dispatch }) => {
    const data = await weatherService.getWatchedWeathers();
    dispatch(addCachedCity(data));
    return data.map((w) => formatShortCityWether(w));
  }
);

const addWeatherByQueryThunk = createThunk(
  EAPI_KEY.CITY,
  'addWeatherByQueryThunk',
  async (q: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const isExist = state.city.data.some(
      (c) => c.name.toLowerCase() === q.toLowerCase()
    );

    if (isExist) {
      return rejectWithValue('City already added.');
    }

    const data = await weatherService.getWeatherByQuery(q);
    dispatch(addCachedCity(data));
    return formatShortCityWether(data);
  }
);

const refreshWeatherByIdThunk = createThunk(
  EAPI_KEY.CITY,
  'refreshWeatherByIdThunk',
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const isExist = state.city.data.find((c) => c.id === id);

    if (!isExist) {
      return rejectWithValue('City not exist');
    }

    const data = await weatherService.getWeatherById(id);
    dispatch(addCachedCity(data));
    return { data: formatShortCityWether(data), id };
  }
);

export default {
  refreshWeatherByIdThunk,
  addWeatherByQueryThunk,
  getWatchedWeathersThunk,
};
