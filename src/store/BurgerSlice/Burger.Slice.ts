import { createSlice } from '@reduxjs/toolkit'
import { IBurgerState } from 'types/slice.interface'

const initialState: IBurgerState = {
	open: false,
}
const BurgerSlice = createSlice({
	name: 'burger',
	initialState,
	reducers: {
		setClose: state => {
			state.open = false
		},
		toggleOpen: state => {
			state.open = !state.open
		},
	},
})
export const { actions, reducer } = BurgerSlice
