import { createSlice } from '@reduxjs/toolkit'

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: [],
	reducers: {
		toggleFavorites: (state, { payload: car }) => {
			if (state.some(c => c.id === car.id)) {
				state = state.filter(c => c.id !== car.id)
			} else {
				state.push(car)
			}
		},
	},
})
export const { actions, reducer } = favoritesSlice
