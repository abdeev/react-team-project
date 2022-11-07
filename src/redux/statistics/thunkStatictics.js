import { request, setToken } from 'services/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getStatisticsUserThunk = createAsyncThunk(
  'statistics/api/transactions-summary',
  async (termin, thunkAPI) => {
    const userToken = thunkAPI.getState().authorization.userToken;
    if (!userToken) {
      return thunkAPI.rejectWithValue();
    }

    try {
      setToken.add(userToken);

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
          params.year = 2022;
        }
      }

      const { data } = await request.get('/api/transactions-summary', {
        params: { ...params },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
