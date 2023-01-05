/**
 * Application State
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app';
import userReducer from './features/user';

const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
