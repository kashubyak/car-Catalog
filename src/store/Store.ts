import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as favoritesReducer } from './favoriteSlice/Favorites.slice'

const reducers = combineReducers({
	favorites: favoritesReducer,
})
export const Store = configureStore({
	reducer: reducers,
})
export type RootState = ReturnType<typeof Store.getState>
