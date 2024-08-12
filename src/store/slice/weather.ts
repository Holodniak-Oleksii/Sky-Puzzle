import { IAPIWeather } from '@/common/types/weather';
import {
  getWeatherById,
  getWeatherByQuery,
  getWeatherForMultipleCities,
} from '@/services/api/weather';
import { saveCitiesToLocalStorage } from '@/utils/helpers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface IWeatherState {
  cities: IAPIWeather[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IWeatherState = {
  cities: [],
  status: 'idle',
  error: null,
};

export const fetchWeatherForMultipleCities = createAsyncThunk(
  'weather/fetchWeatherForMultipleCities',
  async (_, { rejectWithValue }) => {
    try {
      const weatherData = await getWeatherForMultipleCities();
      return weatherData;
    } catch (error) {
      return rejectWithValue(
        'Failed to fetch weather data for multiple cities.'
      );
    }
  }
);

export const addCityByQuery = createAsyncThunk(
  'weather/addCityByQuery',
  async (query: string, { getState, rejectWithValue }) => {
    const state = getState() as { weather: IWeatherState };
    const cityExists = state.weather.cities.some(
      (c) => c.name.toLowerCase() === query.toLowerCase()
    );

    if (cityExists) {
      return rejectWithValue('City already added.');
    }

    try {
      const weatherData = await getWeatherByQuery(query);
      return weatherData;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(`Failed to fetch weather data. ${error.message}`);
    }
  }
);

export const refreshById = createAsyncThunk(
  'weather/refreshById',
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { weather: IWeatherState };
      const cityExists = state.weather.cities.find((c) => c.id === id);

      if (!cityExists) {
        return rejectWithValue('City not exist');
      }

      const data = await getWeatherById(id);
      return { data, id };
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(`Failed to fetch weather data. ${error.message}`);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCityById: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((c) => c.id !== action.payload);
      saveCitiesToLocalStorage(state.cities);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCityByQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCityByQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = [action.payload, ...state.cities];
        state.error = null;
        saveCitiesToLocalStorage(state.cities);
      })
      .addCase(addCityByQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(refreshById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = state.cities.map((city) =>
          city.id === action.payload.id ? action.payload.data : city
        );
        state.error = null;
      })
      .addCase(refreshById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(fetchWeatherForMultipleCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchWeatherForMultipleCities.fulfilled,
        (state, action: PayloadAction<IAPIWeather[]>) => {
          state.status = 'succeeded';
          state.cities = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWeatherForMultipleCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { removeCityById } = weatherSlice.actions;

export default weatherSlice.reducer;
