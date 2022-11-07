import { request } from 'redux/services/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getStatisticsUserThunk = createAsyncThunk(
  'statistics/api/transactions-summary',
  async (termin, { getState, rejectWithValue }) => {
    const userToken = getState().authorization.userToken;
    if (!userToken) {
      return rejectWithValue();
    }

    try {
      let params = {};
      if (termin) {
        if (termin.electYear) {
          params.year = termin.electYear;
        }
        if (termin.electYear && termin.electMonth) {
          params.month = termin.electMonth;
        }
        if (!termin.electYear && termin.electMonth) {
          params.month = termin.electMonth;
          params.year = new Date().getFullYear();
        }
      }

      const { data } = await request.get('/api/transactions-summary', {
        params,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
