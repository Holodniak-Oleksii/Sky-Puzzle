import { AppDispatch, RootState } from '@/store';

import { removeCityById } from '@/store/slice/city';
import cityThunk from '@/store/thunk/city';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, error } = useSelector((state: RootState) => state.city);

  const isFetched = useRef(data.length > 0 || !!error);

  const addCity = (query: string) => {
    dispatch(cityThunk.addWeatherByQueryThunk(query));
  };

  const removeCity = (id: number) => {
    dispatch(removeCityById(id));
  };

  const fetchAll = () => {
    dispatch(cityThunk.getWatchedWeathersThunk({}));
  };

  const refetch = (id: number) => {
    dispatch(cityThunk.refreshWeatherByIdThunk(id));
  };

  useEffect(() => {
    if (!isFetched.current) {
      fetchAll();
      isFetched.current = true;
    }
  }, []);

  return {
    data,
    addCity,
    removeCity,
    refetch,
    refetchAll: fetchAll,
  };
};

export default useCities;
