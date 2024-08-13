import { EAPI_KEY, EAPI_STATUS } from '@/common/types/enums';
import { ICacheState } from '@/store/types';
import { createSlice } from '@reduxjs/toolkit';
import cacheThunk from '../thunk/cache';

const initialState: ICacheState = {
  data: [],
  status: EAPI_STATUS.IDLE,
  error: null,
};

const cacheSlice = createSlice({
  name: EAPI_KEY.CACHE,
  initialState,
  reducers: {
    addCachedCity: (state, action) => {
      const newData = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const dataMap = new Map(state.data.map((item) => [item.id, item]));

      newData.forEach((item) => {
        dataMap.set(item.id, item);
      });

      state.data = Array.from(dataMap.values());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cacheThunk.getWeatherByIdThunk.pending, (state) => {
        state.status = EAPI_STATUS.LOADING;
      })
      .addCase(cacheThunk.getWeatherByIdThunk.fulfilled, (state, action) => {
        state.status = EAPI_STATUS.FAILED;
        state.error = null;
        if (action.payload !== null) {
          state.data = [action.payload, ...state.data];
        }
      })
      .addCase(cacheThunk.getWeatherByIdThunk.rejected, (state, action) => {
        state.status = EAPI_STATUS.FAILED;
        state.error = action.payload as string;
      });
  },
});

export const { addCachedCity } = cacheSlice.actions;

export default cacheSlice.reducer;
