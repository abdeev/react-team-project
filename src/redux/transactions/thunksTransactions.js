import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../services/axiosConfig';

export const getTransactionsThunk = createAsyncThunk(
  'transactions/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request('/api/transactions');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransactionThunk = createAsyncThunk(
  'transaction/add',
  async (transaction, { rejectWithValue } ) => {
    try {
      const { data } = await request.post('/api/transactions', transaction);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransactionThunk = createAsyncThunk(
  'transaction/update',
  async (transaction, { rejectWithValue }) => {
  try {
    const { data } = await request.patch(`/api/transactions/${transaction.id}`, {
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      transactionDate: transaction.transactionDate,
      type: transaction.type,
      comment: transaction.comment,
    });
    return data;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTransactionsThunk = createAsyncThunk(
  'transaction/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await request.delete(`/api/transactions/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
