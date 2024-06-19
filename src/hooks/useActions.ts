import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as favoritesActions } from 'store/favoriteSlice/Favorites.slice'
import { actions as notificationActions } from 'store/notaficatoinsSlice/Notification.Slice'
import { actions as themeActions } from 'store/themeSlice/Theme.Slice'

const rootActions = {
	...favoritesActions,
	...notificationActions,
	...themeActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
