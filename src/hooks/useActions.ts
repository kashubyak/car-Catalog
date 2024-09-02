import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as burgerActions } from 'store/burgerSlice/Burger.Slice'
import { actions as favoritesActions } from 'store/favoriteSlice/Favorites.Slice'
import { actions as loadingActions } from 'store/loadingSlice/Loading.Slice'
import { actions as notificationActions } from 'store/notaficatoinsSlice/Notification.Slice'
import { actions as themeActions } from 'store/themeSlice/Theme.Slice'
import { actions as userActions } from 'store/userSlice/User.Slice'

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
