import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as favoritesReducer } from './favoriteSlice/Favorites.slice'
import { reducer as notificationReducer } from './notaficatoinsSlice/notificationSlice'

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	notification: notificationReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favorites'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const Store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

const persistor = persistStore(Store)

export { Store, persistor }
export type RootState = ReturnType<typeof Store.getState>
