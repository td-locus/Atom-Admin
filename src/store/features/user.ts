/**
 * User Slice
 */

// Dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'td-atom-admin-v1';

interface UserState {
    admin: Admin | undefined;
    token?: string;
}

const initialState: UserState = {
    admin: localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)!) : undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAdmin: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        },
    },
});

export const { loginAdmin } = userSlice.actions;

export default userSlice.reducer;
