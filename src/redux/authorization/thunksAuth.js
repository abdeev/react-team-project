import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { request, setToken } from '../../services/axiosConfig';

export const getCurrentUserInfoThunk = createAsyncThunk(
  'authentication/currentUser',
  async(_, { getState, rejectWithValue } ) => {
    const userToken = getState().authorization.userToken;

    try {
      if (!userToken) {
        return rejectWithValue();
      }
      setToken.add(userToken);
      const { data } = await request('/api/users/current');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'authentication/register',
  async (registerUserInfo, { rejectWithValue }) => {
    try {
      const { data } = await request.post(
        '/api/auth/sign-up',
        registerUserInfo
      );
      setToken.add(data.token);
      return data;
    } catch (error) {
      Notify.failure(`User with this email is already registered`);
      return rejectWithValue(error.message);
    }
  }
);

export const logInThunk = createAsyncThunk(
  'authentication/login',
  async (loginUserInfo, { rejectWithValue }) => {
    try {
      const { data } = await request.post('/api/auth/sign-in', loginUserInfo);
      setToken.add(data.token);
      return data;
    } catch (error) {
      Notify.failure('Incorrect email or password');
      return rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'authentication/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request.delete('/api/auth/sign-out');
      setToken.remove();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
