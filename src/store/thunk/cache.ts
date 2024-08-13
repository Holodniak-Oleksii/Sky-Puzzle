import { EAPI_KEY } from '@/common/types/enums';
import weatherService from '@/services/api/weather';
import createThunk from '@/utils/thunk';

const getWeatherByIdThunk = createThunk(
  EAPI_KEY.CITY,
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
export default {
  getWeatherByIdThunk,
};
