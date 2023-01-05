/**
 * User Slice
 */

// Dependencies
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    user: object | null,
    token?: string;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
