import { createSlice } from '@reduxjs/toolkit';


export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
	},
	reducers: {
		fetch_users: (state, action) => {
			state.users = action.payload
		},

	},
});

export const { fetch_users } = usersSlice.actions;
