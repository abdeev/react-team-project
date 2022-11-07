import { createSlice } from '@reduxjs/toolkit';

import {
  getTransactionsThunk,
  addTransactionThunk,
  editTransactionThunk,
  deleteTransactionsThunk,
} from './thunksTransactions';

const transactionsSlice = createSlice({
  name: 'transactionsSlice',
  initialState: {
    transactions: {
      items: [],
      isLoading: false,
      isEditing: false,
      isDeleting: false,
    },
  },

  extraReducers: {
    [getTransactionsThunk.pending](state) {
      state.transactions.isLoading = true;
    },
    [getTransactionsThunk.fulfilled](state, action) {
      state.transactions.items = action.payload;
      state.transactions.isLoading = false;
    },
    [getTransactionsThunk.rejected](state, action) {
      state.transactions.isLoading = false;
    },

    [addTransactionThunk.pending](state) {
      state.transactions.isLoading = true;
    },
    [addTransactionThunk.fulfilled](state, action) {
      state.transactions.items = [...state.transactions.items, action.payload];
      state.transactions.isLoading = false;
    },
    [addTransactionThunk.rejected](state, action) {
      state.transactions.isLoading = false;
    },

    [editTransactionThunk.pending](state) {
      state.transactions.isEditing = true;
    },
    [editTransactionThunk.fulfilled](state, action) {
      state.transactions.items = [
        ...state.transactions.items.filter(
          transaction => transaction.id !== action.payload.id
        ),
        action.payload,
      ];
      state.transactions.isEditing = false;
    },
    [editTransactionThunk.rejected](state, action) {
      state.transactions.isEditing = false;
    },

    [deleteTransactionsThunk.pending](state) {
      state.transactions.isDeleting = true;
    },
    [deleteTransactionsThunk.fulfilled](state, action) {
      state.transactions.isDeleting = false;
      state.transactions.items = state.transactions.items.filter(
        transaction => transaction.id !== action.payload.id
      );
    },
    [deleteTransactionsThunk.rejected](state, action) {
      state.transactions.isDeleting = false;
    },
  },
});

export const reducerTransactions = transactionsSlice.reducer;
