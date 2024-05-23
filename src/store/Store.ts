import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as favoritesReducer } from './favoritesSlice/Favorites.slice'

const reducers = combineReducers({
	favorites: favoritesReducer,
})
export const Store = configureStore({
	reducer: reducers,
})
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
