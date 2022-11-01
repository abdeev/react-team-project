import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from 'redux/services/axiosConfig';

export const getContactsThunk = createAsyncThunk("contacts/get", async (_, thunkAPI) => {
    try {
        const { data } = await request('/contacts');
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContactsThunk = createAsyncThunk("contacts/add", async (contact, thunkAPI) => {
    try {
        const { data } = await request.post('/contacts', contact);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const editContactsThunk = createAsyncThunk("contacts/update", async (contact, thunkAPI) => {    
    try {
        const { data } = await request.patch(`/contacts/${contact.id}`, { name: contact.name, number: contact.number });
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteContactsThunk = createAsyncThunk("contacts/delete", async (id, thunkAPI) => {
    try {
        const { data } = await request.delete(`/contacts/${id}`);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});