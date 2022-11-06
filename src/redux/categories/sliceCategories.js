import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesThunk } from "./thunkCategories";

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        categories: [],
    },
    extraReducers: {

        [getCategoriesThunk.pending](state, action) {
            state.categories = [];
        },
        [getCategoriesThunk.fulfilled](state, action) {
            state.categories = action.payload;
        },
        [getCategoriesThunk.rejected](state, action) {
            state.categories = [];
        },

    }
});

export default categoriesSlice.reducer;