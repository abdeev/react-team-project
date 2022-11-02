import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserInfoThunk, registerThunk, logInThunk, logOutThunk } from "./thunksAuth";

const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState: {
        userInfo: { id: null, username: null, email: null, balance: null },
        userToken: null,
        isAuthentication: false,
    },
    extraReducers: {

        [getCurrentUserInfoThunk.pending](state, action) {
            state.isAuthentication = false;
        },
        [getCurrentUserInfoThunk.fulfilled](state, action) {
            state.userInfo = action.payload;
            state.isAuthentication = true;
        },
        [getCurrentUserInfoThunk.rejected](state, action) {
            state.isAuthentication = false;
        },

        [registerThunk.pending](state, action) {
            state.isAuthentication = false;
        },
        [registerThunk.fulfilled](state, action) {
            state.userInfo = action.payload.user;
            state.userToken = action.payload.token;
            state.isAuthentication = true;
        },
        [registerThunk.rejected](state, action) {
            state.isAuthentication = false;
        },

        [logInThunk.pending](state, action) {
            state.isAuthentication = false;
        },
        [logInThunk.fulfilled](state, { payload }) {
            state.userInfo = payload.user;
            state.userToken = payload.token;
            state.isAuthentication = true;
        },
        [logInThunk.rejected](state, action) {
            state.isAuthentication = false;
        },

        [logOutThunk.pending](state, action) {
            state.isAuthentication = true;
        },
        
        [logOutThunk.fulfilled](state, action) {
            state.userInfo = { id: null, username: null, email: null, balance: null };
            state.userToken = null;
            state.isAuthentication = false;            
        },
        
        [logOutThunk.rejected](state, action) {
            state.isAuthentication = true;
        },
    }
});

export default authenticationSlice.reducer;