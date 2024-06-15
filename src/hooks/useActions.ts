import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as favoritesActions } from 'store/favoriteSlice/Favorites.slice'
import { actions as notificationActions } from 'store/notaficatoinsSlice/notificationSlice'
const rootActions = {
	...favoritesActions,
	...notificationActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
