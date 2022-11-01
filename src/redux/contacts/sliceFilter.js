import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filterSlice",
    initialState: {
        filter: '',
    },
    reducers: {
        searchContacts: {
            reducer( state, action) {
                state.filter = action.payload;
            },
            prepare(filter) {
                return {
                    payload: filter,
                }
            }
        }
    }
});

export const { searchContacts } = filterSlice.actions;
export const reducerFilter = filterSlice.reducer;