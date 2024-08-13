import { EAPI_KEY, EAPI_STATUS } from '@/common/types/enums';
import { ICityState } from '@/store/types';
import { saveCitiesToLocalStorage } from '@/utils/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cityThunk from '../thunk/city';

const initialState: ICityState = {
  data: [],
  status: EAPI_STATUS.IDLE,
  error: null,
};

const citySlice = createSlice({
  name: EAPI_KEY.CITY,
  initialState,
  reducers: {
    removeCityById: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((c) => c.id !== action.payload);
      saveCitiesToLocalStorage(state.data);
    },
  },
  extraReducers: (builder) => {
    builder

      // ----------------------------------------------------------------

      .addCase(cityThunk.addWeatherByQueryThunk.pending, (state) => {
        state.status = EAPI_STATUS.LOADING;
      })
      .addCase(cityThunk.addWeatherByQueryThunk.fulfilled, (state, action) => {
        state.status = EAPI_STATUS.SUCCEEDED;
        state.error = null;

        state.data = [action.payload, ...state.data];
        saveCitiesToLocalStorage(state.data);
      })
      .addCase(cityThunk.addWeatherByQueryThunk.rejected, (state, action) => {
        state.status = EAPI_STATUS.FAILED;
        state.error = action.payload as string;
      })

      // ----------------------------------------------------------------

      .addCase(cityThunk.refreshWeatherByIdThunk.pending, (state) => {
        state.status = EAPI_STATUS.LOADING;
      })
      .addCase(cityThunk.refreshWeatherByIdThunk.fulfilled, (state, action) => {
        state.status = EAPI_STATUS.SUCCEEDED;
        state.error = null;

        state.data = state.data.map((city) =>
          city.id === action.payload.id ? action.payload.data : city
        );
      })
      .addCase(cityThunk.refreshWeatherByIdThunk.rejected, (state, action) => {
        state.status = EAPI_STATUS.FAILED;
        state.error = action.payload as string;
      })

      // ----------------------------------------------------------------

      .addCase(cityThunk.getWatchedWeathersThunk.pending, (state) => {
        state.status = EAPI_STATUS.LOADING;
      })
      .addCase(cityThunk.getWatchedWeathersThunk.fulfilled, (state, action) => {
        state.status = EAPI_STATUS.SUCCEEDED;

        state.data = action.payload;
        state.error = null;
      })
      .addCase(cityThunk.getWatchedWeathersThunk.rejected, (state, action) => {
        state.status = EAPI_STATUS.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const { removeCityById } = citySlice.actions;

export default citySlice.reducer;
