import { createAsyncThunk } from '@reduxjs/toolkit';
import { request, setToken } from 'redux/services/axiosConfig';

export const getCategoriesThunk = createAsyncThunk(
  'transactions/categories',
  async (_, thunkAPI) => {
    const userToken = thunkAPI.getState().authorization.userToken;

    try {
      if (!userToken) {
        return thunkAPI.rejectWithValue();
      }
      setToken.add(userToken);
      const { data } = await request('/api/transaction-categories');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
