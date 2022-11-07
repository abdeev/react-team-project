import { createSlice } from '@reduxjs/toolkit';
import { getStatisticsUserThunk } from './thunkStatictics';

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    statisticsTransactions: {
      categoriesSummary: [],
      incomeSummary: 0,
      expenseSummary: 0,
      periodTotal: 0,
    },

    isLoading: false,
  },
  extraReducers: {
    [getStatisticsUserThunk.pending](state, action) {
      state.isLoading = true;
    },
    [getStatisticsUserThunk.fulfilled](state, action) {
      state.isLoading = false;
      state.statisticsTransactions = action.payload;
    },
    [getStatisticsUserThunk.rejected](state, action) {
      state.isLoading = false;
    },
  },
});

export const reducerStatistics = statisticsSlice.reducer;
