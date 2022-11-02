import { createSlice } from "@reduxjs/toolkit";

import { getContactsThunk, addContactsThunk, editContactsThunk, deleteContactsThunk } from "./thunksContacts";

const contactsSlice = createSlice({
    name: "contactsSlice",
    initialState: {
        contacts: {
            items: [],
            isLoading: false,
            error: null,
        },
    },

    extraReducers: {
            
        [getContactsThunk.pending](state) {
            state.contacts.isLoading = true;
        },
        [getContactsThunk.fulfilled](state, { payload }) {
            state.contacts.items = payload;
            state.contacts.isLoading = false;
            state.contacts.error = null;
        },
        [getContactsThunk.rejected](state, { payload }) {
            state.contacts.isLoading = false;
            state.contacts.error = payload;
        },
        
        [addContactsThunk.pending](state) {
            state.contacts.isLoading = true;
        },
        [addContactsThunk.fulfilled](state, { payload }) {
            state.contacts.items = [...state.contacts.items, payload];
            state.contacts.isLoading = false;
            state.contacts.error = null;
        },
        [addContactsThunk.rejected](state, { payload }) {
            state.contacts.isLoading = false;
            state.contacts.error = payload;
        },

        [editContactsThunk.pending](state) {
            state.contacts.isLoading = true;
        },
        [editContactsThunk.fulfilled](state, { payload }) {
            state.contacts.items = [...state.contacts.items.filter(userContact => userContact.id !== payload.id), payload]
            state.contacts.isLoading = false;
            state.contacts.error = null;
        },
        [editContactsThunk.rejected](state, { payload }) {
            state.contacts.isLoading = false;
            state.contacts.error = payload;
        },
        
        [deleteContactsThunk.pending](state) {
            state.contacts.isLoading = true;
        },
        [deleteContactsThunk.fulfilled](state, { payload }) {
            state.contacts.isLoading = false;
            state.contacts.error = null;
            state.contacts.items = state.contacts.items.filter(contact => contact.id !== payload.id);
        },
        [deleteContactsThunk.rejected](state, { payload }) {
            state.contacts.isLoading = false;
            state.contacts.error = payload;
        },

    }
});

export const reducerContacts = contactsSlice.reducer;