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
import { reducer as burgerReducer } from './BurgerSlice/Burger.Slice'
import { reducer as favoritesReducer } from './FavoriteSlice/Favorites.Slice'
import { reducer as loadingReducer } from './LoadingSlice/Loading.Slice'
import { reducer as notificationReducer } from './NotificationSlice/Notification.Slice'
import { reducer as themeReducer } from './ThemeSlice/Theme.Slice'
import { reducer as userReducer } from './UserSlice/User.Slice'

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
	blackList: ['notification', 'loading'],
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
