import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as favoritesReducer } from './favoriteSlice/Favorites.slice'
import { reducer as notificationReducer } from './notaficatoinsSlice/notificationSlice'

const reducers = combineReducers({
	favorites: favoritesReducer,
	notification: notificationReducer,
})
export const Store = configureStore({
	reducer: reducers,
})
export type RootState = ReturnType<typeof Store.getState>
