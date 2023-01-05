/**
 * App Slice
 */

// Dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
	snackbar: {
		open: boolean;
		severity?: 'error' | 'success' | 'info' | 'warning';
		message: string;
	};
	loading: boolean;
}

const initialState: AppState = {
	snackbar: {
		open: false,
		severity: 'error',
		message: '',
	},
	loading: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		showMessage: (
			state,
			action: PayloadAction<{
				message: string;
				severity?: AppState['snackbar']['severity'];
			}>
		) => {
			state.snackbar = { open: true, ...action.payload };
		},
		hideMessage: (state) => {
			state.snackbar.open = false;
		},
		toggleLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { showMessage, hideMessage, toggleLoading } = appSlice.actions;

export default appSlice.reducer;
