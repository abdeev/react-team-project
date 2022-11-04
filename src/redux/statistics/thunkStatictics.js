import { request, setToken } from 'redux/services/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getStatisticsUserThunk = createAsyncThunk(
  'statistics/api/transactions-summary',
  async (termin, thunkAPI) => {
    console.log(termin);
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

// export const getStatisticsUserThunk = createAsyncThunk(
//   'statistics/api/transactions-summary',
//   async (date, thunkAPI) => {
//     console.log(date);
//     const userToken = thunkAPI.getState().authorization.userToken;
//     if (!userToken) {
//       return thunkAPI.rejectWithValue();
//     }

//     try {
//       setToken.add(userToken);
//       const { data } = await request.get('/api/transactions-summary', {
//         year: date.electYear,
//         month: date.electMonth,
//       });
//       // console.log(date.electMonth);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
