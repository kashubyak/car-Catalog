import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICar } from 'types/car.interface'

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: [] as ICar[],
	reducers: {
		toggleFavorites: (state, action: PayloadAction<ICar>) => {
			const car = action.payload
			const index = state.findIndex(c => c.id === car.id)
			if (index !== -1) {
				state.splice(index, 1)
			} else {
				state.push(car)
			}
		},
	},
})

export const { actions, reducer } = favoritesSlice
