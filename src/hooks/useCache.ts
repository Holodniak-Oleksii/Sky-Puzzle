import { AppDispatch, RootState } from '@/store';

import cacheThunk from '@/store/thunk/cache';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCache = (id?: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, status } = useSelector(
    (state: RootState) => state.cache
  );

  useEffect(() => {
    if (id) {
      dispatch(cacheThunk.getWeatherByIdThunk(id));
      dispatch(cacheThunk.getDailyForecastByCityThunk(id));
    }
  }, [id]);

  return {
    data: data.find((c) => c.id === id),
    error,
    status,
  };
};

export default useCache;
