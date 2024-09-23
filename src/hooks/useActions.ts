import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as burgerActions } from 'store/BurgerSlice/Burger.Slice'
import { actions as favoritesActions } from 'store/FavoriteSlice/Favorites.Slice'
import { actions as loadingActions } from 'store/LoadingSlice/Loading.Slice'
import { actions as notificationActions } from 'store/NotificationSlice/Notification.Slice'
import { actions as themeActions } from 'store/ThemeSlice/Theme.Slice'
import { actions as userActions } from 'store/UserSlice/User.Slice'

const rootActions = {
	...favoritesActions,
	...notificationActions,
	...themeActions,
	...burgerActions,
	...userActions,
	...loadingActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
