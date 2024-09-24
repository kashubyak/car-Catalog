import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBurgerState } from 'types/slice.interface'

const initialState: IBurgerState = {
	open: false,
}
const BurgerSlice = createSlice({
	name: 'burger',
	initialState,
	reducers: {
		setOpen: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload
		},
		toggleOpen: state => {
			state.open = !state.open
		},
	},
})
export const { actions, reducer } = BurgerSlice
