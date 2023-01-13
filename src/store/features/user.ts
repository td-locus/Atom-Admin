/**
 * User Slice
 */

// Dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import configuration from '../../config';

const { USER_STORAGE_KEY, TOKEN_STORAGE_KEY } = configuration.CLIENT_STORAGE_KEYS;

interface UserState {
    admin: Admin | undefined;
    token?: string;
}

const initialState: UserState = {
    admin: sessionStorage.getItem(USER_STORAGE_KEY) ? JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!) : undefined,
    token: sessionStorage.getItem(TOKEN_STORAGE_KEY) ? sessionStorage.getItem(TOKEN_STORAGE_KEY)! : undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAdmin: (state, action: PayloadAction<UserState>) => {
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload.admin));
            sessionStorage.setItem(TOKEN_STORAGE_KEY, action.payload.token!);
        },
        logoutAdmin: state => {
            state.admin = initialState.admin;
            state.token = initialState.token;
            sessionStorage.clear();
        },
    },
});

export const { loginAdmin, logoutAdmin } = userSlice.actions;

export default userSlice.reducer;
