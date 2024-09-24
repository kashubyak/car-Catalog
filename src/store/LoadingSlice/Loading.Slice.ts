import { createSlice } from '@reduxjs/toolkit'
interface ILoadingState {
	isLoading: boolean
}
const initialState: ILoadingState = {
	isLoading: false,
}
const LoadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		startLoading: state => {
			state.isLoading = true
		},
		stopLoading: state => {
			state.isLoading = false
		},
	},
})
export const { actions, reducer } = LoadingSlice
