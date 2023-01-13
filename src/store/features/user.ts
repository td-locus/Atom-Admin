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
    admin: localStorage.getItem(USER_STORAGE_KEY) ? JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!) : undefined,
    token: localStorage.getItem(TOKEN_STORAGE_KEY) ? JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY)!) : undefined,
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
    },
});

export const { loginAdmin } = userSlice.actions;

export default userSlice.reducer;
