import { EAPI_KEY } from '@/common/types/enums';
import { IStoreTypes } from '@/store/types';
import { configureStore } from '@reduxjs/toolkit';
import cacheReducer from './slice/cache';
import cityReducer from './slice/city';

const store = configureStore<IStoreTypes>({
  reducer: {
    [EAPI_KEY.CITY]: cityReducer,
    [EAPI_KEY.CACHE]: cacheReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
