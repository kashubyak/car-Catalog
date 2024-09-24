import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { iUserState } from 'types/slice.interface'
import { TypeUser } from 'types/user.interface'

const getInitialUserState = () => {
	try {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	} catch (error) {
		return null
	}
}

const initialState: iUserState = {
	user: getInitialUserState(),
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
