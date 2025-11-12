import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    isAutenticated: boolean;
    userName: string;
    userRole: string;
}

const initialAuthState: AuthState = {
    isAutenticated: false,
    userName: '',
    userRole: '',
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: ( state, action ) => {
            const userData = action.payload;
            state.isAutenticated = true;
            state.userName = userData.name;
            state.userRole = userData.role;
        },
        logout: ( state ) => {
            state = initialAuthState
        }
    },
})

export const authActions = authSlice.actions;
export default authSlice.reducer;