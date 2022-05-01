import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
	name: 'customers',
	initialState: {
		customers:[],
		page: 1,
		limit: 3,
		sort: null,
	},
	reducers: {
		fetchCustomers: (state, action) => {
			state.customers= action.payload
		},
	},
});

export const { fetchCustomers } = customerSlice.actions;
