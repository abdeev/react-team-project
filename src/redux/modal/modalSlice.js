import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modalSlice",
    initialState: {
        isShowModal: false,
    },
    
    reducers: {
        showModal( state, action ) {
            return state.isShowModal = action.payload;
        },
    }
});

export const { showModal } = modalSlice.actions;
export const reducerShowModal = modalSlice.reducer;