import { createSlice } from '@reduxjs/toolkit';
import { getStatisticsUserThunk } from './thunkStatictics';

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    year: 0,
    month: 0,
    isLoading: false,
  },
  extraReducers: {
    [getStatisticsUserThunk.pending](state, action) {
      state.isLoading = true;
    },
    [getStatisticsUserThunk.fulfilled](state, action) {
      state.categoriesSummary = action.payload.categoriesSummary;
      state.incomeSummary = action.payload.incomeSummary;
      state.expenseSummary = action.payload.expenseSummary;
      state.periodTotal = action.payload.periodTotal;
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.isLoading = false;
    },
    [getStatisticsUserThunk.rejected](state, action) {
      state.isLoading = false;
    },
  },
});

export const reducerStatistics = statisticsSlice.reducer;
