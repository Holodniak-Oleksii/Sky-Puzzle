import { IStoreTypes } from '@/store/types';
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

type AsyncThunkPayloadCreator<Arg, ReturnType, RejectValue> = (
  arg: Arg,
  thunkAPI: {
    dispatch: Dispatch;
    getState: () => IStoreTypes;
    rejectWithValue: (value: RejectValue) => any;
  }
) => Promise<ReturnType>;

const createThunk = <Arg, ReturnType, RejectValue>(
  prefix: string,
  functionName: string,
  asyncFunction: AsyncThunkPayloadCreator<Arg, ReturnType, RejectValue>,
  errorMessage?: string
) => {
  const typePrefix = `${prefix}/${functionName}`;

  return createAsyncThunk<
    ReturnType,
    Arg,
    { state: IStoreTypes; rejectValue: RejectValue }
  >(typePrefix, async (arg: Arg, thunkAPI) => {
    try {
      return await asyncFunction(arg, thunkAPI);
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = errorMessage || axiosError?.message;

      return thunkAPI.rejectWithValue(message as unknown as RejectValue);
    }
  });
};

export default createThunk;
