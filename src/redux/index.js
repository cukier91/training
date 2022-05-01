import { combineReducers } from 'redux';
import { authSlice } from './authSlice';
import { usersSlice } from './usersSlice';
import { configureStore } from '@reduxjs/toolkit';
import { customerSlice } from './customerSlicer';

const reducer = combineReducers({
	auth: authSlice.reducer,
	users: usersSlice.reducer,
    customers: customerSlice.reducer
});

export const store = configureStore({
	reducer,
});
