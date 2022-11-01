import { createAsyncThunk } from '@reduxjs/toolkit';
import { request, setToken } from 'redux/services/axiosConfig';

export const getCurrentUserInfoThunk = createAsyncThunk('authentication/currentUser', async (_, thunkAPI) => {
    const userToken = thunkAPI.getState().authorization.userToken;

    try {
        if (!userToken) {
            return thunkAPI.rejectWithValue();
        }
        setToken.add(userToken);
        const { data } = await request('/api/users/current');
        console.log(data);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const registerThunk = createAsyncThunk('authentication/register', async (registerUserInfo, thunkAPI) => {
    try {
        const { data } = await request.post('/api/auth/sign-up', registerUserInfo);
        console.log(data);
        setToken.add(data.token);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


export const logInThunk = createAsyncThunk('authentication/login', async (loginUserInfo, thunkAPI) => {
    try {
        const { data } = await request.post('/api/auth/sign-in', loginUserInfo);
        console.log(data);
        setToken.add(data.token);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logOutThunk = createAsyncThunk('authentication/logout', async (_, thunkAPI) => {
    try {
        const { data } = await request.delete('/api/auth/sign-out');
        console.log(data);
        setToken.remove();
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});