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
import { reducer as burgerReducer } from './burgerSlice/Burger.Slice'
import { reducer as favoritesReducer } from './favoriteSlice/Favorites.Slice'
import { reducer as loadingReducer } from './loadingSlice/Loading.Slice'
import { reducer as notificationReducer } from './notaficatoinsSlice/Notification.Slice'
import { reducer as themeReducer } from './themeSlice/Theme.Slice'
import { reducer as userReducer } from './userSlice/User.Slice'

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	notification: notificationReducer,
	theme: themeReducer,
	burger: burgerReducer,
	user: userReducer,
	loading: loadingReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favorites', 'theme', 'burger', 'user'],
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
