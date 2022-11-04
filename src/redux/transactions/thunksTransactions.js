import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'redux/services/axiosConfig';

export const getTransactionsThunk = createAsyncThunk(
  'contacts/get',
  async (_, thunkAPI) => {
    try {
      const { data } = await request('/api/transactions');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransactionThunk = createAsyncThunk(
  'contacts/add',
  async (transaction, thunkAPI) => {
    try {
      const { data } = await request.post('/api/transactions', transaction);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransactionThunk = createAsyncThunk("contacts/update", async (transaction, thunkAPI) => {   

  try {
        const { data } = await request.patch(`/api/transactions/${transaction.id}`, {
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            transactionDate: transaction.transactionDate,
            type: transaction.type,
            comment: transaction.comment,
        });
        console.log(data);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteTransactionsThunk = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      const { data } = await request.delete(`/api/transactions/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
