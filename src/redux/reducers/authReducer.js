import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    isAuthUser: false,
    authToken: null
};

export const authSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuthDetails (state, {payload}) {
            state.isAuthUser = payload.authUser;
            state.authToken = payload.token;
        },
        clearAuthDetails (state, {payload}) {
            state.isAuthUser = false;
            state.authToken = null;
        }
    }
});

export const {
    setAuthDetails,
    clearAuthDetails
} = authSlice.actions;
export default authSlice.reducer;