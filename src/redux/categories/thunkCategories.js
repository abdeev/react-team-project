import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'services/axiosConfig';

export const getCategoriesThunk = createAsyncThunk(
  'transactions/categories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request('/api/transaction-categories');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
