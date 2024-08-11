import { AppDispatch, RootState } from '@/store';
import {
  addCityByQuery,
  fetchWeatherForMultipleCities,
  IWeatherState,
  removeCityById,
} from '@/store/slice/weather';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(
    (state: RootState) => state.weather
  ) as IWeatherState;

  const isFetched = useRef(data.cities.length > 0);

  const addCity = (query: string) => {
    dispatch(addCityByQuery(query));
  };

  const removeCity = (id: number) => {
    dispatch(removeCityById(id));
  };

  const fetchAll = () => {
    dispatch(fetchWeatherForMultipleCities());
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
    refetchAll: fetchAll,
  };
};

export default useWeather;
