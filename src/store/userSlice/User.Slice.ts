import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { iUserState } from 'types/slice.interface'
import { TypeUser } from 'types/user.interface'

const initialState: iUserState = {
	user: JSON.parse(localStorage.getItem('user') || 'null'),
}
const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TypeUser | null>) => {
			state.user = action.payload
			if (action.payload) {
				localStorage.setItem('user', JSON.stringify(action.payload))
			} else {
				localStorage.removeItem('user')
			}
		},
	},
})
export const { actions, reducer } = UserSlice
